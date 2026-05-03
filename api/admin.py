from django.contrib import admin
from .models import FAQEntry, GlossaryTerm, QuizQuestion, ImportantDate


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
