from django.contrib import admin
from .models import (
    FAQEntry, GlossaryTerm, QuizQuestion, ImportantDate,
    UserProfile, QuizAttempt, Bookmark, Notification
)


@admin.register(FAQEntry)
class FAQEntryAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'created_at']
    list_filter = ['category']
    search_fields = ['question', 'answer']
    ordering = ['category', 'question']


@admin.register(GlossaryTerm)
class GlossaryTermAdmin(admin.ModelAdmin):
    list_display = ['term', 'category', 'created_at']
    list_filter = ['category']
    search_fields = ['term', 'definition']
    ordering = ['term']


@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ['question', 'difficulty', 'correct_answer', 'created_at']
    list_filter = ['difficulty']
    search_fields = ['question']


@admin.register(ImportantDate)
class ImportantDateAdmin(admin.ModelAdmin):
    list_display = ['event_name', 'date', 'event_type', 'is_active']
    list_filter = ['event_type', 'is_active']
    search_fields = ['event_name', 'description']
    ordering = ['date']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'state', 'constituency', 'is_registered_voter', 'preferred_language']
    list_filter = ['is_registered_voter', 'preferred_language', 'state']
    search_fields = ['user__username', 'user__email', 'voter_id']


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'score', 'total_questions', 'percentage', 'completed_at']
    list_filter = ['difficulty', 'completed_at']
    search_fields = ['user__username']
    readonly_fields = ['percentage']


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ['user', 'bookmark_type', 'item_id', 'created_at']
    list_filter = ['bookmark_type']
    search_fields = ['user__username']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'notification_type', 'title', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read']
    search_fields = ['user__username', 'title', 'message']
    actions = ['mark_as_read']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected notifications as read"
