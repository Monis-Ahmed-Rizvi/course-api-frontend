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

1. Build the Docker image:
   ```
   docker build -t course-api-frontend .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 course-api-frontend
   ```

## Project Structure

- `src/components/`: React components
- `src/App.js`: Main application component
- `src/index.js`: Entry point of the application

## Docker Compose

To run both the frontend and backend together, use the `docker-compose.yaml` file in the root of the backend repository:

```
docker-compose up
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.