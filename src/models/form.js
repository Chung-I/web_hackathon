import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
  eventName: String,
  eventTime: [String],
  startDate: String,
  endDate: String,
  startHour: String,
  endHour: String,
  userData: [Object],
  eventTime: Object,
  eventUrl: { type: String, unique: true },
  adminUrl: { type: String, unique: true }
});

export const Form = mongoose.model('Form', formSchema);
