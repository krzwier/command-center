import express, { Router } from 'express';
import getPersons from '../controllers/PersonController.js';

const router: Router = express.Router();

router.get('/persons', getPersons);

export default router;
