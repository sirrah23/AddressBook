<template>
  <v-app id="book">
    <v-content>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <Contact
            v-for="contact in contacts"
            :key="contact.id"
            :name="contact.name"
            :email="contact.email"
            :phoneNumber="contact.phoneNumber"
          />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Contact from "../components/Contact";
import { ContactNodeConnector } from "../connectors/contact.js";
import { ContactService } from "../services/contact.js";

export default {
  components: {
    Contact
  },
  async mounted() {
    this.validateUserIsAuthenticated();
    await this.initializeViewWithContactData();
  },
  data: () => ({
    errorMessage: null,
    contactService: null,
    contacts: []
  }),
  methods: {
    async initializeViewWithContactData() {
      this.contactService = new ContactService(
        new ContactNodeConnector(),
        this.$store.getters["user/getToken"]
      );
      const res = await this.contactService.getAllContacts();
      if (res.error) this.errorMessage = res.message;
      else this.contacts = res.response.data.contacts;
    },
    validateUserIsAuthenticated() {
      const authToken = this.$store.getters["user/getToken"];
      const userUUID = this.$store.getters["user/getUUID"];
      if (!authToken || !userUUID) this.$router.replace({ path: "/" });
    }
  }
};
</script>
