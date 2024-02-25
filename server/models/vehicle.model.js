import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema(
  {
    category: { type: String, default: '' },
    index: { type: Number },
    make: { type: String, default: '' },
    model: { type: String, default: '' },
    year: { type: String, default: '' },
    rate: { type: Number, default: 1000 },
    capacity: { type: Number, default: 5 },
    availability: { type: Boolean, default: true },
    cur_mileage: { type: String, default: '' },
    img: { type: String, default: '' },
    engine: { type: String, default: '' },
    torque: { type: String, default: '' },
    fuel: { type: String, default: '' },
    transmission: { type: String, default: '' },
    fuelCap: { type: String, default: '' },
    power: { type: String, default: '' },
  },
  { timestamps: true }
)

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle
