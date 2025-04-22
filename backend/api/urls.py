from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from .views import (
    ReviewViewSet, 
    MovieViewSet, 
    GenreViewSet,
    RatingViewSet,
    basic_review_create,
    MovieListAPIView, 
    MovieWithRatingsAPIView
)


router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'ratings', RatingViewSet, basename='rating')

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('tasks/', include(router.urls)),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('basic-review/', basic_review_create),
    path('movies-list/', MovieListAPIView.as_view(), name='movie-list'),
    path('movies-with-ratings/', MovieWithRatingsAPIView.as_view()),
]
