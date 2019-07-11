<template>
  <v-app id="book">
    <v-content>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex offset-md3 md6 v-for="i in 5" :key="`${i}`">
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Contact {{ i }}</h3>
                      <div>Phone Number: 999-432-512{{ i }}</div>
                      <div>Email: contact{{ i }}@system.com</div>
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
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
