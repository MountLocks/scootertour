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
            @input="loadProperties(city)"
          ></v-select>
        </v-flex>
        <v-flex v-if="city" xs12>
          <h1 class="pb-5">Select Property</h1>
          <v-select
            v-model="property"
            :items="properties"
            label="Select"
            solo
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex class="pt-5" xs12>
          <v-btn
            :disabled="city == null || property == null"
            @click="navigate(property)"
            >Continue</v-btn
          >
        </v-flex>
      </v-container>
    </v-layout>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/init.js";
export default {
  name: "UploadView",
  data() {
    return {
      city: null,
      cities: [],
      property: null,
      properties: []
    };
  },
  computed: {},
  methods: {
    async loadProperties(city) {
      let snapshot = await db
        .collection("properties")
        .where("city", "==", city)
        .get();
      let propertyList = snapshot.docs.map(doc => doc.id);
      this.properties = propertyList;
    },
    navigate(property) {
      this.$router.push("/uploadform/" + property);
    }
  },
  async mounted() {
    let snapshot = await db
      .collection("data")
      .orderBy("cityList")
      .get();
    let cityList = snapshot.docs[0].data().cityList;
    this.cities = cityList;
  }
};
</script>

<style scoped></style>
