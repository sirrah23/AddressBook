const axios = require("axios");
import { CommonConnector } from "./common.js";

export class UserNodeConnector extends CommonConnector {
  constructor() {
    super("localhost", 8080); //TODO: Make me configurable
  }

  async sendRegisterRequest(payload) {
    const url = "/user/register";
    try {
      const response = await axios({
        method: "post",
        url,
        data: payload
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

  async sendValidateRequest(payload) {
    const url = "/user/validate";
    try {
      const response = await axios({
        method: "post",
        url,
        data: payload
      });
      return { error: false, message: "", response: response };
    } catch (err) {
      return {
        error: true,
        message: "Unable to validate user",
        response: null
      };
    }
  }
}
