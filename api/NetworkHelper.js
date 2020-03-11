const axios = require('axios').default;
const accounts = require( '../accounts');
const Logger = require( '../logger.conf');

// TODO:
const API_BASE = 'https://api-staging-v2.herokuapp.com/v2/';
const API_BASE_V3 = 'https://api-staging-v2.herokuapp.com/v3/';

class NetworkHelper {
  constructor(account) {
    this.headers = null;
    this.account = account || accounts.default;
  }

  async _requestHandler(options) {
    Logger.info(`${options.method} request '${options.url}'`);

    try {
      return await axios(options);
    } catch (err) {
      const log = `${options.method} request '${options.url}' failed with an error:\n '${err.message}'`;

      Logger.error(log);
      throw new Error(log);
    }
  }

  async _setAuthHeaders() {
    const options = {
      method: 'POST',
      url: API_BASE + 'auth/sign_in',
      data: {
        email: this.account.email,
        password: this.account.password,
      },
    };

    const response = await this._requestHandler(options);

    if (response.status === 200) {
      const token = response.headers['access-token'];
      const client = response.headers['client'];
      const uid = response.headers['uid'];

      this.headers = {'access-token': token, uid: uid, client: client};
    } else {
      throw new Error(
        `Can't get access token. Status code: ${response.status}`,
      );
    }
  }

  async request(method, api, endpoint, body = {}) {
    const apiBase = api === 'v2' ? API_BASE : API_BASE_V3;


      if (!this.headers) {
        await this._setAuthHeaders();
      }

      const options = {
        method: method,
        url: apiBase + endpoint,
        json: true,
        headers: {
          ...this.headers,
        },
        data: body,
      };

      return await this._requestHandler(options);

  }
}

module.exports= NetworkHelper;
