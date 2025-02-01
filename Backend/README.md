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
