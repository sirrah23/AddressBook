<template>
  <v-app>
    <v-content>
      <Toolbar />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: { Toolbar },
  data() {
    return {
      //
    };
  }
};
</script>
