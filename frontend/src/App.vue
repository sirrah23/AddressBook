<template>
  <v-app>
    <v-content>
      <v-container>
      <v-layout row wrap>
    <v-toolbar app>
      <v-flex>
      <v-toolbar-title class="headline text-uppercase">
        <span>AddressBook</span>
      </v-toolbar-title>
      </v-flex>
      <v-flex v-if="username" offset-md10>
          {{username}}
      </v-flex>
    </v-toolbar>
      </v-layout>
    </v-container>
    </v-content>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
  computed: {
    username(){
      return this.$store.getters["user/username"]
    }
  }
};
</script>
