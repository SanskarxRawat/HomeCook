"use strict";

const router=require("express").Router(),
    subscribersController=require("../controllers/subscribersController");

router.get("/",subscribersController.index,subscribersController.indexView);

router.get("/new",subscribersController.new);
router.get("/create",subscribersController.create,subscribersController.redirectView);
router.get("/:id/edit",subscribersController.edit);
router.get("/:id/update",subscribersController.update,subscribersController.redirectView);
router.get("/:id",subscribersController.show,subscribersController.showView);
router.get("/:id/delete",subscribersController.delete,subscribersController.redirectView);


module.exports=router;
