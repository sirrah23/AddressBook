<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-if="errorMessage" class="red--text">{{
                errorMessage
              }}</span>
              <v-form>
                <v-text-field
                  v-model="username"
                  name="username"
                  label="Username"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-layout row wrap>
              <v-flex>
                <v-card-actions>
                  <v-flex>
                    <v-flex offset-xs1>
                      <a @click="$emit('toggleLogin')">
                        Or register for an account...
                      </a>
                    </v-flex>
                  </v-flex>
                  <v-flex offset-xs5>
                    <v-btn @click="login" color="primary">Login</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { AuthNodeConnector } from "../connectors/auth.js";
import { UserNodeConnector } from "../connectors/user.js";
import { LoginService } from "../services/login.js";

const loginService = new LoginService(
  new UserNodeConnector(),
  new AuthNodeConnector()
);

export default {
  data: () => ({
    username: "",
    password: "",
    errorMessage: ""
  }),
  methods: {
    async login() {
      let error, message, uuid, token;

      ({ error, message } = loginService.validateLoginCredentials(
        this.username,
        this.password
      ));
      if (error) {
        this.errorMessage = message;
        return;
      }

      ({ error, message, uuid, token } = await loginService.loginUser(
        this.username,
        this.password
      ));
      if (error) {
        this.errorMessage = message;
        return;
      }
      this.$store.commit("user/authenticate", { uuid, token, username: this.username});
      this.$router.replace({ path: "book" });
    }
  }
};
</script>
