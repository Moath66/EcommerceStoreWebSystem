const router = require("express").Router();
const User = require("../models/User");
const {verifyTokenAndAuthorization ,verifyTokenAndAdmin} = require("./verifyToken");

//  update user
router.put("/:id",verifyTokenAndAuthorization , async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body}, {new:true} );
            res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }

})


// Delete 

router.delete("/:id" , async(req,res)=>{
    try {
         await User.findByIdAndDelete(req.params.id);
         res.status(200).json("User has been deleted");
    } catch (error) {
          res.status(500).json(error);
    }
})

// Get user by id
router.get("/find/:id",verifyTokenAndAdmin , async(req,res)=>{
    try {
          const user = await User.findById(req.params.id);
           
          const {password, ...others} = user._doc;
           res.status(200).json(others);
           } catch (error) {
              res.status(500).json(error);
              }
              })
    
 //   Get all users
  router.get("/" , async(req,res)=>{
     const query = req.query.new;
        try {
          const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
            res.status(200).json(users);
              } catch (error) {
           res.status(500).json(error);
               }
     })


module.exports = router