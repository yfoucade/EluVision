<template>
  <header class="nav-bar">
    <div class="nav-bar-content">
      <router-link to="/">
        <h1>ÉluVision</h1>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style>
.nav-bar {
  margin-top: 15px;
}

.nav-bar-content {
    font-family: Anton, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: black;
    margin-top: 5px;
    height: 100%;
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin: auto;
}
</style>