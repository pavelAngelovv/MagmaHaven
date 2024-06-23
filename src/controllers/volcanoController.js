const { Router } = require("express");
const { create, getById, update, deleteById, likeVolcano } = require("../services/volcanoService");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { parseError } = require("../util");

// TODO replace with real router according to exam description

const volcanoRouter = Router();

volcanoRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});
volcanoRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('name needs to be at least 2 characters long'),
    body('location').trim().isLength({ min: 3 }).withMessage('location needs to be at least 3 characters long'),
    body('elevation').trim().isNumeric({ min: 0 }).withMessage('elevation needs to be at least 2'),
    body('lastEruption').trim().isNumeric({ min: 0, max: 2024 }).withMessage('last eruption needs to be between 0 and 2024'),
    body('image').trim().isURL({ require_tld: false }).withMessage('image needs to be between 5 and 15 characters long'),
    body('typeVolcano').trim().isIn(['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield']).withMessage('Invalid type of volcano'),
    body('description').trim().isLength({ min: 10 }).withMessage('description needs to be at least 10 characters long'),
    async (req, res) => {

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const authorId = req.user._id;
            console.log(req.user);

            await create(req.body, authorId);
            res.redirect('/catalog');

        } catch (err) {
            console.log(err);
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    });
volcanoRouter.get('/edit/:id', isUser(), async (req, res) => {
    const stone = await getById(req.params.id);

    if (!stone) {
        res.render('404');
        return;
    };

    const isOwner = req.user._id == stone.owner.toString();

    if (!isOwner) {
        res.redirect('/login')
        return;
    }
    res.render('edit', { data: stone });
});
volcanoRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('name needs to be at least 2 characters long'),
    body('location').trim().isLength({ min: 3 }).withMessage('location needs to be at least 3 characters long'),
    body('elevation').trim().isNumeric({ min: 0 }).withMessage('elevation needs to be at least 2'),
    body('lastEruption').trim().isNumeric({ min: 0, max: 2024 }).withMessage('last eruption needs to be between 0 and 2024'),
    body('image').trim().isURL({ require_tld: false }).withMessage('image needs to be between 5 and 15 characters long'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('description needs to be at least 10 characters long'),
    async (req, res) => {
        const volcanoId = req.params.id
        const userId = req.user._id
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await update(volcanoId, req.body, userId);

            res.redirect('/catalog/' + volcanoId);

        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
        }
    });
volcanoRouter.get('/delete/:id', isUser(), async (req, res) => {
    const volcanoId = req.params.id
    const userId = req.user._id
    try {
        const result = await deleteById(volcanoId, userId);

        res.redirect('/catalog');

    } catch (err) {
        console.log(err);
        res.redirect('catalog' + volcanoId);
    }
});
volcanoRouter.get('/vote/:id', isUser(), async (req, res) => {
    const volcanoId = req.params.id
    const userId = req.user._id
    try {
        const result = await likeVolcano(volcanoId, userId);

        res.redirect('/catalog/' + volcanoId);
    } catch (err) {
        res.render('details', {errors: parseError(err).errors})
    }
});

module.exports = { volcanoRouter }
