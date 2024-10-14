import express from 'express';
import { adminCreate, adminLogin, AdminLogout, AdminProfile, checkAdmin } from '../../controllers/adminController.js';
import authAdmin from '../../middleware/adminAuth.js';


const router = express.Router();

router.post("/create",adminCreate)
router.post("/login",adminLogin)
router.get('/profile',authAdmin,AdminProfile);
router.get("/check-admin",authAdmin,checkAdmin)
// router.get("/adminById/:id",authAdmin,adminProfile)
router.post("/logout",AdminLogout)

export default router; 