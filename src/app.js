
const path = require('path')
const express = require('express');
const app = express()
const Subscriber = require('./models/subscribers')
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

// Your code goes here

app.use(express.static(path.join(__dirname, 'public')))

// Load your OpenAPI specification
const swaggerDocument = yaml.load(path.join(__dirname, 'subscribers_api.yml'));

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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



// Endpoint to serve your OpenAPI specification
app.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'subscribers_api.yml')); 
});



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
