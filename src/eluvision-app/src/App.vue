<template>
  <div class="nav-bar">
    <div class="nav-bar-content">
      <router-link to="/">
        <h1>ÉluVision</h1>
      </router-link>
    </div>
  </div>

  <router-view></router-view>

  <footer>
    <div class='footer-content'>
      <div class="license">
        <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">
          <img src="./assets/gplv3.png">
        </a>
      </div>
      <div class="legal-notice-link">
        <router-link to="/legal-notice">
          <p>Mentions légales</p>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  margin-top: 15px;
}
</style>
