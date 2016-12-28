import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
  eventName: String,
  startDate: String,
  endDate: String,
  startHour: Number,
  endHour: Number,
  userData: [Object]
});

export const Form = mongoose.model('Form', formSchema);