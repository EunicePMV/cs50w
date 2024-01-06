from django import forms
from django.forms import ModelForm
from .models import CreateListing

class CreateListingForm(ModelForm):
	class Meta:
		model = CreateListing
		exclude = ['bid_creator', 'watchlist_user', 'date_time']
		fields = ('title', 'description', 'starting_bid', 'image_url', 'category')

		labels = {
			'title': '',
			'description': '',
			'starting_bid': '',
			'image_url': '',
			'category': '',
		}

		widgets = {
			'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Title'}),
			'description': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Description'}),
			'starting_bid': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Starting Bid'}),
			'image_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'Image URL'}),
			'category': forms.Select(attrs={'class': 'form-control', 'placeholder': 'Category'}),
		}