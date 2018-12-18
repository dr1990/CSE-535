from django.conf.urls import url
from IRMod1 import views

urlpatterns = [
   url(r'^Dashboard/', views.Dashboard.as_view(), name='Dashboard'),
   url(r'^Search/', views.Search.as_view(), name='Search'),
   url(r'^getGeneralHashtags/', views.getGeneralHashtags.as_view(), name='getGeneralHashtags'),
   url(r'^getTopicHashtags/', views.getTopicHashtagsClass.as_view(), name='getTopicHashtags'),
   url(r'^getCityHashtags/', views.getCityHashtagsClass.as_view(), name='getCityHashtags'),
   url(r'^getSearch/', views.getSearch.as_view(), name='getSearch'),

]
