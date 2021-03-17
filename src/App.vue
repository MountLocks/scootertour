<template>
  <v-app>
    <navigationBar />
    <transition name="slide" mode="out-in">
      <router-view id="router" />
    </transition>
    <div id="app"></div>
  </v-app>
</template>

<script>
import navigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    navigationBar
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#router {
  flex: 1 0 auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
