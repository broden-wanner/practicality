from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('', include('frontend.urls')),
    path('api/', include('backend.urls')),
    path('api/auth/', include('accounts.urls')),
    path('admin/', admin.site.urls),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static('/', document_root=settings.STATIC_ROOT)
