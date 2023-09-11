const Router = require("express");
const apiRouter = Router();

apiRouter.use("/karyawan", require('./KaryawanController'));

module.exports = apiRouter;