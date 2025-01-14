import { Router } from 'express';
import { AuthorController } from '../controllers/authorController';
const router = Router();
const authorController = new AuthorController();

router.get('/', authorController.getAuthors.bind(authorController));
router.get('/:id', authorController.getAuthorById.bind(authorController));
router.post('/', authorController.createAuthor.bind(authorController));
router.put('/:id', authorController.updateAuthor.bind(authorController));
router.delete('/:id', authorController.deleteAuthor.bind(authorController));

export default router;
