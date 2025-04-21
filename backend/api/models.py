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
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_date = models.DateField()
    genres = models.ManyToManyField(Genre, related_name='movies')

    objects = MovieManager()

    def __str__(self):
        return self.title

class Review(models.Model):
    
     text = models.TextField()
     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
 
     def __str__(self):
         return self.text

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"
