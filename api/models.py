from django.db import models


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
