import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'displayName username')
    .populate('team', 'name')
    .sort({ points: -1 })
    .lean();
  response.json(leaderboard);
});

export default router;
