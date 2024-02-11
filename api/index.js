const router=new require("express").Router();
const userRouter = require("./user");

router.use("/users", userRouter);

router.get('/',(req,res)=>{
    res.render('index.html',{message: 'Render from ruter', appname: 'Webapp'})
})
module.exports=router;