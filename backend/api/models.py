from django.db import models

from django.contrib.auth.models import User

class Review(models.Model):
    text = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return self.text
    

class MovieManager(models.Manager):
    def top_rated(self):
        return self.filter(rating__gte=8)

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    rating = models.FloatField()
    genre = models.ForeignKey("Genre", on_delete=models.SET_NULL, null=True, related_name="movies")

    objects = MovieManager()

    def __str__(self):
        return self.title
    
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True, blank=True)

