from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from ibm.analyze import process

import requests

api_key = 'AIzaSyDKBiADgbHTVrTF_O5WkQH5E8ZttShLNmw'
base_url = 'https://www.googleapis.com/youtube/v3/commentThreads'
parts = 'snippet,replies'

def analyze(request):
	resp = requests.get(base_url, {'part': parts, 'key':api_key, 'videoId': request.GET.get('videoUrl'), 'maxResults': "100"})
	data = resp.json()
	text = [x['snippet']['topLevelComment']['snippet']['textDisplay'] for x in data['items']]
	print(text)
	return JsonResponse(text, safe=False)