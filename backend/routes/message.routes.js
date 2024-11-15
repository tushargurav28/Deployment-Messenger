import express from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


/*
when user send post request on send with userid first protectRoute function run and check
all parameters to authentation of user and then if user is right then it called next() function
and then sendMessage function execute if there is some error on protecRoute user cannot send
message from that route
*/

router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

export default router;

