# Use an official Python runtime as a parent image
FROM python:3.6.7-slim

# Set the working directory to /authentication
WORKDIR /user

# Copy the current directory contents into the container at /app
COPY . /user

# Need gcc to compile some dependicies for this project...
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python-dev \
    gcc \
  && rm -rf /var/lib/apt/lists/*

# Install pipenv so that we can use it to generate a requirements.txt file
RUN pip install pipenv

# Generate the requirements.txt file so that we can install app dependencies
#   Running `pipenv install` inside of a docker container crashes miserably
#   so this is our workaround...
RUN pipenv lock -r >> requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 8001 available to the world outside this container
EXPOSE 8001

# Define environment variable
ENV PYTHONPATH "/"

# Run app.py when the container launches
CMD ["python", "app/app.py"]
