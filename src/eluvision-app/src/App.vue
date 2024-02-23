<template>
  <navbar-component></navbar-component>
  <router-view></router-view>
  <footer-component></footer-component>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  data() {
    return {};
  },
  components: { NavbarComponent, FooterComponent }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 150px;
  /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
}

body {
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

::-webkit-scrollbar {
    display: none;
}

a {
    text-decoration: none !important;
    color: black !important;
}

.back-button {
    margin-top: 30px;
}
</style>
