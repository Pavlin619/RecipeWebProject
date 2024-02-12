const router=new require("express").Router();
const userRouter = require("./user");

router.use("/users", userRouter);

router.get('/',(req,res)=>{
    res.render('index.html',{messege: 'Render from ruter'})
})
module.exports=router;