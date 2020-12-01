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
          <v-img :aspect-ratio="1" :src="door.img"></v-img>
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
      if (this.canFlip && !this.flipped) {
        this.flipped = true;
        localStorage.flipped = localStorage.flipped.concat([this.number]);
      }
    }
  },

  computed: {
    number() {
      return this.date.format("D");
    },
    canFlip() {
      return !this.date.isAfter(dayjs());
    }
  },
  mounted() {
    this.date = dayjs(this.door.date);
    this.flipped = localStorage.flipped.includes(this.number);
  },
  data() {
    return {
      date: dayjs(),
      flipped: false
    };
  }
};
</script>

<style scoped>
.doorNumber {
  text-shadow: 0 0 20px #fff;
  font-weight: bolder;
  font-size: 5rem;
}
.door {
  border: 3px dashed #fff;
}
.back {
  background-color: white;
  height: 100%;
}
</style>
