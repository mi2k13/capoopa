from django.conf.urls import patterns, include, url
from core.api import ChallengeResource, UserResource, AnswerResource, UserSimple
from core import views

challenge_resource = ChallengeResource()
user_resource = UserResource()
answer_resource = AnswerResource()

v1_api = Api(api_name='v1')
v1_api.register(UserSimple())
v1_api.register(EntryResource())


urlpatterns = patterns('',
    # Examples:
	url(r'^api/', include(challenge_resource.urls)),
	url(r'^api/', include(user_resource.urls)),
	url(r'^api/', include(answer_resource.urls)),	

    # Uncomment the admin/doc line below to enable admin documentation:
	# url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
	#url(r'^admin/', include(admin.web_td4.urls)),
)
