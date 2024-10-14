import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  courses: [{ type: String }],
  status:{
    type:String,
    default:"Inactive"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

 export const Employee = mongoose.model('Employee', employeeSchema);

