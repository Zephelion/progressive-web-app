import express from 'express';
const router = express.Router();
import { initialFetchArt, getArt } from '../controllers/homeController.js';


router.get('/', initialFetchArt);
router.get('/art/:id', getArt);


export default router;