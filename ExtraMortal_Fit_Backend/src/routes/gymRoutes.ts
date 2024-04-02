import express from 'express'
import { authenticate, isAdmin } from '../middlewares/authentication'
import { getAllGyms, getGym, deleteGym, updateGym } from '../controllers/gymController'

const router = express.Router()


router.get('/', authenticate, getAllGyms)
router.get('/:id', authenticate, getGym)
router.put('/:id', authenticate, updateGym)
router.delete('/:id', authenticate, deleteGym)

export default router