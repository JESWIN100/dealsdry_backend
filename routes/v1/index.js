import express from 'express'
import adminRoute from './adminRoute.js'
import employeRoute from './empolyeeRoute.js'
const v1Router=express.Router();

v1Router.use("/admin",adminRoute)
v1Router.use("/employe",employeRoute)


export default v1Router  