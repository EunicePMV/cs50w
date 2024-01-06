from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect

from . import util
import random
import markdown2

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

# returns the encyclopedia entry in the index page
def wiki(request, title):
    title = title.upper()
    if util.get_entry(title):    
        return render(request, "entry/entry.html", {
            "entries" : markdown2.markdown(util.get_entry(title)),
            "title": title
        })
    else:
        # if not match go to this result
        search_result = []
        for entry in util.list_entries():
            if title in entry:
                search_result.append(entry)

        if search_result:
            return render(request, "search_result/search_result.html", {
                "search_result": search_result
            })
        else:
            return render(request, "error_title/error_title.html")

def search(request):
    if request.method == 'POST':
        q = request.POST['q']
        if q:
            # redirect the user to the wiki/ url and do the views.wiki
            return HttpResponseRedirect(reverse('wiki', kwargs={'title': q}))

def create_page(request):
    if request.method == 'POST':
        content = request.POST['content']
        title = request.POST['title'].upper()
        if title in util.list_entries():
            # go to the error page
            return render(request, 'error/error.html', {
                "title" : title
            })
        else:
            # save this page as title.md in /entries/
            util.save_entry(title, content)

            # redirect to that newly created page
            return HttpResponseRedirect(reverse('wiki', kwargs={'title':title}))
    return render(request, 'create_page/create_page.html')

def edit_page(request, title):
    if request.method == 'POST':
        # save the entry
        # redirect
        content = request.POST['content']
        title = title
        util.save_entry(title, content)
        return HttpResponseRedirect(reverse('wiki', kwargs={'title':title}))
    entry = util.get_entry(title)
    return render(request, 'edit_page/edit_page.html', {
        "title": title,
        "entry": entry,
    })

def random_page(request):
    entries = util.list_entries()
    num = random.randint(0, len(entries)-1)
    return HttpResponseRedirect(reverse('wiki', kwargs={'title': entries[num]}))


# conversion of md to html