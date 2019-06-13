export default class RegistrationService {
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

  // async registerNewUser(username, password, passwordConfirm){
  //TODO
  // }
}
