<template>
  <v-app id="book">
    <v-content>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex offset-md3 md6 v-for="i in 5" :key="`${i}`">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Contact {{i}}</h3>
                  <div>{{ card_text }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange">View</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
