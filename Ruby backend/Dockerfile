# Use the official Ruby image as the base image
FROM ruby:latest

# Set the working directory in the container
WORKDIR /app

# Copy the Gemfile and Gemfile.lock from your project directory into the container
COPY Gemfile public ./

# Install dependencies using Bundler
RUN bundle install
RUN gem install thin

# Copy the rest of your application code into the container
COPY . .

# Expose port 8080 (the default port for Sinatra)
EXPOSE 8080

# Command to run your application using the built-in Ruby web server
CMD ["rackup", "--server", "thin"]
CMD ["ruby", "app.rb"]
