import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Minimal appointments route placeholder
router.get('/', async (req: Request, res: Response) => {
  res.json({ success: true, data: [], message: 'No appointments endpoint implemented yet' });
});

export default router;
