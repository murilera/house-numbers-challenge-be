import { Router } from 'express';
import { snippetsController } from '../controllers/snippet.controller';

const router = Router();

router.get('/:id', snippetsController.getSnippetById);
router.post('/', snippetsController.createSnippet);

export default router;
