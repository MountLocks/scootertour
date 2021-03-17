<template>
  <v-layout align-center justify-center>
    <v-layout text-center wrap>
      <v-container>
        <v-flex xs12>
          <h1 class="pb-5">Select City</h1>
          <v-select
            v-model="city"
            :items="cities"
            label="Select"
            solo
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex class="pt-5" xs12>
          <v-btn @click="tour(city)">Continue</v-btn>
        </v-flex>
      </v-container>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: "CitySelector",
  data() {
    return {
      city: "Miami, FL",
      cities: ["Miami, FL"]
    };
  },
  computed: {},
  methods: {
    tour(city) {
      this.$router.push("/tour/" + city);
    }
  }
};
</script>

<style scoped></style>
