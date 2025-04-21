from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from .views import (
    ReviewViewSet,
    MovieViewSet,
    GenreViewSet,
    user_list,
    basic_review_create,
    MovieListAPIView,
    MovieByYearAPIView,
)


router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'genres', GenreViewSet, basename='genre')

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # You can switch to LoginView.as_view() if you want custom logic
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('tasks/', include(router.urls)),
    path('users/', user_list),
    path('basic-review/', basic_review_create),
    path('movies-list/', MovieListAPIView.as_view(), name='movie-list'),
    path('movies-by-year/<int:year>/', MovieByYearAPIView.as_view()),
]
