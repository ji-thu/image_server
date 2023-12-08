const users = require('../models/userSchema')

exports.register=async(req,res)=>{
    console.log('inside the register function');
    const {username,email,password} = req.body;
    console.log(username,email,password);

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json('user alrady exist')
        }else{
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()

            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(500).json('register fail')
    }
}

exports.login=async(req,res)=>{
    const {email,password} = req.body
    let existingUser
    try{
        existingUser = await users.findOne({email})
    }catch(err){
        console.log('error'+err);
    }
    if(!existingUser){
      return  res.status(400).json({message:"unable to find email"})
    }
    let ispasswordcurrect= password==existingUser.password;
    if(!ispasswordcurrect){
       return  res.status(400).json({message:"unable to find password"})
    }
 
    return  res.status(200).json({existingUser})
}