from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ReviewViewSet, MovieViewSet, GenreViewSet, user_list, basic_review_create, ProfileListAPIView, MovieByYearAPIView
from .auth_views import LoginView, TokenBlacklistView

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'genres', GenreViewSet, basename='genre')

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('tasks/', include(router.urls)),
    path('users/', user_list),
    path('basic-review/', basic_review_create),
    path('profiles/', ProfileListAPIView.as_view()),
    path('movies-by-year/<int:year>/', MovieByYearAPIView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
]
