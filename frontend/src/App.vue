<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>AddressBook</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Register />
    </v-content>
  </v-app>
</template>

<script>
import Register from "./views/Register";

export default {
  name: "App",
  components: {
    Register
  },
  data() {
    return {
      //
    };
  }
};
</script>
