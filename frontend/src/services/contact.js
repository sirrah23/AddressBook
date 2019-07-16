const axios = require("axios");

export class ContactNodeConnector {
  constructor() {
    //TODO: Make this configurable
    this.hostname = `localhost`;
    this.port = 8080;
  }

  generateBaseURL() {
    return `http://${this.hostname}:${this.port}`;
  }

  generateEndpointURL(endpoint) {
    return `${this.generateBaseURL()}${endpoint}`;
  }

  async sendGetAllContactsRequest(token) {
    const url = this.generateEndpointURL("/api/v1/contact");
    try {
      const response = await axios({
        method: "get",
        url,
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      return { error: false, message: "", response: response };
    } catch (err) {
      return {
        error: true,
        message: "Unable to fetch all contacts",
        response: null
      };
    }
  }
}

export class ContactService {
  constructor(contactNodeConnector, authToken) {
    this.contactNodeConnector = contactNodeConnector;
    this.authToken = authToken;
  }

  async getAllContacts() {
    const res = await this.contactNodeConnector.sendGetAllContactsRequest(
      this.authToken
    );
    return res;
  }
}
