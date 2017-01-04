import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
  eventName: String,
  eventTime: [String],
  userData: [Object],
  eventUrl: { type: String, unique: true },
  adminUrl: { type: String, unique: true }
});

export const Form = mongoose.model('Form', formSchema);