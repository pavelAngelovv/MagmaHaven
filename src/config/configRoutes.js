// TODO import routers

const { homeRouter } = require("../controllers/homeController");
const { userRouter } = require("../controllers/userController");

function configRoutes(app) {
    app.use(userRouter);
    app.use(homeRouter);
    // TODO register routers
}

module.exports =  { configRoutes };