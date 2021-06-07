<template>
  <v-layout align-center justify-center>
    <v-layout text-center wrap>
      <v-container>
        <h1 class="pb-5">{{ property }}</h1>
        <v-flex v-if="exists" xs12>
          <h2 class="pb-5">
            An entry for this property exists. To modify this entry, please
            contact us at
            <a href="mailto:help@mountlocks.com">help@mountlocks.com</a>
          </h2>
        </v-flex>
        <div v-else>
          <v-form ref="form" lazy-validation>
            <v-flex xs12>
              <div class="pb-5" v-for="(formField, i) in formFields" :key="i">
                <v-text-field
                  :label="formField.label1"
                  v-model="formField.value1"
                  :rules="requiredRule"
                ></v-text-field>

                <v-text-field
                  :label="formField.label2"
                  v-model="formField.value2"
                  :rules="requiredRule"
                ></v-text-field>

                <vue-google-autocomplete
                  :id="String(i)"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '4px',
                    border: '1px solid #ddd',
                    'border-radius': '4px',
                    'font-size': '18px'
                  }"
                  placeholder="Enter Address"
                  @placechanged="getAddressData"
                  :enable-geolocation="true"
                  types="establishment"
                  country="us"
                >
                </vue-google-autocomplete>

                <v-text-field
                  :label="formField.label3"
                  v-model="formField.value3"
                  :rules="requiredRule"
                ></v-text-field>

                <v-text-field
                  :label="formField.label4"
                  v-model="formField.value4"
                  :rules="requiredRule"
                ></v-text-field>

                <v-btn @click="remove(i)" class="error">delete</v-btn>
              </div>

              <v-btn @click="add" class="primary">add</v-btn>
            </v-flex>
          </v-form>
          <v-spacer></v-spacer>
          <v-flex class="pt-5" xs12>
            <v-btn :disabled="formFields.length == 0" @click="submit()"
              >Submit</v-btn
            >
          </v-flex>
        </div>
      </v-container>
    </v-layout>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/init.js";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "UploadView",
  data() {
    return {
      formFields: [],
      requiredRule: [v => !!v || "Input is required."],
      exists: false,
      property: this.$route.params.property
    };
  },
  components: { VueGoogleAutocomplete },
  computed: {},
  methods: {
    add() {
      this.formFields.push({
        label1: "Name",
        value1: "",
        label2: "Description",
        value2: "",
        label3: "Place ID",
        value3: "",
        label4: "Image Link",
        value4: ""
      });
    },
    remove(index) {
      this.formFields.splice(index, 1);
    },
    async getAddressData(addressData, placeResultData, id) {
      this.formFields[id].value3 = placeResultData.place_id;
      if (placeResultData.photos) {
        let url = await placeResultData.photos[0].getUrl();
        this.formFields[id].value4 = url;
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        let data = { attractionsList: [] };
        this.formFields.forEach(attraction => {
          data.attractionsList.push({
            name: attraction.value1,
            desc: attraction.value2,
            place_id: attraction.value3,
            src: attraction.value4
          });
        });
        const attractionsDoc = db.collection("attractions").doc(this.property);
        attractionsDoc.set(data);
        this.$router.push("/");
      }
    }
  },
  async mounted() {
    let snapshot = await db
      .collection("attractions")
      .doc(this.property)
      .get();
    this.exists = snapshot.exists;
  }
};
</script>

<style scoped></style>
