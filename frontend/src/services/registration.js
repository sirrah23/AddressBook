const { isValidEmail } = require("../utils/utils.js");
const axios = require("axios");

//TODO: Move connectors into a separate file
//TODO: Extract common connector code
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
      const response = await axios({
        method: "post",
        url,
        data: payload,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      return { error: false, message: "", response: response };
    } catch (err) {
      return {
        error: true,
        message: "Unable to register user",
        response: null
      };
    }
  }
}

export class AuthNodeConnector {
  constructor() {
    //TODO: Make this configurable
    this.hostname = `localhost`;
    this.port = 8000;
  }

  generateBaseURL() {
    return `http://${this.hostname}:${this.port}`;
  }

  generateEndpointURL(endpoint) {
    return `${this.generateBaseURL()}/${endpoint}`;
  }

  async sendGenerateAuthTokenRequest(payload) {
    const url = this.generateEndpointURL("generateAuthToken");
    try {
      const response = await axios({
        method: "post",
        url,
        data: payload,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      return { error: false, message: "", response: response };
    } catch (err) {
      return {
        error: true,
        message: "Unable to fetch auth token for user",
        response: null
      };
    }
  }
}

export class RegistrationService {
  constructor(userNodeConnector, authNodeConnector) {
    this.userNodeConnector = userNodeConnector;
    this.authNodeConnector = authNodeConnector;
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
    const registerResult = await this.userNodeConnector.sendRegisterRequest({
      username,
      password,
      email
    });
    if (registerResult.error) {
      return {
        error: registerResult.error,
        message: registerResult.message,
        uuid: "",
        token: ""
      };
    }

    const authTokenResult = await this.authNodeConnector.sendGenerateAuthTokenRequest(
      { username, password }
    );
    if (authTokenResult.error) {
      return {
        error: authTokenResult.error,
        message: authTokenResult.message,
        uuid: "",
        token: ""
      };
    }

    return {
      error: 0,
      message: "",
      uuid: registerResult.response.data.user.uuid,
      token: authTokenResult.response.data.token
    };
  }
}
