const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/Cluster0', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Connection error:', err));

// Define a schema and model using Mongoose
const YourModel = mongoose.model('Cluster0', new mongoose.Schema({
    // Your schema fields
}));

// Example route to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const data = await YourModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Other routes to handle CRUD operations

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
