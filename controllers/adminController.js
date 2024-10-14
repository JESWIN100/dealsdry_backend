import bcrypt  from 'bcrypt'
import { Admin } from '../model/adminSchema.js';
import { generateAdminToken } from '../utils/generateToken.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const adminCreate = asyncHandler(async (req, res, next) => {
   
    
   
    const { adminName, email, password } = req.body;

    if (!adminName || !password || !adminName) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
        return res.status(400).json({ success: false, message: "Admin already exists" });
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({ adminName, email, password: hashedPassword });
    await newAdmin.save();

    const adminToken = generateAdminToken(email, "admin");

    // Set token in cookie
    res.cookie("Admintoken", adminToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ success: true, message: "Admin created successfully" });
} )





export const adminLogin = asyncHandler(async (req, res, next) => {

    
    
    const { email, password } = req.body;
    if ( !password || !email) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
        return res.status(404).json({ success: false, message: "Admin does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, adminExist.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create token
    const token = generateAdminToken(email, "admin");
// console.log(token);

    // Set token in cookie
    res.cookie("Admintoken", token, {sameSite:"None",secure: process.env.NODE_ENV === 'production',});
    res.json({ success: true, message: "Admin login successfully" });
} )


export const AdminProfile=asyncHandler(async(req,res,next)=>{
  
    
    const user=req.admin
    const userData=await Admin.findOne({email:user.email}).select("-password")

    
  res.json({success:true,message:'user data fetched',data:userData})


    } )






export const checkAdmin=asyncHandler(async(req,res,next)=>{


    const admin=req.admin;
    if(!admin){
        return res.status(401).json({success:false,message:'admin not authenticated'})
        }
    
  res.json({success:true,message:'admin is authenticated'})


} )


export const AdminLogout=asyncHandler(async(req,res,next)=>{

res.clearCookie("Admintoken")
res.json({success:true,message:'Admin logged out successfully'})


} )














////////////////////////////////////////////////////////////////////////////////
// Get all users
// export const getAllUsers = asyncHandler(async (req, res, next) => {
//     // Fetch all users from the database
//     const users = await User.find();

//     // If no users found, respond with a message
//     if (!users) {
//         return res.status(404).json({ success: false, message: "No users found" });
//     }

//     // Respond with success and the list of users
//     res.json({ success: true, data: users });
// });



