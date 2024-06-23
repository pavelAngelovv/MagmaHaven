// TODO import routers

const { homeRouter } = require("../controllers/homeController");
const { userRouter } = require("../controllers/userController");
const { volcanoRouter } = require("../controllers/volcanoController");

function configRoutes(app) {
    app.use(userRouter);
    app.use(volcanoRouter);
    app.use(homeRouter);
    // TODO register routers
}

module.exports =  { configRoutes };