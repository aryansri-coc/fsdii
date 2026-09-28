# Experiment B: React Login System (LAB MST)

A simple, focused React authentication application demonstrating simulated JWT generation, token storage in `localStorage`, and protected dashboard routing based on user roles.

## Name: Aryan Srivastava , 24BAI70116 , 24AML-4'B'
Requirements Implemented
- [x] **Username and Password fields** with form validation.
- [x] **Login Button** to submit credentials.
- [x] **Simulated JWT Creation** containing `userId`, `username`, and `role` with standard Base64 `header.payload.signature` format.
- [x] **Token Storage** in browser's `localStorage` (key: `jwt_token`).
- [x] **Displays User Role** prominently via status badge and role-specific permissions.
- [x] **Protected Dashboard** displayed only when a valid token exists; includes a **Logout** button.

## Demo Credentials
| Username | Password | Role | User ID |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | **Admin** | `USR-101` |
| `john_doe` | `user123` | **User** | `USR-102` |

## Project Structure
```
LABMST/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                 # Manages auth state and conditional rendering
    ├── index.css               # Clean styling
    ├── components/
    │   ├── Login.jsx           # Public login form with autofill demo buttons
    │   └── Dashboard.jsx       # Protected dashboard displaying role & stored JWT
    └── utils/
        └── jwt.js              # Token generation and decoding logic
```

