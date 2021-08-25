const router=require("express").Router(),
coursesController=require("../controllers/coursesController");
    router.get("/courses",coursesController.index,coursesController.respondJSON),
    userController=require("../controllers/usersController.verifyToken");
    router.use(coursesController.errorJSON);

    module.exports=router;