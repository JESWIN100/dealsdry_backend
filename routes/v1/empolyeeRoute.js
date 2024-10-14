import express from 'express';
import authAdmin from '../../middleware/adminAuth.js';
import { confirmStatus, createEmployee, employeByID, employeDelete, employeUpdate, getAll } from '../../controllers/employeeController.js';
import { upload } from "../../middleware/uploadMiddlWare.js";

const router = express.Router();

router.post("/create-employe",upload.single("image"),createEmployee)
 
router.get('/all', getAll);


router.get('/getById/:id', employeByID);


router.put('/update/:id', upload.single("image"),employeUpdate);


router.delete('/delete/:id', employeDelete);

router.post('/confirm/:id',confirmStatus)
export default router; 