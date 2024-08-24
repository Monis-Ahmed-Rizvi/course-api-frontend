# Course Management System Frontend

This is the frontend application for the Course Management System, built with React and Material-UI.

## Features

- List, create, update, and delete courses
- List, create, and delete course instances
- Search and sort functionality for courses
- Pagination for course listings
- Responsive design using Material-UI components

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/course-management-frontend.git
   cd course-management-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:8081/api
   ```

## Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `build` directory.

## Project Structure

- `src/components/`: React components
- `src/services/`: API service functions
- `src/App.js`: Main application component
- `src/index.js`: Entry point of the application

## Dependencies

- React
- React Router
- Material-UI
- Axios

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.