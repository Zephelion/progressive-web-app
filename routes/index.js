import express from 'express';
const router = express.Router();
import { initialFetchArt, getArt, loadMoreArt, search } from '../controllers/homeController.js';
import { offlinePage } from '../controllers/offlineController.js';


router.get('/', initialFetchArt);
router.get('/art/:id', getArt);
router.get('/loadmore', loadMoreArt);
router.get('/offline', offlinePage);
router.post('/search/:searchTerm', search);


export default router;