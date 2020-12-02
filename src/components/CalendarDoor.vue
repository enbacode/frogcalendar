<template>
  <v-responsive :aspect-ratio="1" class="ma-2 door">
    <Flipper width="100%" height="100%" :flipped="flipped" @click="flip">
      <template v-slot:front>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col class="text-center"
              ><div class="doorNumber">{{ number }}</div></v-col
            >
          </v-row>
        </v-container>
      </template>
      <template v-slot:back>
        <div v-if="canFlip">
          <v-dialog v-model="dialog" fullscreen>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                :aspect-ratio="1"
                v-bind="attrs"
                v-on="on"
                :src="door.img"
              ></v-img>
            </template>
            <v-card>
              <v-card-title>
                Türchen Nr. {{ number }}
                <v-spacer></v-spacer>
                <v-btn text x-large @click="dialog = false" class="pr-0"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-card-title>
              <v-card-text>
                <v-img :src="door.img" max-height="100%"></v-img>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </Flipper>
  </v-responsive>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: ["door"],

  methods: {
    flip() {
      this.$gtag.event("flip", { num: this.number, valid: this.canFlip });
      if (this.canFlip && !this.flipped) {
        this.flipped = true;
        let flips = this.flips;
        flips.push(Number(this.number));
        localStorage.flipped = JSON.stringify(flips);
      }
    }
  },

  computed: {
    number() {
      return Number(this.date.format("D"));
    },
    flips() {
      return JSON.parse(localStorage.flipped);
    },
    canFlip() {
      return !this.date.isAfter(dayjs());
    }
  },
  mounted() {
    this.date = dayjs(this.door.date);
    this.flipped = this.flips.includes(this.number);
  },
  data() {
    return {
      date: dayjs(),
      flipped: false,
      dialog: false
    };
  }
};
</script>

<style scoped>
.doorNumber {
  text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff,
    -1px 1px 0 #fff, 1px 1px 0 #fff;
  font-weight: bolder;
  font-size: 5rem;
  color: rgba(0, 0, 0, 1);
}
.door {
  border: 2px dashed rgba(255, 255, 255, 0.3);
}
.back {
  background-color: white;
  height: 100%;
}
</style>
