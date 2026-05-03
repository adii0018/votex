import random
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import FAQEntry, GlossaryTerm, QuizQuestion, ImportantDate
from .serializers import (
    FAQEntrySerializer, GlossaryTermSerializer,
    QuizQuestionSerializer, ImportantDateSerializer,
    EligibilityRequestSerializer
)


class FAQRateThrottle(AnonRateThrottle):
    rate = '20/minute'
    scope = 'faq_search'


class EligibilityRateThrottle(AnonRateThrottle):
    rate = '20/minute'
    scope = 'eligibility'


@api_view(['GET'])
@throttle_classes([FAQRateThrottle])
def faq_list(request):
    """Search FAQ entries by query string or list all."""
    query = request.GET.get('q', '').strip()
    category = request.GET.get('category', '').strip()

    faqs = FAQEntry.objects.all()

    if query:
        faqs = faqs.filter(
            Q(question__icontains=query) | Q(answer__icontains=query)
        )
    if category:
        faqs = faqs.filter(category=category)

    serializer = FAQEntrySerializer(faqs, many=True)
    return Response({
        'count': faqs.count(),
        'results': serializer.data
    })


@api_view(['GET'])
def glossary_list(request):
    """List all glossary terms, optionally filtered by search."""
    query = request.GET.get('q', '').strip()
    terms = GlossaryTerm.objects.all()

    if query:
        terms = terms.filter(
            Q(term__icontains=query) | Q(definition__icontains=query)
        )

    serializer = GlossaryTermSerializer(terms, many=True)
    return Response({
        'count': terms.count(),
        'results': serializer.data
    })


@api_view(['GET'])
def quiz_questions(request):
    """Return 5 random quiz questions."""
    all_questions = list(QuizQuestion.objects.all())
    count = min(5, len(all_questions))
    selected = random.sample(all_questions, count)

    serializer = QuizQuestionSerializer(selected, many=True)
    return Response({
        'count': count,
        'questions': serializer.data
    })


@api_view(['GET'])
def important_dates(request):
    """List upcoming important election dates."""
    from django.utils import timezone
    today = timezone.now().date()

    dates = ImportantDate.objects.filter(is_active=True).order_by('date')

    serializer = ImportantDateSerializer(dates, many=True)
    return Response({
        'count': dates.count(),
        'results': serializer.data,
        'today': str(today)
    })


@api_view(['POST'])
@throttle_classes([EligibilityRateThrottle])
def check_eligibility(request):
    """Check voter eligibility based on age, citizenship, and residency."""
    serializer = EligibilityRequestSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {'error': 'Invalid input', 'details': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    data = serializer.validated_data
    age = data['age']
    citizenship = data['citizenship']
    residency_years = data['residency_years']

    issues = []
    eligible = True

    # Age check (India: 18+)
    if age < 18:
        eligible = False
        issues.append({
            'field': 'age',
            'message': f'You must be at least 18 years old to vote. You are {age} years old.',
            'fix': f'You can register to vote when you turn 18 in {18 - age} year(s).'
        })

    # Citizenship check
    if citizenship != 'citizen':
        eligible = False
        if citizenship == 'permanent_resident':
            issues.append({
                'field': 'citizenship',
                'message': 'Only Indian citizens can vote in Indian elections.',
                'fix': 'You must obtain Indian citizenship before you can register to vote.'
            })
        else:
            issues.append({
                'field': 'citizenship',
                'message': 'Voter eligibility requires Indian citizenship.',
                'fix': 'Please check your citizenship status with the relevant authorities.'
            })

    # Residency check (minimum 6 months for registration in constituency)
    if residency_years < 0.5:
        eligible = False
        months_needed = 6
        months_current = int(residency_years * 12)
        issues.append({
            'field': 'residency',
            'message': f'You must have resided in your constituency for at least 6 months. You have been a resident for approximately {months_current} month(s).',
            'fix': f'You can register to vote after {months_needed - months_current} more month(s) of residency.'
        })

    if eligible:
        return Response({
            'eligible': True,
            'message': 'Congratulations! You are eligible to vote in Indian elections. 🗳️',
            'next_steps': [
                'Visit the National Voter Service Portal (voters.eci.gov.in)',
                'Fill Form 6 for new voter registration',
                'Submit required documents (proof of age, address, and identity)',
                'Track your application online',
                'Collect your Voter ID card (EPIC)'
            ],
            'issues': []
        })
    else:
        return Response({
            'eligible': False,
            'message': 'You are currently not eligible to vote. Here\'s what you need to know:',
            'issues': issues,
            'next_steps': [
                'Review the eligibility requirements above',
                'Visit the Election Commission of India website for more information',
                'Contact your local electoral office for guidance'
            ]
        })



# Authentication Views
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from .models import UserProfile, QuizAttempt, Bookmark, Notification
from .serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer,
    UpdateProfileSerializer, QuizAttemptSerializer, BookmarkSerializer,
    NotificationSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user"""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        
        # Send welcome email
        if user.email:
            try:
                send_mail(
                    'Welcome to VoteX!',
                    f'Hello {user.first_name or user.username},\n\nWelcome to VoteX - Your Voting Platform!\n\nYou can now access all features including quiz tracking, bookmarks, and personalized notifications.\n\nHappy Voting!\nVoteX Team',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=True,
                )
            except Exception as e:
                pass  # Don't fail registration if email fails
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'User registered successfully!'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login user and return token"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Please provide both username and password'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'Login successful!'
        })
    
    return Response(
        {'error': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Logout user by deleting token"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Logged out successfully!'})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get current user profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """Update user profile"""
    profile = request.user.profile
    
    # Update User model fields
    user_fields = ['first_name', 'last_name', 'email']
    for field in user_fields:
        if field in request.data:
            setattr(request.user, field, request.data[field])
    request.user.save()
    
    # Update Profile fields
    serializer = UpdateProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Profile updated successfully!',
            'profile': serializer.data
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change user password"""
    serializer = ChangePasswordSerializer(data=request.data)
    
    if serializer.is_valid():
        user = request.user
        
        if not user.check_password(serializer.data.get('old_password')):
            return Response(
                {'error': 'Old password is incorrect'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(serializer.data.get('new_password'))
        user.save()
        
        # Update token
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        
        return Response({
            'message': 'Password changed successfully!',
            'token': token.key
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Quiz Attempt Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_quiz_attempt(request):
    """Save user quiz attempt"""
    data = request.data.copy()
    data['user'] = request.user.id
    
    serializer = QuizAttemptSerializer(data=data)
    if serializer.is_valid():
        attempt = serializer.save(user=request.user)
        
        # Create notification for high scores
        if attempt.percentage >= 80:
            Notification.objects.create(
                user=request.user,
                notification_type='quiz',
                title='🎉 Great Quiz Score!',
                message=f'Congratulations! You scored {attempt.percentage}% on the quiz.',
                link='/quiz'
            )
        
        return Response({
            'message': 'Quiz attempt saved!',
            'attempt': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_history(request):
    """Get user's quiz history"""
    attempts = QuizAttempt.objects.filter(user=request.user)
    serializer = QuizAttemptSerializer(attempts, many=True)
    
    # Calculate statistics
    total_attempts = attempts.count()
    avg_score = sum(a.percentage for a in attempts) / total_attempts if total_attempts > 0 else 0
    best_score = max((a.percentage for a in attempts), default=0)
    
    return Response({
        'attempts': serializer.data,
        'statistics': {
            'total_attempts': total_attempts,
            'average_score': round(avg_score, 2),
            'best_score': best_score
        }
    })


# Bookmark Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bookmark(request):
    """Add a bookmark"""
    data = request.data.copy()
    
    bookmark, created = Bookmark.objects.get_or_create(
        user=request.user,
        bookmark_type=data.get('bookmark_type'),
        item_id=data.get('item_id')
    )
    
    if created:
        return Response({
            'message': 'Bookmark added!',
            'bookmark': BookmarkSerializer(bookmark).data
        }, status=status.HTTP_201_CREATED)
    
    return Response({'message': 'Already bookmarked'}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_bookmark(request, bookmark_id):
    """Remove a bookmark"""
    try:
        bookmark = Bookmark.objects.get(id=bookmark_id, user=request.user)
        bookmark.delete()
        return Response({'message': 'Bookmark removed!'})
    except Bookmark.DoesNotExist:
        return Response({'error': 'Bookmark not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookmarks(request):
    """Get user's bookmarks"""
    bookmark_type = request.GET.get('type', '')
    bookmarks = Bookmark.objects.filter(user=request.user)
    
    if bookmark_type:
        bookmarks = bookmarks.filter(bookmark_type=bookmark_type)
    
    serializer = BookmarkSerializer(bookmarks, many=True)
    return Response({
        'count': bookmarks.count(),
        'bookmarks': serializer.data
    })


# Notification Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    """Get user notifications"""
    notifications = Notification.objects.filter(user=request.user)
    unread_only = request.GET.get('unread', '').lower() == 'true'
    
    if unread_only:
        notifications = notifications.filter(is_read=False)
    
    serializer = NotificationSerializer(notifications, many=True)
    return Response({
        'count': notifications.count(),
        'unread_count': notifications.filter(is_read=False).count(),
        'notifications': serializer.data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, notification_id):
    """Mark notification as read"""
    try:
        notification = Notification.objects.get(id=notification_id, user=request.user)
        notification.is_read = True
        notification.save()
        return Response({'message': 'Notification marked as read'})
    except Notification.DoesNotExist:
        return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_all_notifications_read(request):
    """Mark all notifications as read"""
    count = Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response({'message': f'{count} notifications marked as read'})
