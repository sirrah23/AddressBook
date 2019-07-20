export class LoginService {
  constructor(userNodeConnector, authNodeConnector) {
    this.userNodeConnector = userNodeConnector;
    this.authNodeConnector = authNodeConnector;
  }

  validateLoginCredentials(username, password) {
    if (!username || !password) {
      return { error: true, message: "Missing a required field" };
    }

    return { error: false, message: "" };
  }

  async loginUser(username, password) {
    const validateResult = await this.userNodeConnector.sendValidateRequest({
      username,
      password
    });

    if (validateResult.error) {
      return {
        error: validateResult.error,
        message: validateResult.message,
        uuid: "",
        token: ""
      };
    }

    if (!validateResult.response.data.found) {
      return {
        error: true,
        message: "The provided credentials are invalid",
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

    if (authTokenResult.response.data.error === 1) {
      return {
        error: true,
        message: "The provided credentials are invalid",
        uuid: "",
        token: ""
      };
    }

    return {
      error: 0,
      message: "",
      uuid: validateResult.response.data.user_id,
      token: authTokenResult.response.data.token
    };
  }
}
