
const path = require('path')
const express = require('express');
const app = express()
const Subscriber = require('./models/subscribers')


// Your code goes here

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})



// GET All Subscribers
app.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get all subscriber names and channels
app.get('/subscribers/names', async (req, res) => {
    try {
        const subscriberNames =await Subscriber.find().select('name subscribedChannel -_id');
        res.json(subscriberNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// Get subscriber by ID
app.get('/subscribers/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
        return res.status(404).json({message:'subscriber not found'});
    } 
    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ message: 'Invalid Id' });
  }
})









module.exports = app;
