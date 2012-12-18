from core.models import *
from django.shortcuts import render_to_response, render
from django.http import HttpResponse
from django.template import Context, loader


def index(request):
    return HttpResponse("Hello, world. You're at the poll index.")

#def home(request):
#	foo = "Hello"
#	template = loader.get_template('core/home.html')
#	context = Context({
#		'foo':foo,
#	})
#	return HttpResponse(template.render(context))
#render(request, 'movies/home.html', {'foo': foo})
