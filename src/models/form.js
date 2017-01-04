import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
  eventName: String,
  startDate: String,
  endDate: String,
  startHour: Number,
  endHour: Number,
  userData: [Object],
  eventUrl: { type: String, unique: true },
  adminUrl: { type: String, unique: true }
});

export const Form = mongoose.model('Form', formSchema);