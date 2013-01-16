from django.conf.urls import patterns, include, url
from tastypie.api import Api
from core.api import UserResource, ChallengeResource, AnswerResource #UserResource
from core import views


core_api = Api(api_name='core')
core_api.register(UserResource())
core_api.register(ChallengeResource())
core_api.register(AnswerResource())

urlpatterns = patterns('',
    # Examples:
	url(r'^api/', include(core_api.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
	# url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
	#url(r'^admin/', include(admin.web_td4.urls)),
)
