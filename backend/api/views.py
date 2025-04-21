from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Review, Movie, Genre, Profile
from .serializers import ReviewSerializer, MovieSerializer, GenreSerializer, SimpleUserSerializer, BasicReviewSerializer
from django.contrib.auth.models import User

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = SimpleUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def basic_review_create(request):
    serializer = BasicReviewSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileListAPIView(APIView):
    def get(self, request):
        profiles = Profile.objects.all()
        data = [{'user': p.user.username, 'bio': p.bio} for p in profiles]
        return Response(data)

class MovieByYearAPIView(APIView):
    def get(self, request, year):
        movies = Movie.objects.released_this_year(year)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
