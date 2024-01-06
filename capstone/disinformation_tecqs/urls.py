from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('intro/<str:username>', views.intro, name='intro'),
    path('stage/<str:stage_name>/<str:username>', views.stages, name='stages'),
    path('register', views.register, name='register')
]