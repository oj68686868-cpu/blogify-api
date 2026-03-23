// src/seeds/seed.js
// Run with: node src/seeds/seed.js
// Seeds the database with a mock user and 10 blog posts

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Post = require('../models/posts.model.js');
const User = require('../models/user.model.js');

// ─── Mock Data (Mockaroo-style) ───────────────────────────────────────────────
const mockUser = {
    username: 'demo_blogger',
    email: 'demo@blogify.com',
    password: 'demo1234',
};

const mockPostTitles = [
    { title: 'Getting Started with Node.js', content: 'Node.js is a powerful runtime for building server-side applications. In this post, we explore the core concepts that every beginner needs to know.' },
    { title: 'Understanding RESTful APIs', content: 'REST is an architectural style that uses HTTP methods to interact with resources. Learn how to design clean, intuitive endpoints for your next project.' },
    { title: 'MongoDB vs PostgreSQL: Which to Choose?', content: 'Choosing between a document database and a relational one is a key architectural decision. We break down the trade-offs so you can make an informed choice.' },
    { title: 'Mastering Express Middleware', content: 'Middleware functions are the backbone of an Express application. This guide covers custom middleware, error handlers, and third-party integrations.' },
    { title: 'JWT Authentication Explained', content: 'JSON Web Tokens provide a stateless mechanism for verifying user identity. In this post, we build a complete login flow from scratch.' },
    { title: 'Why You Should Never Store Passwords in Plain Text', content: 'Password security is non-negotiable. This post explains hashing, salting, and why bcrypt is the industry standard for protecting user credentials.' },
    { title: 'Introduction to Mongoose ODM', content: 'Mongoose makes working with MongoDB in Node.js a breeze. We cover schemas, models, validation, and how to structure your data layer.' },
    { title: 'How to Deploy a Node.js App on Railway', content: 'Railway makes it straightforward to get your Node.js API live in minutes. Follow this step-by-step guide to deploy your first application.' },
    { title: 'Clean Code Principles for Backend Devs', content: 'Writing clean, maintainable code is an art. We look at naming conventions, function size, separation of concerns, and code review best practices.' },
    { title: 'The MVC Pattern in Express', content: 'Model-View-Controller keeps your codebase organised and easy to scale. This tutorial demonstrates how to structure a full Express project using MVC.' },
];

// ─── Seed Function ─────────────────────────────────────────────────────────
const seedDB = async () => {
    try {
        // 1. Connect
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected for seeding...\n');

        // 2. Clear existing data
        await Post.deleteMany({});
        await User.deleteMany({ email: mockUser.email });
        console.log('🗑️  Cleared existing posts and demo user.');

        // 3. Create the demo user with a hashed password
        const hashedPassword = await bcrypt.hash(mockUser.password, 10);
        const user = await User.create({
            username: mockUser.username,
            email: mockUser.email,
            password: hashedPassword,
        });
        console.log(`👤 Created demo user: ${user.email}`);

        // 4. Create 10 posts linked to the demo user
        const posts = mockPostTitles.map(p => ({
            ...p,
            author: user._id,
        }));
        const inserted = await Post.insertMany(posts);
        console.log(`📝 Inserted ${inserted.length} mock posts.\n`);

        console.log('🌱 Seed complete! Here is a summary:');
        console.log('   Demo user:', user.email, '(password: demo1234)');
        console.log('   Posts count:', inserted.length);
        console.log('\n📌 You can now connect MongoDB Compass to view the data.');

    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB.');
        process.exit(0);
    }
};

seedDB();
