const mongoose = require('mongoose');
const Subscriber = require('./models/subscribers');
const data = require('./data');
require('dotenv').config()

const DATABASE_URL = process.env.MONGO_URI;
// Connect to DATABASE
mongoose.connect(DATABASE_URL);


const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', async () => {
    console.log('Connected to database, refreshing data...');
    try {
        await Subscriber.deleteMany({});
        console.log('Old data deleted');
        await Subscriber.insertMany(data);
        console.log('New data inserted');
    } catch (err) {
        console.error('Error during data refresh:', err);
    } finally {
        mongoose.disconnect();
        console.log('Database connection closed');
    }
});
