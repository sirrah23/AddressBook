const { isValidEmail } = require("../utils/utils.js");
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
    try {
      const result = await axios({
        method: "post",
        url,
        data: payload,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      return { error: false, message: "", result: result };
    } catch (err) {
      return { error: true, message: "Unable to register user", result: null };
    }
  }
}

export class RegistrationService {
  constructor(userNodeConnector) {
    this.userNodeConnector = userNodeConnector;
  }

  validateRegistrationCredentials(username, email, password, passwordConfirm) {
    if (!username || !email || !password || !passwordConfirm) {
      return { error: true, message: "Missing a required field" };
    }

    if (password !== passwordConfirm) {
      return { error: true, message: "Passwords do not match" };
    }

    if (!isValidEmail(email)) {
      return { error: true, message: "Email is invalid" };
    }

    return { error: false, message: "" };
  }

  async registerNewUser(username, email, password) {
    const result = this.userNodeConnector.sendRegisterRequest({
      username,
      password,
      email
    });
    return result;
  }
}
