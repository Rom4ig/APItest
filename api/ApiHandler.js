const Logger = require( '../logger.conf');
const NetworkHelper = require( './NetworkHelper');

class ApiHandler extends NetworkHelper {

  async getUserInfo() {
    const response = await this.request('GET', 'v2', 'users/by-token');

    return response.data;
  }

 async getProductByName(productName) {
    Logger.info(`API: Get product by name ${productName}`);

    const products = await this.request('GET', 'v2', `retail_items`);
    Logger.info(`products: ${products}`);
    return await products.data.data.find((product) => product.name === productName);
  }

  addService(name, price,) {
    Logger.info(`API: Add service. Name: ${name} Price: ${price}`);

    const user = this.getUserInfo();
    const body = {
      name: name,
      price: price,
      description: '',
      start_duration: 15,
      processing_duration: 0,
      end_duration: 0,
      total_duration: 15,
      minimum_price_shown: false,
      online_bookable: true,
      color: null,
      has_processing_time: false,
      assigned_users_ids: [user.guid]
    };
    const response = this.request('POST', 'v3', 'services', body);

    return response.data;
  }

  deleteService(serviceId) {
    Logger.info(`API: Delete service. Id: ${serviceId}`);

    return this.request('DELETE', 'v3', `services/${serviceId}`);
  }

  addProduct(brand, name, price) {
    Logger.info(`API: Add product. Brand: ${brand} Name: ${name} Price: ${price}`);

    const body = {
      brand: brand,
      name: name,
      price: price,
    };
    const response = this.request('POST', 'v2', 'retail_items', body);

    return response.data;
  }

 async deleteProductByID(productId) {
    Logger.info(`API: Delete product. Id: ${productId}`);

    return await this.request('DELETE', 'v2', `retail_items/${productId}`);
  }

  async deleteProductByName(productName) {
    Logger.info(`API: Delete product. Name: ${productName}`);

    const productItem = await this.getProductByName(productName);
    const productId = productItem.id;

    return await this.deleteProductByID(productId);
  }
}

module.exports= ApiHandler;