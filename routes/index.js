import express from 'express';
const router = express.Router();
import { initialFetchArt, getArt, loadMoreArt } from '../controllers/homeController.js';


router.get('/', initialFetchArt);
router.get('/art/:id', getArt);
router.get('/loadmore', loadMoreArt);


export default router;