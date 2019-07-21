<template>
  <v-container>
    <v-layout row wrap>
      <v-toolbar app>
        <v-flex>
          <v-toolbar-title class="headline text-uppercase">
            <span>AddressBook</span>
          </v-toolbar-title>
        </v-flex>
        <v-flex v-if="username" offset-md10>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                {{ username }}
              </v-btn>
            </template>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>
                  <Logout />
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
      </v-toolbar>
    </v-layout>
  </v-container>
</template>

<script>
import Logout from "./Logout.vue";

export default {
  components: { Logout },
  data() {
    return {
      //
    };
  },
  computed: {
    username() {
      return this.$store.getters["user/getUsername"];
    }
  }
};
</script>
