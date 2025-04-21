from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Review, Movie, Genre, Profile

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'release_date', 'genres']

class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    movie = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['owner']

class SimpleUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()

class BasicReviewSerializer(serializers.Serializer):
    text = serializers.CharField()
    rating = serializers.IntegerField()
