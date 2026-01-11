
# Chefonex 

---

Chefonex is a modern online platform that connects passionate home chefs with customers looking for fresh, healthy, and affordable homemade meals. 

Chefonex supports **three user roles**: Admin, Chef, and Customer, each with their own dashboard and permissions. 

Admins have full control over platform management including fraud detection, request approvals, and platform statistics.

For home chefs, the platform offers a dedicated dashboard to create meals, manage orders, and grow their cooking business directly from their kitchen — without needing a physical restaurant.

Customers can explore daily menus, view detailed meal information, place orders, make secure payments, and track order status in real time.

The platform includes essential features such as Firebase authentication, JWT-secured API access, role-based routes, Stripe payment system, real-time status updates, review & favorites system, advanced forms using react-hook-form, and a beautifully responsive UI with animations.

Built using the MERN Stack, Chefonex delivers a smooth, secure, and scalable experience for all users.

## Features

### 🔐 **Authentication & Security**

- Firebase Email/Password Authentication
- JWT-based secure API access 
- Role-based access control (User / Chef / Admin)
- Protected routes with token validation
- Environment variable protection for Firebase & MongoDB

### 👤 **User Roles**

### 1. Customer

- Register & Login
- Browse meals, view details
- Place orders with confirmation modal
- Make payments via Stripe
- Add / Remove favorites
- Submit, update & delete reviews
- View My Orders, My Reviews, My Favorites
- Request to become Chef / Admin

### 2. Chef

- Create meals
- Manage own meals (update / delete)
- View & process order requests
  - Accept / Cancel / Deliver
- Live order status update
- See Chef-specific dashboard statistics

### 3. Admin

- Manage all users (role & fraud control)
- Manage chef / admin requests
  - Approve / Reject with auto chefId generation
- Platform statistics with charts 
- Fraud system:
  - Fraud chef → cannot create meals
  - Fraud user → cannot place orders

### 📄 **Core Pages**

### Public Pages

- Home
- Meals Page with Sort & Pagination
- Login / Register

### Private Dashboard Pages

- My Profile
- My Orders
- My Reviews
- My Favorites
- Chef Dashboard 
  - Create Meal
  - My Meals
  - Order Requests
- Admin Dashboard 
  - Manage Users
  - Manage Requests
  - Statistics
    
## Technologies Used

### Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- React Hook Form
- Axios 
- Framer Motion
- Recharts
- SweetAlert2 

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment

### Others

- Firebase Authentication
- Environment Variables
- Image Upload API
- Vercel
- CORS Handled Properly

## Project Dependencies

#### Dependencies List

```
 "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",
    "motion": "^12.23.26",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.4",
    "tailwindcss": "^4.1.17"
  }
```
#### DevDependencies List

```
 "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "daisyui": "^5.5.8",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
```
## How to Run Locally

#### 1. Clone the repository

```
git clone https://github.com/Azim-Ul-Karim/Chefonex-Client
cd chefonex-client
```

#### 2. Install dependencies

```
npm i
```

#### 3. Create Environment File

Inside the project root, create a file named `.env.local`, then add your Firebase & Server credentials.

```
VITE_apiKey=your_firebase_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_firebase_app_id
//VITE_SERVER_URL=https://your-server-url.com//
```

#### 4. Run development server
```
npm run dev
```
## Visit Here: 
https://chefonex.web.app/
