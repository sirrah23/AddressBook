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
