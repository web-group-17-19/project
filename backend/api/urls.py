from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MovieListView, MovieDetailView,
    LoginView, MovieAverageRatingView, ReviewViewSet
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('movies/', MovieListView.as_view()),
    path('movies/<int:pk>/', MovieDetailView.as_view()),
    path('movies/ratings/', MovieAverageRatingView.as_view()),
    path('login/', LoginView.as_view()),
    path('tasks/', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
]
