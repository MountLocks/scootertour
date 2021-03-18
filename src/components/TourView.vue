<template>
  <v-container>
    <v-flex xs12>
      <h3 class="pb-5 text-center">Select Property</h3>
      <v-select
        v-model="property"
        :items="properties"
        label="Select"
        @change="propertySelected()"
        solo
      ></v-select>
      <div v-if="attractions.length > 0">
        <h3 class="text-center">Nearby Attractions</h3>
        <v-item-group max="3" multiple v-model="selected">
          <v-container>
            <v-row>
              <v-col
                v-for="(attraction, i) in attractions"
                :key="i"
                cols="12"
                md="4"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card class="mx-auto" dark @click="toggle">
                    <v-img :src="attraction.src" height="200"> </v-img>
                    <v-card-title
                      >{{ attraction.name }}
                      <v-btn icon dark>
                        <v-icon>
                          {{
                            active
                              ? "mdi-checkbox-marked"
                              : "mdi-checkbox-blank-outline"
                          }}
                        </v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-card-text>
                      <div>
                        {{ attraction.desc }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
        <v-layout text-center align-center justify-center>
          <v-container>
            <v-flex class="pt-5" xs12>
              <v-btn @click="start()">Start Tour</v-btn>
            </v-flex>
          </v-container>
        </v-layout>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import { db } from "@/firebase/init.js";
export default {
  name: "TourView",
  data() {
    return {
      city: this.$route.params.city,
      property: null,
      properties: [],
      attractions: [],
      selected: []
    };
  },
  async mounted() {
    let snapshot = await db
      .collection("properties")
      .where("city", "==", this.city)
      .get();
    let propertyList = snapshot.docs.map(doc => doc.id);
    this.properties = propertyList;
  },
  methods: {
    async propertySelected() {
      let snapshot = await db
        .collection("attractions")
        .doc(this.property)
        .get();
      let attractionsList = snapshot.data().attractionsList;
      this.attractions = attractionsList;
      if (attractionsList.length < 3) {
        this.selected = Array.from(Array(attractionsList.length).keys());
      } else {
        this.selected = Array.from(Array(3).keys());
      }
    },
    start() {
      var waypoints = "";
      var waypoint_place_ids = "";
      this.selected.forEach(element => {
        waypoints = waypoints.concat(
          this.attractions[element].name.split(" ").join("+") + "%7C"
        );
        waypoint_place_ids = waypoint_place_ids.concat(
          this.attractions[element].place_id.split(" ").join("+") + "%7C"
        );
      });
      waypoints = waypoints.substring(0, waypoints.length - 3);
      waypoint_place_ids = waypoint_place_ids.substring(
        0,
        waypoint_place_ids.length - 3
      );
      var url =
        "https://www.google.com/maps/dir/?api=1&origin=" +
        this.property.split(" ").join("+") +
        "&travelmode=bicycling&destination=" +
        this.property.split(" ").join("+") +
        "&waypoints=" +
        waypoints +
        "&waypoint_place_ids=" +
        waypoint_place_ids;
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped></style>
