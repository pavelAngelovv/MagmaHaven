const { Router } = require("express");
const { create, getById, update, deleteById, likeStone } = require("../services/volcanoService");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { parseError } = require("../util");

// TODO replace with real router according to exam description

const stoneRouter = Router();

stoneRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});
stoneRouter.post('/create', isUser(),
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

module.exports = { stoneRouter }