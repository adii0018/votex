from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import (
    FAQEntry, GlossaryTerm, QuizQuestion, ImportantDate,
    UserProfile, QuizAttempt, Bookmark, Notification
)


class FAQEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQEntry
        fields = ['id', 'question', 'answer', 'category']


class GlossaryTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlossaryTerm
        fields = ['id', 'term', 'definition', 'example', 'category']


class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'options', 'correct_answer', 'explanation', 'difficulty']


class ImportantDateSerializer(serializers.ModelSerializer):
    days_until = serializers.SerializerMethodField()

    class Meta:
        model = ImportantDate
        fields = ['id', 'event_name', 'date', 'description', 'event_type', 'days_until']

    def get_days_until(self, obj):
        from django.utils import timezone
        today = timezone.now().date()
        delta = obj.date - today
        return delta.days


class EligibilityRequestSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=0, max_value=150)
    citizenship = serializers.ChoiceField(choices=['citizen', 'permanent_resident', 'other'])
    residency_years = serializers.FloatField(min_value=0, max_value=100)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True)



# User Authentication Serializers
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'phone_number', 'date_of_birth', 'state', 'constituency',
            'voter_id', 'is_registered_voter', 'preferred_language',
            'email_notifications', 'sms_notifications'
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email already exists."})
        
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])


class UpdateProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'user', 'phone_number', 'date_of_birth', 'state', 'constituency',
            'voter_id', 'is_registered_voter', 'preferred_language',
            'email_notifications', 'sms_notifications'
        ]

    def get_user(self, obj):
        return {
            'username': obj.user.username,
            'email': obj.user.email,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
        }


# Quiz Attempt Serializers
class QuizAttemptSerializer(serializers.ModelSerializer):
    percentage = serializers.ReadOnlyField()
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = QuizAttempt
        fields = ['id', 'username', 'score', 'total_questions', 'percentage', 'difficulty', 'time_taken_seconds', 'completed_at']
        read_only_fields = ['id', 'completed_at']


# Bookmark Serializers
class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'bookmark_type', 'item_id', 'created_at']
        read_only_fields = ['id', 'created_at']


# Notification Serializers
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'notification_type', 'title', 'message', 'is_read', 'link', 'created_at']
        read_only_fields = ['id', 'created_at']
