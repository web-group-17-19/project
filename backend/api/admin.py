from django.contrib import admin
from .models import Review, Movie, Genre, Rating

admin.site.register(Genre)
admin.site.register(Rating)
admin.site.register(Review)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'genre')
    search_fields = ('title', 'genre', 'director')
    list_filter = ('year', 'genre')
