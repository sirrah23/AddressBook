const axios = require("axios");
import { CommonConnector } from "./common.js";

export class AuthNodeConnector extends CommonConnector {
  constructor() {
    super("localhost", 8000); //TODO: Make me configurable
  }

  async sendGenerateAuthTokenRequest(payload) {
    const url = "/auth/generateAuthToken";
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
