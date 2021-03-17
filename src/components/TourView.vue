<template>
  <v-container>
    <v-flex xs12>
      <h3 class="pb-5 text-center">Select Property</h3>
      <v-select
        v-model="property"
        :items="properties"
        item-text="address"
        item-value="address"
        label="Select"
        solo
      ></v-select>
      <h3 class="text-center">Nearby Attractions</h3>
      <v-item-group multiple v-model="selected">
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
    </v-flex>
    <v-layout text-center align-center justify-center>
      <v-container>
        <v-flex class="pt-5" xs12>
          <v-btn @click="start()">Start Tour</v-btn>
        </v-flex>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "TourView",
  data() {
    return {
      city: this.$route.params.city,
      property: "37 NW 52nd Street Miami FL",
      properties: [
        {
          address: "37 NW 52nd Street Miami FL",
          place_id: "ChIJB_UL7lyx2YgR_2az_i74Psw"
        }
      ],
      attractions: [],
      selected: []
    };
  },
  mounted() {
    var result = [
      {
        name: "Upper Buena Vista",
        desc:
          "An escape from the bustle of a burgeoning city. A bohemian oasis where authenticity is freshly brewed with each cup of coffee. An open space mall where curious discovery meets thoughtful craftsmanship.",
        src:
          "https://lh5.googleusercontent.com/p/AF1QipNs6Bra1C7LH2ZBl8JI1ppZGTCQhuMGoHD7DQJi=w1200-h1301-p-k-no",
        place_id: "ChIJf94KtCqx2YgRYcs1gJr87YQ"
      },
      {
        name: "Night Owl Cookies",
        desc: "Warm home-made cookies for the community.",
        src:
          "https://lh5.googleusercontent.com/p/AF1QipNlyLFHcJlo1_ndiBpPksKitkdb50oRcOu06KxV=w1200-h642-p-k-no",
        place_id: "ChIJJ8Zdo0yx2YgRz2FYJYD42qc"
      },
      {
        name: "Roots Miami Kava Bar & Eatery",
        desc: "",
        src:
          "https://lh5.googleusercontent.com/p/AF1QipMgol9ryaCmzzcq7vDeT3e2CD84JPz5qRfxmamW=w1200-h1301-p-k-no",
        place_id: "ChIJA5RHusex2YgR1S8fexhmbhg"
      },
      {
        name: "The Salty Donut Wynwood",
        desc: "",
        src:
          "https://lh5.googleusercontent.com/p/AF1QipMV5p9vvQIfX1I6FntChfTb-ArRZNY1iDJ1Y5DT=w1200-h1976-p-k-no",
        place_id: "ChIJxZkvTKy22YgRC7XlVzm6USw"
      },
      {
        name: "Wynwood Brewing Company",
        desc:
          "Artsy area's first craft production brewery with a taproom pouring seasonal, limited-edition beers.",
        src:
          "https://lh5.googleusercontent.com/p/AF1QipNbCOs0dNkXf3fLuaK6guxTe-MQ6SsSOwDhaYlA=w1200-h1301-p-k-no",
        place_id: "ChIJZYnZCrS22YgRzF-2lZvon1g"
      }
    ];
    this.attractions = result;
    this.selected = Array.from(Array(result.length).keys());
  },
  computed: {},
  methods: {
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
      console.log(url);
    }
  }
};
</script>

<style scoped></style>
