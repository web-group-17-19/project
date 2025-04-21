from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class MovieManager(models.Manager):
    def released_this_year(self, year):
        return self.filter(release_date__year=year)

class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField()
    genre = models.CharField(max_length=255)
    director = models.CharField(max_length=255)
    actors = models.TextField()
    plot = models.TextField()
    poster = models.URLField(max_length=500, blank=True)

    objects = MovieManager()

    def __str__(self):
        return self.title

class Review(models.Model):
    
     text = models.TextField()
     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
 
     def __str__(self):
         return self.text

class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ratings')
    source = models.CharField(max_length=100)
    value = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.source}: {self.value}"

