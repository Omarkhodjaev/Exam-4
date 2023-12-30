const { ResData } = require("../../library/resData");
const { ProductBadRequestException } = require("./exception/product.exception");
const { productScheme, productEditScheme } = require("./validation/product.validation");

class ProductController {
  #productService;
  constructor(ProductService) {
    this.#productService = ProductService;
  }

  async create(req, res) {
    try {
      const dto = req.body;
      const validated = productScheme.validate(dto);

      if (validated.error) {
        throw new ProductBadRequestException(validated.error.message);
      }

      const resData = this.#productService.create(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const productId = req.params.id;

      const resData = await this.#productService.getById(productId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#productService.getAll();
    return res.status(resData.statusCode).json(resData);
  }

  async delete(req, res) {
    try {
      const productId = req.params.id;

      const resData = await this.#productService.delete(productId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req, res) {
    try {
      const dto = req.body;
      const productId = req.params.id;

      const validated = productEditScheme.validate(dto);

      if (validated.error) {
        throw new ProductBadRequestException(validated.error.message);
      }

      const resData = await this.#productService.update(dto, productId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500
      );

      res.status(resData.statusCode).json(resData);
    }
  }


}

module.exports = { ProductController };
