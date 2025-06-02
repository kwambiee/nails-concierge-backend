# Nails Concierge Backend

This is the backend API for the Nails Concierge platform, built with Node.js, Express, MongoDB, and Passport.js for authentication.

## Features

- User authentication (local & Google OAuth)
- Role-based access: client, technician, admin
- Booking management
- Service management
- Technician and client profiles
- Reviews and ratings
- Payment processing
- Earnings tracking
- Notifications

## Project Structure

```

├── src
    ├── config/
    │   ├── db.js
    │   └── passport.js
    ├── controllers/
    │   ├── authController.js
    │   ├── userController.js
    │   ├── bookingController.js
    │   ├── serviceController.js
    │   ├── clientController.js
    │   ├── technicianController.js
    │   ├── reviewController.js
    │   ├── earningsController.js
    │   ├── paymentController.js
    │   └── notificationController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Booking.js
    │   ├── Service.js
    │   ├── Client.js
    │   ├── Technician.js
    │   ├── Review.js
    │   └── Payment.js
    ├── routes/
    │   └── v1/
    │       └── index.js
    └── utils/
        └── logger.js
├── package-lock.json
├── package.json
├── server.js
├── app.js
├── .env.example
├── .gitignore

```


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```
    yourMONGO_URI=<-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    SESSION_SECRET=<your-session-secret>
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

5. The API will be running at [http://localhost:4000](http://localhost:4000)

## API Endpoints

All endpoints are prefixed with `/v1`.

- **Auth:** `/v1/auth`
- **Users:** `/v1/users`
- **Bookings:** `/v1/bookings`
- **Services:** `/v1/services`
- **Clients:** `/v1/clients`
- **Technicians:** `/v1/technicians`
- **Reviews:** `/v1/reviews`
- **Earnings:** `/v1/earnings`
- **Payments:** `/v1/payments`
- **Notifications:** `/v1/notifications`

Refer to the route files in [`src/routes/v1/`](src/routes/v1/index.js) for detailed endpoints.

## Authentication

- JWT-based authentication for API endpoints.
- Google OAuth2 login supported.

## License

MIT

---


