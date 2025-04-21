from rest_framework import serializers
from .models import Movie, Review, Genre
from django.contrib.auth.models import User

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['owner']

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CustomMovieRatingSerializer(serializers.Serializer):
    title = serializers.CharField()
    average_rating = serializers.FloatField()
