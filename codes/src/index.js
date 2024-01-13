const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection using Mongoose
mongoose.connect('mongodb://0.0.0.0:27017/Login-tut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema and model for your data
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormDataModel = mongoose.model('Login-tut', FormDataSchema);

// Serve your static files (HTML, CSS, JavaScript, etc.)
app.use(express.static('public')); // Assuming your HTML file is in the 'public' folder

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new document with the submitted data
    const formData = new FormDataModel({ name, email, message});

    // Save the document to MongoDB
    await formData.save();
    
    // Respond with success message or redirect as needed
    res.status(200).send('Form data saved successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
