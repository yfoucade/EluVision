<template>
  <header class="nav-bar">
    <div class="nav-bar-content">
      <router-link to="/">
        <h1>ÉluVision</h1>
      </router-link>
    </div>
  </header>

  <router-view></router-view>
  <footer-component></footer-component>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";

export default {
  data() {
    return {};
  },
  components: { FooterComponent }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 150px;
}
</style>
