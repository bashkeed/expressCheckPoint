const express = require('express');
const app = express();
const path = require('path');

// Middleware to restrict access to weekdays from 9 AM to 5 PM
app.use((req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const hour = now.getHours();    // 0 = midnight, 23 = 11 PM

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Allow access on weekdays between 9 AM and 5 PM
    } else {
        res.status(403).send("This website is only available on weekdays from 9 AM to 5 PM.");
    }
});

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/home', (req, res) => {
  res.render('home');
  console.log('hello home')
});
app.get('/contact', (req, res) => {
  res.render('contact');
  console.log('hello contact')
});
app.get('/services', (req, res) => {
  res.render('services');
  console.log('hello services')
});

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});