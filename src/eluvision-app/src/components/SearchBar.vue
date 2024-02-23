<template>
  <div class="search-bar">
    <div class="form-wrapper">
      <select name="search-criterion" v-model="search_criterion" @change="onChange">
        <option value="" selected>Tous</option>
        <option value="nom_de_famille">Nom</option>
        <option value="prenom">Prénom</option>
        <option value="nom_circo">Département</option>
        <option value="parti_ratt_financier">Parti</option>
      </select>
      <input type="text" placeholder="Chercher un·e député·e" v-model="search_string" @input="onChange">
      <span class="clear" @click="clearForm">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="grey" class="bi bi-x-lg" viewBox="0 0 20 20">
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_criterion: "",
      search_string: "",
    }
  },

  methods: {
    onChange() {
      this.$emit('search-string-updated', { search_criterion: this.search_criterion, search_string: this.search_string });
    },
    clearForm() {
      this.search_criterion = "";
      this.search_string = "";
      this.$emit('search-string-updated', { search_criterion: this.search_criterion, search_string: this.search_string });
    }
  }
}
</script>
