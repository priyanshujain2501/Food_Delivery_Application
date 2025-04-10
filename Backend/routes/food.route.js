import {Router} from "express";
import { addFood, listFood, removeFood } from "../controllers/food.controller.js";
import multer from "multer";

//create router object
const foodRouter = Router();


//image storage engine using multer
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:storage})


foodRouter.post('/add',upload.single("image"),addFood);

foodRouter.get('/list',listFood)

foodRouter.post('/remove',removeFood)


export default foodRouter;

