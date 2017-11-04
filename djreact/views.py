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
	params = {
	'part': parts, 'key':api_key, 
	'videoId': request.GET.get('videoId'), 
	'maxResults': "20",
	'textFormat': 'plainText'
	}
	if request.GET.get('nextPageToken'):
		params['pageToken'] = request.GET.get('nextPageToken')
	resp = requests.get(base_url, params)
	data = resp.json()

	text = [x['snippet']['topLevelComment']['snippet']['textDisplay'] for x in data['items']]
	print("procesing...")
	print(text)
	result = process(['\n'.join(text)])
	result = {'data': result, 'timestamp': data['items'][0]['snippet']['topLevelComment']['snippet']['publishedAt']}
	if data.get('nextPageToken') != None:
		result['nextPageToken'] = data['nextPageToken']

	return JsonResponse(result, safe=False)