import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const  signup = async (req,res)=>{
     try{
        const {fullName,username, password, confirmPassword, gender} = req.body; 
        if(password !== confirmPassword){
            return res.status(400).json({error:"password and confirm password do not match" })
        }
        
    /* 
    
    const user = await User.findOne({username})
    
    above statement find that User is present on the database or not 
    if user is present on database then it will throw username already exists
    
    User.findOne()   --> function is used to find user in database and it is await  
    that means stop all exection until they get data form database
    
    */

        const user = await User.findOne({username});
        
        if(user){
          return res.status(400).json({error:"username already exists"})
        }


        // console.log("Data at phase 1",{fullName,username,confirmPassword,gender})

        // Hash password Here

        const slat = await bcrypt.genSalt(10)
        const hashPassword =  await bcrypt.hash(password,slat)  




/*

// https://avatar.iran.liara.run/public/girl

// https://avatar.iran.liara.run/public/boy

Those are api userd to get profile pic for our project  

*/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        /*
        newUser create new user we pass object 
        */
       
       
        const newUser = new User({
            fullName,
            username,
            password:hashPassword,
            gender,
            profilePic : gender === "male" ?boyProfilePic :girlProfilePic

        })


        

        

        if(newUser){

        // Generate JWT token here
           
         generateTokenAndSetCookie(newUser._id,res)




        /* 
        
        here save() function save that newUser into database 
        
        */
            await newUser.save();


            res.status(201).json({
                id: newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
    
            });
        }else{
            res.status(400).json({error:"Invalid User Data"})
        }

    }catch(error){
        console.log('Error in signup controller',error.message)
        res.status(500).json({error:"Internal server Error"})
     }
};











export const login = async (req,res)=>{
   try{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password||"")

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid Username or password"})
    }

    generateTokenAndSetCookie(user._id,res)




    // after login that data send to user || clinet

    res.status(200).json({
        _id: user._id,
        fullName : user.fullName,
        profilePic : user.profilePic
    });








   }catch(error){
    console.log('Error in login controller',error.message)
    res.status(500).json({error:"Internal server Error"})
 }
}




export const logout = (req,res)=>{
   try{

    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out seccessfully"})




   }catch(error){
    console.log('Error in login controller',error.message)
    res.status(500).json({error:"Internal server Error"})
 }
}

