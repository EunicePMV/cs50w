from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .models import User, CreateListing, Bid, Comment
from .forms import CreateListingForm

def index(request):
    return render(request, "auctions/index.html", {
        "items_listing": CreateListing.objects.all()
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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

@login_required
def create_listing(request):
    if request.method == "POST":
        form = CreateListingForm(request.POST)
        if form.is_valid():
            form_object = form.save(commit=False)
            form_object.bid_creator = request.user
            form_object.save()

            messages.success(request, 'Submitted successfully!')

            return HttpResponseRedirect(reverse('index'))

    form = CreateListingForm
    return render(request, "create_listing/create_listing.html", {
        "form": form,
    })

def listing(request, id, msg=False):
    item = CreateListing.objects.get(id=id)
    if Bid.objects.filter(item=item):
        bids = Bid.objects.filter(item=item)
        highest_bid = bids.last().bid

        return render(request, "listing/listing.html", {
            "item": item,
            "bid": highest_bid
        })

    return render(request, "listing/listing.html", {
        "item": item,
        "message":msg,
    })

def watchlist(request, id):
    user = User.objects.get(id=id)
    items = user.item.all()
    return render(request, "watchlist/watchlist.html", {
        "items": items
    })    

@login_required
def addItem(request, id):
    if request.method == "POST":
        item = CreateListing.objects.get(id=id)
        user_id = int(request.POST['watchlist'])
        user = User.objects.get(id=user_id)
        item.watchlist_user.add(user)

        return HttpResponseRedirect(reverse('watchlist', args=(user_id, )))

def removeItem(request, id):
    if request.method == "POST":
        user_id = int(request.POST['removeItem'])
        user = User.objects.get(id=user_id)
        item = CreateListing.objects.get(id=id)
        user.item.remove(item)

        return HttpResponseRedirect(reverse('watchlist', args=(user_id, )))

@login_required
def placeBid(request, id):
    if request.method == "POST":
        user_id = int(request.POST['user'])
        user = User.objects.get(pk=user_id)

        price_bid = float(request.POST['bid'])

        item = CreateListing.objects.get(id=id)

        if Bid.objects.filter(item=item):
            # if there are bids
            bids = Bid.objects.filter(item=item)

            # get the highest bid and compare to the placed bid
            highest_bid = bids.last().bid

            if price_bid > highest_bid:
                bid = Bid(item=item, bidder=user, bid=price_bid)
                bid.save()

                messages.success(request, 'Place bid successfully!')

                return HttpResponseRedirect(reverse('listing', args=(id, )))
            else:

                messages.success(request, 'Invalid bid. Bid is lower than the highest bid.')

                return HttpResponseRedirect(reverse('listing', args=(id, )))
        else:
            # if there are no bids
            if price_bid >= item.starting_bid:
                bid = Bid(item=item, bidder=user, bid=price_bid)
                bid.save()

                messages.success(request, 'Place bid successfully!')

                return HttpResponseRedirect(reverse('listing', args=(id, )))
            else:

                messages.success(request, 'Invalid bid. Bid is lower than the highest bid.')

                return HttpResponseRedirect(reverse('listing', args=(id, )))

@login_required
def close(request):
    if request.method == "POST":
        item_id = int(request.POST['close'])
        item = CreateListing.objects.get(id=item_id)
        item.inactive = True

        if Bid.objects.filter(item=item):
            item.winner = Bid.objects.filter(item=item).last().bidder
        
        item.save()

    return HttpResponseRedirect(reverse('listing', args=(item_id, )))

@login_required
def comment(request, id):
    if request.method == "POST":
        item = CreateListing.objects.get(pk=id)
        comment = request.POST['comment']
        user_id = int(request.POST['user'])
        user = User.objects.get(pk=user_id)

        commented = Comment(comment=comment, commenter=user, item=item)
        commented.save()

        return HttpResponseRedirect(reverse('listing', args=(id, )))

def categories(request):
    try:
        if request.method == "POST":
            # get the category here and display all items
            category = request.POST['category']

            return render(request, 'categories/categories.html', {
                "items": CreateListing.objects.filter(category=category),
                "categories": CreateListing.CATEGORY
            })
    except:
        return render(request, 'categories/categories.html', {
            "categories": CreateListing.CATEGORY
        })

    return render(request, 'categories/categories.html', {
            "categories": CreateListing.CATEGORY
        })

def close_listing(request):
    return render(request, 'close_listing/close_listing.html', {
        "items_listing": CreateListing.objects.all()
    })