const axios = require("axios");

export class UserNodeConnector {
  constructor() {
    //TODO: Make this configurable
    this.hostname = `localhost`;
    this.port = 8001;
  }

  generateBaseURL() {
    return `http://${this.hostname}:${this.port}`;
  }

  generateEndpointURL(endpoint) {
    return `${this.generateBaseURL()}/${endpoint}`;
  }

  async sendRegisterRequest(payload) {
    const url = this.generateEndpointURL("register");
    const result = axios({
      method: "post",
      url,
      data: payload,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
    return result;
  }
}

export class RegistrationService {
  constructor(userNodeConnector) {
    this.userNodeConnector = userNodeConnector;
  }

  validateRegistrationCredentials(username, password, passwordConfirm) {
    if (!username || !password || !passwordConfirm) {
      return { error: true, message: "Missing a required field" };
    }

    if (password !== passwordConfirm) {
      return { error: true, message: "Passwords do not match" };
    }

    return { error: false, message: "" };
  }

  async registerNewUser(username, password) {
    const result = this.userNodeConnector.sendRegisterRequest({
      username,
      password,
      email: "todo@fixme.com"
    });
    return result;
  }
}
