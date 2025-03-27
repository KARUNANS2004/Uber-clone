# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:

This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, creates a new user, and returns an authentication token.

### Request Body:

The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with at least 3 characters (required)
  - `lastName`: A string with at least 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A strong password with at least 6 characters (required)

### Example Request Body:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Responses:

#### Success (201):

- **Description**: User registered successfully.
- **Body**:
  ```json
  {
    "token": "jwt-auth-token",
    "user": {
      "_id": "user-id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Client Error (400):

- **Description**: Validation error or user already exists.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "User already exist"
  }
  ```

### Notes:

- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password should be strong and meet the required criteria.

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:

This endpoint is used to log in an existing user. It validates the input data, checks if the user exists, compares the password, and returns an authentication token.

### Request Body:

The request body should be a JSON object with the following fields:

- `email`: A valid email address (required)
- `password`: A strong password with at least 6 characters (required)

### Example Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Responses:

#### Success (200):

- **Description**: User logged in successfully.
- **Body**:
  ```json
  {
    "token": "jwt-auth-token",
    "user": {
      "_id": "user-id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Client Error (400):

- **Description**: Validation error or invalid email/password.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Notes:

- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password should be strong and meet the required criteria.

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: GET

### Description:

This endpoint is used to log out an authenticated user. It clears the authentication token from cookies and adds the token to a blacklist.

### Responses:

#### Success (200):

- **Description**: User logged out successfully.
- **Body**:
  ```json
  {
    "message": "Logged Out"
  }
  ```

### Notes:

- Ensure that the `Authorization` header contains the token when making the request.

# Captain Registration Endpoint Documentation

## Endpoint: `/captains/register`

### Method: POST

### Description:

This endpoint is used to register a new captain. It validates the input data, creates a new captain, and returns the captain's details.

### Request Body:

The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with at least 3 characters (required)
  - `lastName`: A string with at least 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A strong password (required)
- `vehicle`: An object containing:
  - `color`: A string with at least 3 characters (required)
  - `plate`: A string with at least 3 characters (required)
  - `capacity`: An integer with a minimum value of 1 (required)
  - `vehicleType`: A string that must be one of `Car`, `Motorcycle`, or `Autos` (required)

### Example Request Body:

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "StrongPassword123!",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "Car"
  }
}
```

### Responses:

#### Success (201):

- **Description**: Captain registered successfully.
- **Body**:
  ```json
  {
    "captain": {
      "_id": "captain-id",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "Car"
      }
    }
  }
  ```

#### Client Error (400):

- **Description**: Validation error.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Notes:

- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password should be strong and meet the required criteria.

# Captain Login Endpoint Documentation

## Endpoint: `/captains/login`

### Method: POST

### Description:

This endpoint is used to log in an existing captain. It validates the input data, checks if the captain exists, compares the password, and returns an authentication token.

### Request Body:

The request body should be a JSON object with the following fields:

- `email`: A valid email address (required)
- `password`: A strong password with at least 6 characters (required)

### Example Request Body:

```json
{
  "email": "jane.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Responses:

#### Success (200):

- **Description**: Captain logged in successfully.
- **Body**:
  ```json
  {
    "token": "jwt-auth-token",
    "captain": {
      "_id": "captain-id",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "Car"
      }
    }
  }
  ```

#### Client Error (400):

- **Description**: Validation error or invalid email/password.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Notes:

- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password should be strong and meet the required criteria.

# Captain Profile Endpoint Documentation

## Endpoint: `/captains/profile`

### Method: GET

### Description:

This endpoint is used to get the profile of an authenticated captain.

### Responses:

#### Success (200):

- **Description**: Captain profile retrieved successfully.
- **Body**:
  ```json
  {
    "captain": {
      "_id": "captain-id",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "Car"
      }
    }
  }
  ```

### Notes:

- Ensure that the `Authorization` header contains the token when making the request.

# Captain Logout Endpoint Documentation

## Endpoint: `/captains/logout`

### Method: GET

### Description:

This endpoint is used to log out an authenticated captain. It clears the authentication token from cookies and adds the token to a blacklist.

### Responses:

#### Success (200):

- **Description**: Captain logged out successfully.
- **Body**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Notes:

- Ensure that the `Authorization` header contains the token when making the request.

# Ride Creation Endpoint Documentation

## Endpoint: `/rides/create`

### Method: POST

### Description:

This endpoint is used to create a new ride. It validates the input data, creates a new ride, and returns the ride details.

### Request Body:

The request body should be a JSON object with the following fields:

- `pickup`: A string with at least 3 characters (required)
- `destination`: A string with at least 3 characters (required)
- `vehicleType`: A string that must be one of `auto`, `car`, or `motorcycle` (required)

### Example Request Body:

```json
{
  "pickup": "563/11-A, Kaikondrahalli, Bengaluru Karnataka",
  "destination": "Third Wave Coffee, 17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka",
  "vehicleType": "car"
}
```

### Responses:

#### Success (201):

- **Description**: Ride created successfully.
- **Body**:
  ```json
  {
    "ride": {
      "_id": "ride-id",
      "user": "user-id",
      "pickup": "563/11-A, Kaikondrahalli, Bengaluru Karnataka",
      "destination": "Third Wave Coffee, 17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka",
      "vehicleType": "car",
      "fare": "fare-amount",
      "otp": "otp-code"
    }
  }
  ```

#### Client Error (400):

- **Description**: Validation error.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Notes:

- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# Ride Fare Calculation Endpoint Documentation

## Endpoint: `/rides/get-fare`

### Method: GET

### Description:

This endpoint is used to calculate the fare for a ride based on the pickup and destination locations.

### Query Parameters:

- `pickup`: A string with at least 3 characters (required)
- `destination`: A string with at least 3 characters (required)

### Example Request:

```
GET /rides/get-fare?pickup=563/11-A, Kaikondrahalli, Bengaluru Karnataka&destination=Third Wave Coffee, 17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka
```

### Responses:

#### Success (200):

- **Description**: Fare calculated successfully.
- **Body**:
  ```json
  {
    "auto": "fare-amount",
    "car": "fare-amount",
    "motorcycle": "fare-amount"
  }
  ```

#### Client Error (400):

- **Description**: Validation error.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "query"
      }
    ]
  }
  ```

### Notes:

- Ensure that the `Authorization` header contains the token when making the request.

# Uber Clone - Frontend

This project is the frontend for an Uber-like application built with React, TypeScript, and Vite. It includes features for user and captain registration, login, ride booking, and more.

## Features

- User and Captain registration and login.
- Ride booking with fare calculation.
- Real-time ride status updates.
- Context API for state management.
- Integration with a backend API for authentication and ride management.

## Tech Stack

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling.
- **Axios**: For API requests.
- **GSAP**: For animations.

---

## Available Scripts

### Development Server

To start the development server:

```bash
npm run dev
```

### Build

To build the project for production:

```bash
npm run build
```

### Lint

To lint the project:

```bash
npm run lint
```

---

## Environment Variables

The following environment variables are required for the project:

- `VITE_BASE_URL_FOR_BACKEND`: The base URL for the backend API.

Example `.env` file:

```env
VITE_BASE_URL_FOR_BACKEND=http://localhost:3000
```

---

## Project Structure

```
frontend/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── context/          # Context API for state management
│   ├── Panel components/ # UI panels for ride booking
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── package.json          # Project configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

---

## Key Components

### User Signup (`src/components/UserSignup.tsx`)

Allows users to register by providing their name, email, and password.

### User Login (`src/components/UserLogin.tsx`)

Allows users to log in with their email and password.

### Captain Signup (`src/components/CaptainSignup.tsx`)

Allows captains to register by providing their name, email, password, and vehicle details.

### Captain Login (`src/components/CaptainLogin.tsx`)

Allows captains to log in with their email and password.

### Home (`src/components/Home.tsx`)

The main screen for users to book rides. Includes pickup and destination input fields, fare calculation, and ride confirmation.

### Captain Home (`src/components/CaptainHome.tsx`)

The main screen for captains to view their profile and ride details.

---

## State Management

### User Context (`src/context/UserContext.tsx`)

Manages the state for logged-in users, including their profile and authentication token.

### Captain Context (`src/context/CaptainContext.tsx`)

Manages the state for logged-in captains, including their profile and authentication token.

---

## API Endpoints

### Backend Integration

The frontend communicates with the backend API for the following features:

- **User Registration**: `/users/register`
- **User Login**: `/users/login`
- **Captain Registration**: `/captains/register`
- **Captain Login**: `/captains/login`
- **Ride Fare Calculation**: `/rides/get-fare`
- **Ride Creation**: `/rides/create`

---

## Animations

The project uses **GSAP** for animations, including:

- Sliding panels for ride booking.
- Smooth transitions for ride confirmation and status updates.

---

## Styling

The project uses **Tailwind CSS** for styling. All components are styled using utility classes for a consistent and responsive design.

---

## Notes

- Ensure the backend server is running and accessible at the URL specified in `VITE_BASE_URL_FOR_BACKEND`.
- Use the provided `.env` file to configure the environment variables.
- For any issues, check the browser console and network tab for errors.
