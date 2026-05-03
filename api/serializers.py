from rest_framework import serializers
from .models import FAQEntry, GlossaryTerm, QuizQuestion, ImportantDate


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
