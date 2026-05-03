from django.urls import path
from . import views

urlpatterns = [
    # Existing endpoints
    path('faq/', views.faq_list, name='faq-list'),
    path('glossary/', views.glossary_list, name='glossary-list'),
    path('quiz/', views.quiz_questions, name='quiz-questions'),
    path('dates/', views.important_dates, name='important-dates'),
    path('eligibility/', views.check_eligibility, name='check-eligibility'),
    
    # Authentication endpoints
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/logout/', views.logout_user, name='logout'),
    path('auth/profile/', views.get_user_profile, name='profile'),
    path('auth/profile/update/', views.update_user_profile, name='update-profile'),
    path('auth/change-password/', views.change_password, name='change-password'),
    
    # Quiz attempts
    path('quiz/attempt/', views.save_quiz_attempt, name='save-quiz-attempt'),
    path('quiz/history/', views.get_quiz_history, name='quiz-history'),
    
    # Bookmarks
    path('bookmarks/', views.get_bookmarks, name='bookmarks'),
    path('bookmarks/add/', views.add_bookmark, name='add-bookmark'),
    path('bookmarks/<int:bookmark_id>/remove/', views.remove_bookmark, name='remove-bookmark'),
    
    # Notifications
    path('notifications/', views.get_notifications, name='notifications'),
    path('notifications/<int:notification_id>/read/', views.mark_notification_read, name='mark-notification-read'),
    path('notifications/read-all/', views.mark_all_notifications_read, name='mark-all-read'),
]
