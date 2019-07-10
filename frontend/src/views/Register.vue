<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
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
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="passwordConfirm"
                    id="passwordConfirm"
                    name="password"
                    label="Confirm password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="register" color="primary">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  RegistrationService,
  UserNodeConnector,
  AuthNodeConnector
} from "../services/registration";

const registrationService = new RegistrationService(
  new UserNodeConnector(),
  new AuthNodeConnector()
);

export default {
  data: () => ({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    errorMessage: ""
  }),

  props: {
    source: String
  },

  methods: {
    register: async function() {
      let error, message, uuid, token;

      ({ error, message } = registrationService.validateRegistrationCredentials(
        this.username,
        this.email,
        this.password,
        this.passwordConfirm
      ));
      if (error) {
        this.errorMessage = message;
        return;
      }

      ({
        error,
        message,
        uuid,
        token
      } = await registrationService.registerNewUser(
        this.username,
        this.email,
        this.password
      ));
      if (error) {
        this.errorMessage = message;
        return;
      }
      this.$store.commit("user/authenticate", { uuid, token });
    }
  }
};
</script>
