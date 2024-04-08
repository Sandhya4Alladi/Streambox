import express from "express";
import {
  forgotPW,
  logout,
  resetPW,
  signin,
  signup,
  usernameExists,
  validateOTP,
  verifyEmail,
} from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

import path from "path";
import { fileURLToPath } from 'url';

const router = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/",(req, res) => {
  const token = req.cookies.access_token;
  if(!token) 
    res.redirect('/auth/signup'); 
  else
    res.redirect("/home")
});

router.post("/verify-email", verifyEmail)

router.post("/verify-email/validateOTP", validateOTP);

router.post('/check-username', usernameExists);

router.get("/signup", (req, res) => {
  const token = req.cookies.access_token;
  if(!token) 
  res.render('signup');
  else
    res.redirect("/home")
});

router.get("/forgotpassword",  (req,res) => {
  const token = req.cookies.access_token;
  if(!token) 
    res.render('forgotpw');
  else 
    res.redirect("/home")
});

router.post("/forgotpw",forgotPW);

router.get("/otp", (req, res) => {
  const token = req.cookies.access_token;
  if(!token) res.render('otp');
  else res.redirect("/home")
});


router.get("/resetpassword", (req,res) =>{
  console.log("hi");
  const token = req.cookies.access_token;
  console.log(token);
  if(!token) res.render('resetpw');
  else res.redirect("/home")
});

router.post("/forgotpw/validateOTP", validateOTP);

router.post("/resetpw", resetPW);

router.get("/signin",(req, res, next) => {
  const token = req.cookies.access_token;
  if(!token) 
    res.render('signin');
  else
    res.render("home")
});



router.get("/logout",verifyToken, logout);

//CREATE A USER
router.post("/createNewUser", signup);
//SIGN IN
router.post("/userValidation", signin);
//GOOGLE AUTH
router.post("/google");


export default router;
