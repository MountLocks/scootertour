<template>
  <v-layout align-center justify-center>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/MountLogo.png')"
          contain
          height="190"
        ></v-img>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="pt-5" xs12>
        <v-btn @click="start()">Get Started</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {};
  },
  computed: {},
  methods: {
    start() {
      this.$router.push("/selectcity");
    }
  }
};
</script>

<style scoped></style>
