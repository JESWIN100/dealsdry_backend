import Joi from 'joi';
 
 export const employeeSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
      'string.pattern.base': 'Mobile number must be a valid 10-digit number',
      'any.required': 'Mobile number is required'
    }),
    designation: Joi.string().required().messages({
      'string.empty': 'Designation is required',
      'any.required': 'Designation is required'
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'any.only': 'Gender must be one of male, female, or other',
      'any.required': 'Gender is required'
    }),
    courses: Joi.string().messages({
      'string.empty': 'Course is required',
      'any.required': 'Course is required'
    }),
    image:Joi.string()
  }); 