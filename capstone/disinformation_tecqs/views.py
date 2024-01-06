from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import User


def index(request):
    return render(request, 'disinformation/index.html')

def intro(request, username):
    return render(request, 'disinformation/pr_manager.html', {
        "username": username,
    })

# register username 
def register(request):
    if request.method == "POST":
        username = request.POST["username"]

        # check if the user provides an empty field
        if username == '':
            return render(request, 'disinformation/index.html', {
            "msg": "Invalid Username"
        })

        # if not empty, save the username 
        user = User(username=username)
        user.save()

        # then proceed to the nxt page
        return HttpResponseRedirect(reverse('intro', args=(username, )))

# all webpage stage falls in this view function
def stages(request, stage_name, username):
    # username = request.GET["username"]
    return render(request, f'stages/{stage_name}.html', {
        "username":username
    })

# how could i redirect user to the synchronous stage

# check how can the username could be reflected in all web pages

# use a tag in redirecting user to the nxt page instead of using javascript