# 🚀 Blogify API

> A robust, RESTful API for a modern blogging platform with integrated payments and file management.

**Live Demo:** [Ready for Render Deployment]

---

## 📖 Description

Blogify API is a backend service for a full-featured blogging platform. It provides a secure and scalable foundation for managing user authentication, blog posts, media uploads, and premium content subscriptions. Built with a modern Node.js stack, it demonstrates best practices in API design, security, and cloud integrations.

## ✨ Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
- **Post Management:** Complete CRUD operations for blog posts with cursor-based pagination.
- **Media Management:** Seamless image uploads and hosting via Cloudinary.
- **Premium Features:** Payment processing, checkout, and order management handled by Stripe.
- **Cloud Database:** Reliable and scalable data storage with MongoDB Atlas.
- **Security:** Password hashing, protected routes, and input validation.

## 🛠 Tech Stack

- **Runtime:** Node.js 🟩
- **Framework:** Express.js 🚂
- **Database:** MongoDB with Mongoose ODM 🍃
- **Authentication:** JWT (JSON Web Tokens) 🔐
- **File Storage:** Cloudinary ☁️
- **Payment Processing:** Stripe 💳
- **Cloud Database:** MongoDB Atlas 🌐

---

## 📋 Prerequisites

Before running this project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB installation)
- A [Cloudinary](https://cloudinary.com/) account
- A [Stripe](https://stripe.com/) account

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogify-api.git
   cd blogify-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see the Environment Variables section below).

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server should now be running on `http://localhost:3000` (or your configured PORT).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogify

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```
*(Remember to never commit your actual `.env` file to version control!)*

---

## 📡 API Endpoints

### 👤 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | User login | No |

### 📝 Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/posts` | Get all posts (with cursor pagination) | No |
| `GET` | `/api/posts/:id` | Get a single post by ID | No |
| `POST` | `/api/posts` | Create a new post | Yes |
| `PUT` | `/api/posts/:id` | Update an existing post | Yes |
| `DELETE` | `/api/posts/:id` | Delete a post | Yes |

### 🖼️ Media Uploads
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/upload` | Upload image to Cloudinary | Yes |

### 💳 Payments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/payments/create-payment-intent` | Create a Stripe payment intent | Yes |
| `POST` | `/api/payments/confirm-payment` | Confirm a Stripe payment | Yes |

### 📦 Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/orders` | Create an order | Yes |
| `GET` | `/api/orders/my-orders` | Get current user's orders | Yes |
| `GET` | `/api/orders/:id` | Get specific order details | Yes |

---

## 🚀 Running the Project

To run the project in development mode with auto-reloading (requires `nodemon`):
```bash
npm run dev
```

To run the project in production mode:
```bash
npm start
```

---

## 📁 Project Structure

```text
blogify-api/
├── config/             # Configuration files (DB, Cloudinary, etc.)
├── controllers/        # Route controllers (logic for endpoints)
├── middlewares/        # Custom middlewares (auth, error handling, etc.)
├── models/             # Mongoose database schemas
├── routes/             # Express API routes
├── utils/              # Utility functions and helpers
├── .env                # Environment variables (ignored by Git)
├── .gitignore          # Git ignore file
├── package.json        # Project metadata and dependencies
└── server.js           # Application entry point
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
