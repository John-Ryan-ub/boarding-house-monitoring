
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

const Tenant = mongoose.model('Tenant', new mongoose.Schema({
    name: String,
    contactNumber: Number,
    email: String,
    monthlyRent: Number,
    moveInDate: Date,
    status: String
}));

app.get('/api/tenant', async (req, res) => {
  const tenant = await Tenant.find();
  res.send(tenant);console.log("Added Tenant");
  res.status(404).send;
});

app.post('/api/tenant', async (req, res) => {
  const tenant = new Tenant(req.body);
  await tenant.save();
  res.send(tenant);console.log("Added new Tenant:", tenant);
});

app.delete('/api/tenant/:id', async(req, res) => {
  await Tenant.findByIdAndDelete(req.params.id);
  res.status(204).send; 
})

app.put('/api/tenant/:id', async(req, res) => {
  const updateTenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.send(updateTenant);
})