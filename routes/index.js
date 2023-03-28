import express from 'express';
const router = express.Router();
import { initialFetchArt, getArt, loadMoreArt, search } from '../controllers/homeController.js';


router.get('/', initialFetchArt);
router.get('/art/:id', getArt);
router.get('/loadmore', loadMoreArt);
router.post('/search/:searchTerm', search);


export default router;