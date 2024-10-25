# Docker Container Setup Documentation for Wayfarix

This document provides instructions for pulling, renaming, and running the Docker containers for the Wayfarix project.

## Prerequisites

- Ensure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- Open a terminal or command prompt.

## Step 1: Pull the Docker Containers

### Pull `govardhan06/wayfarix:latest`

1. Run the following command to pull the Wayfarix container:

   ```bash
   docker pull govardhan06/wayfarix:latest
   ```

## Step 2: Rename the Docker Container (Optional)

1. If you want to rename the container, use the following command:

   ```bash
   docker tag govardhan06/wayfarix:latest wayfarix:latest
   ```

## Step 3: Verify the Container

1. To confirm that the container has been renamed, list all Docker images:

   ```bash
   docker images
   ```

   You should see `wayfarix:latest` in the list if you renamed it.

## Step 4: Run the Docker Container

1. To run the Wayfarix container, use the following command, mapping it to port 8000:

   ```bash
   docker run -p 8000:8000 govardhan06/wayfarix:latest
   ```

## Conclusion

You have successfully pulled, renamed (if applicable), and run the Docker container for Wayfarix.

For further information or troubleshooting, refer to the [Docker documentation](https://docs.docker.com/).
