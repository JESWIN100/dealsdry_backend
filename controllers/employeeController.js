import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Employee } from "../model/employeSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { employeeSchema } from "../validation/employeeValidation.js";

export const createEmployee = asyncHandler(async (req, res) => {
  try {
    // Validate request body
    // const { error } = employeeSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ success: false, message: error.details[0].message });
    // }

    const { name, email, mobile, designation, gender, courses } = req.body;

    // Check if file is uploaded
    if (req.file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ success: false, message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.' });
      }
    }
    

    // Upload image to Cloudinary
    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "employee" });

    // Create new employee object
    const newEmploye = new Employee({
      name,
      email, 
      mobile,
      designation,
      gender,
      courses,
      status:"Inactive",
      image: uploadResult.secure_url,
    });

    // Save employee to database
    await newEmploye.save();

    // Send success response
    res.json({ success: true, message: "Employee created successfully", data: newEmploye });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
});



export const getAll = async (req, res, next) => {
  try {
      const employee = await Employee.find();
      console.log(employee);
      res.json({ success: true, message: 'Employee list fetched', data: employee });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" })
  }
}


export const employeByID = async (req, res, next) => {


   const {id}=req.params
  try {
      const employee = await Employee.findById(id);
      console.log(employee);
      res.json({ success: true, message: 'Employee list fetched', data: employee });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" })
  }
}

export const employeUpdate = async (req, res, next) => {
  const { id } = req.params;
  const data = { ...req.body };

  // let updatedData = { ...req.body };
  if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "employee" });
      if (uploadResult?.url) {
          data.image = uploadResult.url;
      }
  }

  
  // const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

  try {
    const employee = await Employee.findByIdAndUpdate(id, data,  { new: true, runValidators: true });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({ success: true, message: 'Employee updated successfully', data: employee });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
}

export const employeDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({ success: true, message: 'Employee Deleted successfully', data: employee });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
}


export const confirmStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const employe = await Employee.findById(id);
  if (!employe) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }

  // Toggle the status
  if (employe.status === 'Active') {
    employe.status = 'Inactive'; // Change to inactive if currently active
  } else {
    employe.status = 'Active'; // Change to active if currently inactive
    employe.confirmedAt = new Date(); // Set confirmedAt only when activating
  }

  await employe.save();

  res.status(200).json({ success: true, message: "Employee status updated", data: employe });
});
