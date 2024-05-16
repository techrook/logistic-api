# Use the official PostgreSQL image from the Docker Hub
FROM postgres:13

# Set environment variables for the PostgreSQL database
ENV POSTGRES_DB=nest
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123

# Expose the PostgreSQL port
EXPOSE 5000
