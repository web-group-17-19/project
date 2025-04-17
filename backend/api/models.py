from django.db import models

from django.contrib.auth.models import User

class Review(models.Model):
    text = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return self.text
