from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_listing", views.create_listing, name="create-listing"),
    path("listing/<int:id>", views.listing, name="listing"),
    path("watchlist/<int:id>", views.watchlist, name="watchlist"),
    path("addItem/<int:id>", views.addItem, name="addItem"),
    path("removeItem/<int:id>", views.removeItem, name="removeItem"),
    path("placeBid/<int:id>", views.placeBid, name="placeBid"),
    path("close", views.close, name="close"),
    path("comment/<int:id>", views.comment, name="comment"),
    path("categories", views.categories, name="categories"),
    path("close_listing", views.close_listing, name="close_listing"),
]
