<template>
  <v-app id="inspire">
    <Register v-if="registerMode" v-on:toggleRegister="toggleView" />
    <Login v-if="loginMode" v-on:toggleLogin="toggleView" />
  </v-app>
</template>

<script>
import Register from "../components/Register";
import Login from "../components/Login";

export default {
  data: () => ({
    loginMode: true,
    registerMode: false
  }),
  components: {
    Register,
    Login
  },
  methods: {
    toggleView() {
      this.registerMode = !this.registerMode;
      this.loginMode = !this.loginMode;
    }
  }
};
</script>
