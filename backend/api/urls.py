from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ProtectedAPIView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name = 'token_refresh'), #not sure yet
    path('protected/', ProtectedAPIView.as_view(), name = 'protected'), #not sure yet
]