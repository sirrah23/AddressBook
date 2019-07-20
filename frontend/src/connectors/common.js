const path = require("path");

export class CommonConnector {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  generateBaseURL() {
    return `http://${this.host}:${this.port}`;
  }

  generateEndpointURL(endpoint) {
    return path.join(this.generateBaseURL(), endpoint);
  }
}
