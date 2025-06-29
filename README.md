 SimpleTweeter 🐦

SimpleTweeter is a minimalist, personal Twitter-like application where users can jot down their thoughts privately. Built for local usage, it allows a single user to log in, post, and edit tweets (thoughts), but does **not support public sharing or visibility** across multiple users.

Think of it as your private Twitter diary, secured with authentication.

It allows users to:
- Log in securely
- Post, edit, or delete their thoughts
- Like/unlike their own thoughts
- Keep everything completely **private** and local

> ✅ Perfect for journaling, private note-taking, or just practicing full-stack dev skills.

🚀 Features

- 🔐 **User Authentication** using JWT and bcrypt
- 📝 **Post Tweets** privately (notes/thoughts)
- ✏️ **Edit** existing posts
- ❤️ **Like/Unlike** your own thoughts
- 👤 **Login / Logout** functionality
- 🌙 **Dark-themed UI** styled with Tailwind CSS
- 🔒 Fully Local: No public timeline or user feed

![Node.js](https://img.shields.io/badge/Backend-Node.js-brightgreen?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express.js-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![EJS](https://img.shields.io/badge/View-EJS-blue?logo=ejs)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-blueviolet?logo=tailwindcss)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS Templates
- **Database:** MongoDB + Mongoose
- **Styling:** Tailwind CSS
- **Authentication:** JSON Web Tokens (JWT) + bcrypt


📂 Project Structure (Brief Overview)
SimpleTweeter/
├── app.js # Main Express app
├── Models/
│ ├── user.js # Mongoose User schema
│ └── post.js # Mongoose Post schema
├── views/ # EJS templates
├── public/ # Static files
└── package.json

📌 Notes
- SimpleTweeter is a **local-only** app — there’s no public feed or cross-user interaction.  
- It's ideal as a personal diary or for practicing full-stack CRUD/auth systems.
- This project is intended for local use only.(Thanks to Sheriyans coding School)
- Posts are **private to the user** and cannot be accessed or viewed by others.
- Built as a learning/project exercise on full-stack authentication and CRUD handling.


✍️ Author

Developed with ❤️ by D. Vivek Pai
*Student at NMAM Institute of Technology*

