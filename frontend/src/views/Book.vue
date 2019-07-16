<template>
  <v-app id="book">
    <v-content>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <Contact
            v-for="i in 5"
            :key="i"
            :name="'Contact ' + i"
            :email="'contact' + i + '@email.com'"
            :phoneNumber="'999-776-123' + i"
          />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Contact from "../components/Contact";

export default {
  components: {
    Contact
  }
};
</script>
