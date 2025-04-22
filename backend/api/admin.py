from django.contrib import admin
from .models import Review, Movie, Genre, Rating

admin.site.register(Genre)
admin.site.register(Review)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'get_genres')
    search_fields = ('title', 'director')
    list_filter = ('year', 'genres')

    def get_genres(self, obj):
        return ", ".join(genre.name for genre in obj.genres.all())
    get_genres.short_description = 'Genres'

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'movie', 'score')