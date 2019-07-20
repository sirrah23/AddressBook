const { isValidEmail } = require("../utils/utils.js");

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
