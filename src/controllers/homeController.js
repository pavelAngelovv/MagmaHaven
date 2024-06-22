const { Router } = require("express");

// TODO replace with real router according to exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);
 
    res.render('home');
});

module.exports = { homeRouter };