from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

# Role Choices
ROLE_CHOICES = (("Student", "Student"), ("Teacher", "Teacher"))

class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    full_name = models.CharField(unique=True, max_length=100)
    role = models.CharField(choices=ROLE_CHOICES, default="Student", max_length=100)
    otp = models.CharField(max_length=100, null=True, blank=True)
    refresh_token = models.CharField(max_length=1000, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    image = models.FileField(upload_to="user_folder", default="user_folder/default-user.jpg", null=True, blank=True)
    full_name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    about = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name or self.user.full_name

    def save(self, *args, **kwargs):
        """Ensure full_name is always synchronized with User."""
        if not self.full_name:
            self.full_name = self.user.full_name
        super().save(*args, **kwargs)
        if self.user.full_name != self.full_name:
            self.user.full_name = self.full_name
            self.user.save(update_fields=["full_name"])

@receiver(post_save, sender=User)
def create_or_update_profile(sender, instance, created, **kwargs):
    """Create or update the Profile when User is saved."""
    # ✅ Lazy import of Teacher model to prevent circular import issues
    Teacher = apps.get_model("api", "Teacher")  # "api" is the app name
   # If user is a Teacher, create/update the Teacher model
    if instance.role == "Teacher":
        Teacher.objects.update_or_create(user=instance, defaults={"full_name": instance.full_name})
    else:
        # If user role is changed from Teacher to Student, delete the Teacher instance
        Teacher.objects.filter(user=instance).delete()
    Profile.objects.update_or_create(user=instance, defaults={"full_name": instance.full_name})
