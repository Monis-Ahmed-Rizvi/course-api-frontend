# Course Management System Frontend

This is the frontend application for the Course Management System, built with React and Material-UI.

## Features

- User interface for managing courses and course instances
- Create, read, update, and delete operations for courses
- Create, read, and delete operations for course instances
- Responsive design using Material-UI components

## Prerequisites

- Node.js 14 or later
- npm 6 or later
- Docker (for containerization)

## Setup and Running

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/your-username/course-api-frontend.git
   cd course-api-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Docker Deployment

This frontend is designed to work in conjunction with the backend service using Docker Compose. The `docker-compose.yaml` file is located in the backend repository.

To run the frontend independently using Docker:

1. Build the Docker image:
   ```
   docker build -t course-api-frontend .
   ```

2. Run the container:
   ```
   docker run -p 3000:80 course-api-frontend
   ```

Alternatively, you can pull the pre-built image from DockerHub:

```
docker pull moinsahmedrizvi/course-api-frontend:latest
docker run -p 3000:80 moinsahmedrizvi/course-api-frontend:latest
```

Note: When running the frontend independently, you'll need to ensure that the backend service is accessible and update the API endpoint in the frontend configuration accordingly.

## Docker Compose

To run both the frontend and backend together:

1. Ensure you have both the frontend and backend repositories cloned as sibling directories:
   ```
   parent-directory/
   ├── course-api-frontend/
   └── course-api-backend/
   ```

2. Navigate to the parent directory containing both repos.

3. Run:
   ```
   docker-compose -f course-api-backend/docker-compose.yaml up
   ```

This will pull the Docker images for both services from DockerHub and run them together.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.