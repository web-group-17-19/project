from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Review, Movie, Genre, Rating

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class RatingSerializer(serializers.Serializer):
    source = serializers.CharField()
    value = serializers.CharField()

class MovieSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['owner']

class BasicReviewSerializer(serializers.Serializer):
    text = serializers.CharField()
    rating = serializers.IntegerField()

