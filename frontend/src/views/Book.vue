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
import { ContactService, ContactNodeConnector } from "../services/contact.js";

export default {
  components: {
    Contact
  },
  mounted: async () => {
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
    }
  }
};
</script>
