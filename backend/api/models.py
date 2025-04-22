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
    genres = models.ManyToManyField('Genre', related_name='movies')
    actors = models.TextField()
    plot = models.TextField()
    poster = models.URLField(max_length=500, blank=True)

    objects = MovieManager()

    def average_rating(self):
        ratings = self.ratings.all()
        if ratings:
            return sum(r.score for r in ratings) / ratings.count()
        return None

    def __str__(self):
        return self.title
    
class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('movie', 'user')

class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
 
    def __str__(self):
        return f'{self.owner.username} — {self.text[:30]}'
