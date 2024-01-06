
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API
    path("post", views.post, name="post"),
    path("user_post/<str:username>", views.user_post, name="user_post"),
    path("user_info", views.user_info, name="user_info"), # getting the login user info
    
    # CHANGE: from <str:username> into user_info/<str:username>
    path("user_info/<str:username>", views.username_info, name="username_info"), #getting this user info
    path("post/<str:post_id>", views.get_post, name="get_post"),
    path("like_post", views.like_post, name="like_post")
]
