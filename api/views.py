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
