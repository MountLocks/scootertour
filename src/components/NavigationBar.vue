<template>
  <div>
    <v-toolbar color="#333B52">
      <v-spacer></v-spacer>
      <v-btn text class="white--text" @click="home()">Mount ScooterTour</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {};
  },
  computed: {},
  methods: {
    home() {
      this.$router.push("/");
    }
  }
};
</script>
