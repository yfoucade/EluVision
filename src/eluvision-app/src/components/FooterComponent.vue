<template>
  <footer>
    <div class='footer-content'>
      <div class="license">
        <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">
          <img src="../assets/gplv3.png">
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
    return {}
  },
}
</script>

<style>
.legal-notice-link {
  margin-left: 20px;
  padding-top: 10px;
}

.legal-notice-link:hover {
  cursor: pointer;
}

.license img {
  width: 70px;
  padding-top: 4px;
}

footer {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: white;
  bottom: 0;
}

.footer-content {
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin: auto;
}
</style>