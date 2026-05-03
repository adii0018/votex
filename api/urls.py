from django.urls import path
from . import views

urlpatterns = [
    path('faq/', views.faq_list, name='faq-list'),
    path('glossary/', views.glossary_list, name='glossary-list'),
    path('quiz/', views.quiz_questions, name='quiz-questions'),
    path('dates/', views.important_dates, name='important-dates'),
    path('eligibility/', views.check_eligibility, name='check-eligibility'),
]
