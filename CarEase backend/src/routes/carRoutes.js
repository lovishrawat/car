const express = require('express');
const multer = require('multer');
const Car = require('../models/Car');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Create Car
router.post('/', authenticate, upload.array('images', 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map((file) => file.path); // Store image URLs

  const newCar = new Car({
    title,
    description,
    tags: tags.split(','),
    images,
    user: req.userId,
  });
  
  await newCar.save();
  res.status(201).json(newCar);
});

// List Cars
router.get('/', authenticate, async (req, res) => {
  const cars = await Car.find({ user: req.userId });
  res.status(200).json(cars);
});

// Get Particular Car
router.get('/:id', authenticate, async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send('Car not found');
  res.status(200).json(car);
});

// Update Car
router.put('/:id', authenticate, upload.array('images', 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map((file) => file.path);

  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    { title, description, tags: tags.split(','), images },
    { new: true }
  );
  res.status(200).json(updatedCar);
});

// Delete Car
router.delete('/:id', authenticate, async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  if (!car) return res.status(404).send('Car not found');
  res.status(200).send('Car deleted');
});

module.exports = router;
