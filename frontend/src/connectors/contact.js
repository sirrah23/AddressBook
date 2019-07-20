const axios = require("axios");
import { CommonConnector } from "./common.js";

export class ContactNodeConnector extends CommonConnector {
  constructor() {
    super("localhost", 8080); //TODO: Make me configurable
  }

  async sendGetAllContactsRequest(token) {
    const url = "/api/v1/contact";
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
