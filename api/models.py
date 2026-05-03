from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class FAQEntry(models.Model):
    CATEGORIES = [
        ('registration', 'Voter Registration'),
        ('voting', 'Voting Process'),
        ('evm', 'EVM & Technology'),
        ('eligibility', 'Eligibility'),
        ('general', 'General'),
        ('results', 'Results & Counting'),
    ]
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORIES, default='general')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'FAQ Entry'
        verbose_name_plural = 'FAQ Entries'
        ordering = ['category', 'question']

    def __str__(self):
        return self.question[:80]


class GlossaryTerm(models.Model):
    term = models.CharField(max_length=200, unique=True)
    definition = models.TextField()
    example = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['term']
        verbose_name = 'Glossary Term'
        verbose_name_plural = 'Glossary Terms'

    def __str__(self):
        return self.term


class QuizQuestion(models.Model):
    DIFFICULTY = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    question = models.CharField(max_length=500)
    options = models.JSONField()  # List of 4 option strings
    correct_answer = models.CharField(max_length=500)
    explanation = models.TextField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['difficulty', 'question']
        verbose_name = 'Quiz Question'
        verbose_name_plural = 'Quiz Questions'

    def __str__(self):
        return self.question[:80]


class ImportantDate(models.Model):
    event_name = models.CharField(max_length=300)
    date = models.DateField()
    description = models.TextField()
    event_type = models.CharField(max_length=50, default='general')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date']
        verbose_name = 'Important Date'
        verbose_name_plural = 'Important Dates'

    def __str__(self):
        return f"{self.event_name} - {self.date}"


class UserProfile(models.Model):
    """Extended user profile with voting-related information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    state = models.CharField(max_length=100, blank=True)
    constituency = models.CharField(max_length=200, blank=True)
    voter_id = models.CharField(max_length=20, blank=True, unique=True, null=True)
    is_registered_voter = models.BooleanField(default=False)
    preferred_language = models.CharField(max_length=10, default='en', choices=[('en', 'English'), ('hi', 'Hindi')])
    email_notifications = models.BooleanField(default=True)
    sms_notifications = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"{self.user.username}'s Profile"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create profile when user is created"""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save profile when user is saved"""
    if hasattr(instance, 'profile'):
        instance.profile.save()


class QuizAttempt(models.Model):
    """Track user quiz attempts and scores"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_attempts')
    score = models.IntegerField()
    total_questions = models.IntegerField()
    difficulty = models.CharField(max_length=10, blank=True)
    time_taken_seconds = models.IntegerField(null=True, blank=True)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-completed_at']
        verbose_name = 'Quiz Attempt'
        verbose_name_plural = 'Quiz Attempts'

    def __str__(self):
        return f"{self.user.username} - {self.score}/{self.total_questions}"

    @property
    def percentage(self):
        return round((self.score / self.total_questions) * 100, 2) if self.total_questions > 0 else 0


class Bookmark(models.Model):
    """User bookmarks for FAQs and Glossary terms"""
    BOOKMARK_TYPES = [
        ('faq', 'FAQ'),
        ('glossary', 'Glossary'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    bookmark_type = models.CharField(max_length=20, choices=BOOKMARK_TYPES)
    item_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'bookmark_type', 'item_id']
        ordering = ['-created_at']
        verbose_name = 'Bookmark'
        verbose_name_plural = 'Bookmarks'

    def __str__(self):
        return f"{self.user.username} - {self.bookmark_type} #{self.item_id}"


class Notification(models.Model):
    """User notifications for important events"""
    NOTIFICATION_TYPES = [
        ('election', 'Election Update'),
        ('deadline', 'Deadline Reminder'),
        ('quiz', 'Quiz Achievement'),
        ('general', 'General'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, default='general')
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    link = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'

    def __str__(self):
        return f"{self.user.username} - {self.title}"
