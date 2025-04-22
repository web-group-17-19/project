from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Review, Movie, Genre, Rating

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'movie', 'score']

    def validate(self, data):
        user = self.context['request'].user  
        movie = data.get('movie')
        if Rating.objects.filter(user=user, movie=movie).exists():
            raise serializers.ValidationError("You have already rated this movie.")
        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class MovieSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    genres = GenreSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

    def get_average_rating(self, obj):
        avg = obj.average_rating()
        return round(avg, 1) if avg else None

class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['owner']

class BasicReviewSerializer(serializers.Serializer):
    text = serializers.CharField()
    rating = serializers.IntegerField()

