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
import { db } from "@/firebase/init.js";
export default {
  name: "CitySelector",
  data() {
    return {
      city: null,
      cities: []
    };
  },
  computed: {},
  methods: {
    tour(city) {
      this.$router.push("/tour/" + city);
    }
  },
  async mounted() {
    let snapshot = await db
      .collection("data")
      .orderBy("cityList")
      .get();
    let cityList = snapshot.docs[0].data().cityList;
    this.city = cityList[0];
    this.cities = cityList;
  }
};
</script>

<style scoped></style>
