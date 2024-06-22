const { Router } = require("express");
const { getAll, getById } = require("../services/volcanoService");

// TODO replace with real router according to exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);
 
    res.render('home');
});

homeRouter.get('/catalog', async (req, res) => {
    const volcanos = await getAll();
    console.log(volcanos);
    res.render('catalog', { volcanos });
});

homeRouter.get('/catalog/:id', async (req, res) => {
    const volcano = await getById(req.params.id);
    if (!volcano) {
        res.render('404');
        return;
    };

    const isOwner = req.user?._id == volcano.owner.toString();
    // const isLiked = Boolean(stone.likes.find(l => req.user?._id == l.toString()));

    res.render('details', { volcano, isOwner });
});


module.exports = { homeRouter };