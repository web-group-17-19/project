from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from .views import (
    ReviewViewSet, 
    MovieViewSet, 
    GenreViewSet,
    RatingViewSet,
    MovieDetailAPIView,
    submit_rating,
    get_user_rating,
    create_review,
    get_reviews_by_movie
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
    path('movies/<int:pk>/', MovieDetailAPIView.as_view(), name='movie-detail'),
    path('ratings/', submit_rating, name='submit_rating'),
    path('ratings/<int:movie_id>/', get_user_rating, name='get_user_rating'),
    path('reviews/', create_review),
    path('reviews/<int:movie_id>/', get_reviews_by_movie),
]
