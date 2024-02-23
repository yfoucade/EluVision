<template>
  <search-bar @search-string-updated="updateSearchString"></search-bar>
  <div id="results-list" v-if="all_deputies && state == 'list'">
    <div class="results-found" v-if="filtered_list.length">
      <table>
        <tr>
          <th @click="updateSortBy('nom_de_famille')">
            <span>Nom</span>
            <span class="sort-icon" v-if="sort_by == 'nom_de_famille'">
              <svg v-if="ascending" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
                class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                <path
                  d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-sort-up"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
            </span>
          </th>
          <th @click="updateSortBy('prenom')">
            <span>Prénom</span>
            <span class="sort-icon" v-if="sort_by == 'prenom'">
              <svg v-if="ascending" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
                class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                <path
                  d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-sort-up"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
            </span>
          </th>
          <th @click="updateSortBy('nom_circo')">
            <span>Département</span>
            <span class="sort-icon" v-if="sort_by == 'nom_circo'">
              <svg v-if="ascending" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
                class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                <path
                  d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-sort-up"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
            </span>
          </th>
          <th @click="updateSortBy('groupe_sigle')">
            <span>Groupe</span>
            <span class="sort-icon" v-if="sort_by == 'groupe_sigle'">
              <svg v-if="ascending" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
                class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                <path
                  d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-sort-up"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
            </span>
          </th>
        </tr>
        <tr class="deputy-row" v-for="(deputy, index) in filtered_list" :key="index" @click="showDetails(index)"
          @mouseover="showDeputyTag(index)" @mouseleave="hideDeputyTag">
          <td>{{ deputy.nom_de_famille }}</td>
          <td>{{ deputy.prenom }}</td>
          <td>{{ deputy.nom_circo }}</td>
          <td>{{ deputy.groupe_sigle }}</td>
        </tr>
      </table>
      <div class="deputy-tag" v-if="show_deputy_tag && mousePosX"
        :style="{ position: 'absolute', top: `${mousePosY + 3}px`, left: `${mousePosX}px`, }">
        <img :src="deputy_tag_img">
      </div>
    </div>
    <p v-else>Aucun résultat ne correspond à votre recherche</p>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  data() {
    return {
      all_deputies: null,
      sort_by: 'nom_de_famille',
      current_deputy: null,
      ascending: true,
      deputy_tag_img: "",
      mousePosX: 0,
      mousePosY: 0,
      search_criterion: null,
      search_string: "",
      show_deputy_tag: false,
      state: 'list',
    }
  },

  computed: {
    filtered_list() {
      let res = [ ...this.all_deputies ];
      if (this.search_string)
        res = this.all_deputies.filter((deputy_obj) => this.deputyMatchesSearch(deputy_obj, this.search_string));
      return res.sort((a, b) => (2 * this.ascending - 1) * a[this.sort_by].localeCompare(b[this.sort_by]));
    }
  },

  components: { SearchBar, },

  methods: {
    async init_deputy_list() {
      let response = await fetch('https://www.nosdeputes.fr/deputes/enmandat/json');
      let response_json = await response.json();
      this.all_deputies = response_json.deputes.map((obj) => { return obj.depute });
    },

    updateSortBy(criterion) {
      if (criterion == this.sort_by) {
        this.ascending = !this.ascending;
        return;
      }
      this.sort_by = criterion;
      this.ascending = true;
    },

    async showDetails(index) {
      let slug = this.filtered_list[index].slug;
      this.$router.push({ path: `/details/${slug}` });
    },

    showList() {
      this.state = 'list';
      this.hideDeputyTag();
    },

    updateSearchString(criterion_and_string) {
      this.search_criterion = criterion_and_string.search_criterion;
      if (criterion_and_string.search_string)
        this.search_string = criterion_and_string.search_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      else
        this.search_string = null;
      this.state = 'list';
    },

    deputyMatchesSearch(deputy_obj, search_string) {
      for (let colname of (this.search_criterion ? [this.search_criterion] : ['nom_de_famille', 'prenom', 'nom_circo', 'num_deptmt', 'groupe_sigle', 'parti_ratt_financier'])) {
        if (deputy_obj[colname].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search_string))
          return true;
      }
      return false;
    },

    deputyDetailsPreprocessing() {
      let urls = {}
      for (let site of this.deputy_details.sites_web) {
        if (site.site.includes("twitter.com"))
          urls.twitter = site.site;
        else if (site.site.includes("facebook.com"))
          urls.facebook = site.site;
        else if (!urls.personnal_website)
          urls.personnal_website = site.site;
      }
      for (let email of this.deputy_details.emails)
        if (email.email.includes("assemblee-nationale.fr"))
          urls.email = email.email;
      this.deputy_details.urls = urls;
    },

    showDeputyTag(index) {
      this.deputy_tag_img = 'https://nosdeputes.fr/depute/photo/' + this.filtered_list[index].slug + '/100';
      this.show_deputy_tag = true;
    },

    hideDeputyTag() {
      this.show_deputy_tag = false;
    },

    showLegalNotice() {
      this.state = 'legal_notice';
    },
  },

  beforeMount() {
    this.init_deputy_list();
  },

  mounted() {
    document.addEventListener("mousemove", (event) => {
      this.mousePosX = event.pageX;
      this.mousePosY = event.pageY;
    });
  }
}
</script>