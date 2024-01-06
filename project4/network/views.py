from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Post

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

def index(request):
    all_post = Post.objects.all().order_by("-date").all()
    all_post_paginator = Paginator(all_post, 10)

    all_post_page_number = request.GET.get('page')
    all_post_page_obj = all_post_paginator.get_page(all_post_page_number)

    try:
        login_user = request.user
        
        user_following = login_user.follows.all()

        user_following_post = user_following.first().post.all()

        # Get the other post of the other user that this login user followed
        # starting from the second user up until the last
        for following in user_following[1:]: 
            all_following_post = user_following_post.union(following.post.all())

        all_following_post = all_following_post.all().order_by("-date").all()
        following_post_paginator = Paginator(all_following_post, 10)

        following_post_page_number = request.GET.get('page')
        following_post_page_obj = following_post_paginator.get_page(following_post_page_number)

        return render(request, "network/index.html", {
            "all_post": all_post_page_obj,
            "following_post": following_post_page_obj,
        })
    except:
        return render(request, "network/index.html", {
            "all_post": all_post_page_obj,
            "following_post": False,
        })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
@login_required
def post(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)

    user = request.user
    post = data.get("post", "")

    new_post = Post(user=user, post=post)
    new_post.save()

    return JsonResponse({"message": "Posted successfully!"}, status=201)


def user_post(request, username):
    user = User.objects.get(username=username)

    user_posts = user.post.all().order_by("-date").all()
    paginator = Paginator(user_posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    try:
        next_page_number = page_obj.next_page_number()
    except:
        next_page_number = False

    try:
        previous_page_number = page_obj.previous_page_number()
    except:
        previous_page_number = False

    return JsonResponse({"next_page_number": next_page_number, "previous_page_number": previous_page_number, "user_posts": [post.serialize() for post in page_obj]}, safe=False)

@csrf_exempt
def user_info(request):
    if request.method == 'GET':
        login_user = request.user
        return JsonResponse(login_user.serialize())
    elif request.method == 'POST':
        login_user = request.user
        data = json.loads(request.body)
        username = data.get("username", "")
        following = User.objects.get(username=username)

        # ask here if the login user is already following the username
        if following in login_user.follows.all():
            login_user.follows.remove(following)
            return JsonResponse({"message": "Unfollowed Successfully!"}, status=201)
        else:
            login_user.follows.add(following)
            return JsonResponse({"message": "Followed Successfully!"}, status=201)

def username_info(request, username):
    user = User.objects.get(username=username)
    return JsonResponse(user.serialize())

# get the post of this id 
@login_required
@csrf_exempt
def get_post(request, post_id):
    main_post = Post.objects.get(id=post_id)

    if request.method == "GET":
        return JsonResponse(main_post.serialize())
    elif request.method == "POST":
        data = json.loads(request.body)
        edited_content = data.get("edited_content", "")
        main_post.post = edited_content
        main_post.save()

        return JsonResponse({"message": "Edit Content Successfully!"}, status=201)

@login_required
@csrf_exempt
def like_post(request):
    if request.method != "POST":
        return JsonResponse({"error": "Post request required"}, status=400)

    data = json.loads(request.body)
    login_user = request.user
    post_id = data.get("post_id", "")
    post = Post.objects.get(pk=post_id)

    # check if the user already liked this post 
    if login_user in post.likers.all():
        post.likers.remove(login_user)
        post.save()
    else:
        post.likers.add(login_user)
        post.save()

    return JsonResponse({"message": "Liked Post Successfully!"}, status=201)

# NEXT: remove the edit function if not your post
