<template>
  <v-flex offset-md3 md6>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ name }}</h3>
              <div>Phone Number: {{ phoneNumber }}</div>
              <div>Email: {{ email }}</div>
            </div>
          </v-card-title>
        </v-layout>
        <v-layout row wrap>
          <v-flex offset-md9>
            <v-card-actions>
              <v-btn flat color="orange">View</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["name", "phoneNumber", "email"]
};
</script>
