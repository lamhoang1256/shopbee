const categoryControllers = require("./category.controller");
const categoryRouter = require("express").Router();

categoryRouter.post("/", categoryControllers.addNewCategory);
categoryRouter.get("/", categoryControllers.getAllCategory);
categoryRouter.get("/:id", categoryControllers.getSingleCategory);
categoryRouter.delete("/:id", categoryControllers.deleteCategory);
categoryRouter.put("/:id", categoryControllers.updateCategory);

module.exports = categoryRouter;
