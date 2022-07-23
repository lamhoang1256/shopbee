const productControllers = require("./product.controller");
const productRouter = require("express").Router();

productRouter.post("/", productControllers.addNewProduct);
productRouter.get("/", productControllers.getAllProductWithConditional);
productRouter.get("/all", productControllers.getAllProduct);
productRouter.get("/:id", productControllers.getSingleProduct);
productRouter.delete("/:id", productControllers.deleteProduct);
productRouter.put("/:id", productControllers.updateProduct);

module.exports = productRouter;
