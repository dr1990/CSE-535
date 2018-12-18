from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
# import urllib
import requests
import json



# Create your views here.


class Dashboard(generics.GenericAPIView):
   """
   API to run python code
   """


   def get(self, request):
       """
       Getting code from frontend and running it
       """

       from django.shortcuts import render_to_response

       return render_to_response('index.html')


class Search(generics.GenericAPIView):
   """
   API to run python code
   """


   def get(self, request):
       """
       Getting code from frontend and running it
       """

       from django.shortcuts import render_to_response

       return render_to_response('search.html')

class getGeneralHashtags(generics.GenericAPIView):
   """
   API to run python code
   """


   def get(self, request):
       """
       Getting code from frontend and running it
       """
       import urllib
       import json
       import requests
       inurl = 'http://localhost:8983/solr/TA/select?facet.field=hashtags&facet.limit=10&facet=on&q=*:*&rows=0&sort=created_at%20asc'
       import ipdb

       data = urllib.request.urlopen(inurl)
       content = data.read()
       docs = json.loads(content.decode('utf-8'))
       responselist = docs["facet_counts"]["facet_fields"]["hashtags"]
       myResponse = []
       rank = 0
       for x in range(0, len(responselist)-1, 2):
           tempList = []
           rank += 1
           tempList.append(rank)
           tempList.append(responselist[x])
           tempList.append(responselist[x+1])
           myResponse.append(tempList)

       #ipdb.set_trace()
       return Response(data={'data': myResponse}, status=status.HTTP_200_OK)


class getTopicHashtagsClass(generics.GenericAPIView):
    """
       API to run python code
       """

    def get(self, request):
        """
        Getting code from frontend and running it
        """
        myResponse = []
        topicArr = ['crime', 'politics', 'environment', 'unrest', 'infra']
        for x in topicArr:
            templist = []
            templist.append(x)
            resp = self.getTopicHashtags(x)
            for i in resp:
                templist.append(i)
            myResponse.append(templist)

        # ipdb.set_trace()
        return Response(data={'data': myResponse}, status=status.HTTP_200_OK)

    def getTopicHashtags(self, topic):
        """
        Getting code from frontend and running it
        """
        import urllib
        import json
        import requests
        inurl = 'http://localhost:8983/solr/TA/select?facet.field=hashtags&facet.limit=10&facet=on&fq=topic=%22' + topic + '%22&q=*:*&rows=0'
        import ipdb

        data = urllib.request.urlopen(inurl)
        content = data.read()
        docs = json.loads(content.decode('utf-8'))
        responselist = docs["facet_counts"]["facet_fields"]["hashtags"]
        myResponse = []
        rank = 0
        for x in range(0, len(responselist) - 1, 2):
            myResponse.append(responselist[x])

        # ipdb.set_trace()
        return myResponse


class getCityHashtagsClass(generics.GenericAPIView):
    """
       API to run python code
       """

    def get(self, request):
        """
        Getting code from frontend and running it
        """
        myResponse = []
        import ipdb
        #ipdb.set_trace()
        topicArr = ['nyc', 'delhi', 'paris', 'bangkok', 'mexico']
        hashtagDict = {
            "nyc": "",
            "delhi": "",
            "paris": "",
            "bangkok": "",
            "mexico": "",
        }
        for x in topicArr:
            resp = self.getCityHashtags(x)

            hashtagDict[x] = resp;


        return Response(data={'data': hashtagDict}, status=status.HTTP_200_OK)

    def getCityHashtags(self, topic):
        """
        Getting code from frontend and running it
        """
        import urllib
        import json
        import requests
        inurl = 'http://localhost:8983/solr/TA/select?facet.field=hashtags&facet.limit=10&facet=on&fq=topic=%22' + topic + '%22&q=*:*&rows=0'
        import ipdb

        data = urllib.request.urlopen(inurl)
        content = data.read()
        docs = json.loads(content.decode('utf-8'))
        responselist = docs["facet_counts"]["facet_fields"]["hashtags"]
        myResponse = ''
        rank = 0
        for x in range(0, len(responselist) - 1, 2):
            myResponse = myResponse+responselist[x]+', '

        # ipdb.set_trace()
        return myResponse[:-2]



class getSearch(generics.GenericAPIView):
   """
   API to run python code
   """


   def post(self, request):
       """
       Getting code from frontend and running it
       """
       import ipdb
       #ipdb.set_trace()

       obj = request.data
       query = obj["query"]
       #parentArr = obj["parentArr"]
       topics = obj["topics"]
       city = obj["cities"]
       language = obj["langs"]

       import urllib.request, urllib.error
       import urllib

       query = urllib.parse.quote_plus(query)
       print(query)
       #Changes start


       q1 = "fq="
       q2 = "fq="
       q3 = "fq="

       url = "q="+query

       if city:
           for x in city:
               if x == 'mexico city':
                   x = 'mexico%20city'
               q1 = q1 + "city:%22" + x + "%22%20OR%20"

           city = q1[:-8]
           url = url + '&' + city

       if topics:
           for x in topics:
               q2 = q2 + "topic:%22" + x + "%22%20OR%20"

           topic = q2[:-8]
           url = url + '&' + topic

       if language:
           for x in language:
               q3 = q3 + "lang:%22" + x + "%22%20OR%20"

           lang = q3[:-8]
           url = url + '&' + lang

       print(url)
        #Changes end


       headers = {'content-type': "application/json"}

       # json_query = {
       #     'q': query,
       #
       # }
       #ipdb.set_trace()
       solr_url = "http://localhost:8983/solr/TA/select?facet.field=city&facet.field=topic&&facet.field=hashtags&facet.field=lang&facet.field=date&facet=on&fl=topic,city,lang,hashtags,full_text,date,sentiment.label,sentiment.probability.pos,sentiment.probability.neg&rows=100&"+url
       data = urllib.request.urlopen(solr_url)
       content = data.read()
       response_json = json.loads(content.decode('utf-8'))
       # response = requests.post(solr_url, data=json.dumps(json_query), headers=headers)
       # response_json = response.json()
       #print(response_json)


       rawtweets = self.getRawTweets(response_json["response"]["docs"])
       cityList = self.cityList(response_json["facet_counts"]["facet_fields"]["city"])
       topicList = self.topicList(response_json["facet_counts"]["facet_fields"]["topic"])
       langList = self.langList(response_json["facet_counts"]["facet_fields"]["lang"])
       sentimentList = self.getSentimentScores(response_json["response"]["docs"])
       #ipdb.set_trace()
       timeSeriesMap = self.getTimeSeriesMap(obj)

       data = {'rawtweets': rawtweets, 'cityList': cityList, 'topicList': topicList, 'langList':langList, 'sentimentList': sentimentList, 'timeSeriesMap':timeSeriesMap}


       return Response(data=data, status=status.HTTP_200_OK)

   def getRawTweets(self, list):
       """
       Getting code from frontend and running it
       """
       import ipdb
       #ipdb.set_trace()

       arr=[]
       for l in list:
           a=[]
           a.append(l["date"])
           a.append(l["city"])
           a.append(l["topic"][0])
           a.append(l["lang"][0])
           a.append(l["full_text"][0])
           arr.append(a)

       return arr

   def getSentimentScores(self, list):
       """
       Getting code from frontend and running it
       """
       arr=[]
       for l in list:
           hashtagDict = {
               "x": "",
               "y": "",
               "r": 10
           }
           hashtagDict['x'] = l["sentiment.probability.pos"][0]
           hashtagDict['y'] = l["sentiment.probability.neg"][0]
           arr.append(hashtagDict)

       return arr

   def topicList(self, list):
       """
       Getting code from frontend and running it
       """

       retArr=[]
       arr=["Social Unrest", "Environment", "Politics", "Crime", "Infrastructure"]
       #arr2 = ["social unrest", "environment", "politics", "crime", "infra"]
       arr2 = [0, 0, 0, 0, 0]

       for i in range(len(list)):
           if list[i] == 'social unrest':
               arr2[0] = list[i+1]
           elif list[i] == 'environment':
               arr2[1] = list[i+1]
           elif list[i] == 'politics':
               arr2[2] = list[i+1]
           elif list[i] == 'crime':
               arr2[3] = list[i+1]
           elif list[i] == 'infra':
               arr2[4] = list[i+1]
           i=i+1

       retArr.append(arr)
       retArr.append(arr2)
       return retArr

   def cityList(self, list):
       """
       Getting code from frontend and running it
       """

       retArr=[]
       arr=["Paris", "Bangkok", "NYC", "Delhi", "Mexico City"]
       #arr2 = ["paris", "bangkok", "nyc", "delhi", "mexico city"]
       arr2 = [0, 0, 0, 0, 0]

       for i in range(len(list)):
           if list[i] == 'nyc':
               arr2[2] = list[i+1]
           elif list[i] == 'delhi':
               arr2[3] = list[i+1]
           elif list[i] == 'bangkok':
               arr2[1] = list[i+1]
           elif list[i] == 'mexico city':
               arr2[4] = list[i+1]
           elif list[i] == 'paris':
               arr2[0] = list[i+1]
           i=i+1

       retArr.append(arr)
       retArr.append(arr2)
       return retArr

   def langList(self, list):
       """
       Getting code from frontend and running it
       """

       retArr=[]
       arr=["English", "Hindi", "Thai", "French", "Spanish"]
       #arr2 = ["en", "hi", "th", "fr", "es"]
       arr2 = [0, 0, 0, 0, 0]

       for i in range(len(list)):
           if list[i] == 'en':
               arr2[0] = list[i+1]
           elif list[i] == 'hi':
               arr2[1] = list[i+1]
           elif list[i] == 'th':
               arr2[2] = list[i+1]
           elif list[i] == 'fr':
               arr2[3] = list[i+1]
           elif list[i] == 'es':
               arr2[4] = list[i+1]
           i=i+1

       retArr.append(arr)
       retArr.append(arr2)
       return retArr

   def getTimeSeriesMap(self, obj):
       """
       Getting code from frontend and running it
       """
       import ipdb
       #ipdb.set_trace()
       # arr2 = ["paris", "bangkok", "nyc", "delhi", "mexico city"]
       cityDict = {
           "nyc": [],
           "delhi": [],
           "paris": [],
           "bangkok": [],
           "mexicoCity": []
       }

       if len(obj["cities"]) == 0 :
           cityDict['nyc'] = self.getCityCounts('nyc',obj)
           cityDict['delhi'] = self.getCityCounts( 'delhi',obj)
           cityDict['paris'] = self.getCityCounts('paris',obj)
           cityDict['bangkok'] = self.getCityCounts('bangkok',obj)
           cityDict['mexicoCity'] = self.getCityCounts('mexico city',obj)


       else:
           for x in obj["cities"] :
               if x == 'mexico city' :
                   cityDict['mexicoCity'] = self.getCityCounts('mexico city', obj)
               else :
                   cityDict[x] = self.getCityCounts(x, obj)


       # cityDict['nyc'] = self.getCityCounts('nyc',obj)
       # cityDict['delhi'] = self.getCityCounts( 'delhi',obj)
       # cityDict['paris'] = self.getCityCounts('paris',obj)
       # cityDict['bangkok'] = self.getCityCounts('bangkok',obj)
       # cityDict['mexicoCity'] = self.getCityCounts('mexico city',obj)
       return cityDict

   def getCityCounts(self, city1, obj):
        """
        Getting code from frontend and running it
        """
        import urllib.request, urllib.error
        import urllib
        import json

        if city1 == 'mexico city' :
            city1 = 'mexico%20city'

        query = obj["query"]
        # parentArr = obj["parentArr"]
        topics = obj["topics"]
        city = obj["cities"]
        language = obj["langs"]

        import urllib.request, urllib.error
        import urllib

        query = urllib.parse.quote_plus(query)
        print(query)
        # Changes start

        q1 = "fq="
        q2 = "fq="
        q3 = "fq="

        url = "q=" + query


        q1 = q1 + "city:%22" + city1 + "%22"
        url = url + '&' + q1


        if topics:
            for x in topics:
                q2 = q2 + "topic:%22" + x + "%22%20OR%20"

            topic = q2[:-8]
            url = url + '&' + topic

        if language:
            for x in language:
                q3 = q3 + "lang:%22" + x + "%22%20OR%20"

            lang = q3[:-8]
            url = url + '&' + lang

        print(url)

        import requests

        inurl = 'http://localhost:8983/solr/TA/select?facet.field=date&facet.field=city&facet=on&facet.sort=index&fl=city&indent=on&rows=100&'+url

        import ipdb


        data = urllib.request.urlopen(inurl)
        content = data.read()
        docs = json.loads(content.decode('utf-8'))
        responselist = docs["facet_counts"]["facet_fields"]["date"]
        returnList = []
        for x in range(0, len(responselist) - 1, 2):

            date = responselist[x]
            count = responselist[x+1]
            myDict = {'x':date, 'y':count}
            returnList.append(myDict)

        # ipdb.set_trace()
        return returnList