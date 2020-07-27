# Backend

### Django

[Django](https://www.djangoproject.com/) is used for the backend REST API with the help
of the popular [Django REST Framework](https://www.django-rest-framework.org/). It provides
relatively simple endpoints for accessing and creating data along with managing
the user accounts and authentication. Please read through both the Django docs and Django
REST Framework docs in order to understand the backend.

Largely the built-in features with Django REST Framework are used such as the `ModelSerializer`,
`ModelViewSet`, and `DefaultRouter`. This eliminates a lot of boilerplate code for managing the
database based on Django Models.

The Django applicaiton is hosted on a DigitalOcean droplet using an Nginx server.

### Database

The database is a Postgres database hosted on the same server as the backend.
