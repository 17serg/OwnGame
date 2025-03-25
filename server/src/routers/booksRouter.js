const booksRouter = require('express').Router();
const checkId = require('../middlewares/checkId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const BooksController = require('../controllers/BooksController');
const upload = require('../middlewares/multer');

booksRouter.route('/').get(BooksController.getAll)
booksRouter.route('/:id/book').get(checkId, BooksController.getOne)
booksRouter.route('/:id/book/comment').post(checkId, verifyAccessToken, BooksController.commentBook)
booksRouter.route('/my').get(verifyAccessToken, BooksController.getMy)
booksRouter.route('/add').post(verifyAccessToken, upload.single('file'), BooksController.createBook);
booksRouter.route('/:id/edit').put(checkId, verifyAccessToken, BooksController.editBook);
booksRouter.route('/:id/delete').delete(checkId, verifyAccessToken, BooksController.deleteOne);
booksRouter.route('/:id/like').post(checkId, verifyAccessToken, BooksController.likeBook);
booksRouter.route('/:id/download').get(checkId, BooksController.downloadBook);

module.exports = booksRouter;
