const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
const mongoose = require('mongoose');
const cors = require("cors");

async function connect () {
    try{
        await mongoose.connect("mongodb+srv://jouke:5kG6HeZ444X7XzaX@database.0g46892.mongodb.net/?retryWrites=true&w=majority&appName=database", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

connect();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use('/login', require('./routes/loginRoutes'));
