<template>
  <v-app>
    <Snowf
      :amount="100"
      :size="10"
      :speed="2"
      :wind="0"
      :opacity="0.8"
      :swing="1"
      :image="null"
      :zIndex="null"
      :resize="true"
      color="#fff"
    />
    <v-main
      :style="`background-image: url(${bgImg})`"
      :class="{ mainMobile: $vuetify.breakpoint.xs, main: true }"
    >
      <v-container fluid>
        <v-row>
          <v-col
            cols="6"
            md="4"
            lg="3"
            xl="2"
            v-for="door in base.doors"
            :key="door.date"
          >
            <calendar-door :door="door"></calendar-door>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import base from "raw-loader!./assets/doors.bin";
import bgImg from "./assets/bg.jpg";
import Snowf from "vue-snowf";
import CalendarDoor from "./components/CalendarDoor";

export default {
  name: "App",

  components: {
    Snowf,
    CalendarDoor
  },

  created() {
    this.base = JSON.parse(atob(base));
    if (!localStorage.flipped) localStorage.flipped = ["0"];
  },
  data: () => ({
    base: {},
    bgImg: bgImg
  })
};
</script>

<style>
.main {
  background-size: cover;
}
.mainMobile {
  background-position-x: -280px;
}
</style>
