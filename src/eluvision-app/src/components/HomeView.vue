<template>
  <search-bar @search-string-updated="updateSearchString"></search-bar>
  <div id="results-list" v-if="all_deputies">

    <div class="results-found" v-if="filtered_list.length">
      <table>

        <tr>
          <th v-for="(header, index) in table_headers" :key="index" @click="updateSortBy(header.target_attribute)">
            <table-header-component :colname="header.colname"
              :sort="sort_by == header.target_attribute ? (ascending ? 'ascending' : 'descending') : 'no'">
            </table-header-component>
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
import TableHeaderComponent from "./TableHeaderComponent.vue";

export default {
  data() {
    return {
      all_deputies: null,
      sort_by: 'nom_de_famille',
      ascending: true,
      current_deputy: null,
      show_deputy_tag: false,
      deputy_tag_img: "",
      mousePosX: 0,
      mousePosY: 0,
      search_criterion: null,
      search_string: "",
      table_headers: [
        { colname: "Nom", target_attribute: "nom_de_famille" },
        { colname: "Prénom", target_attribute: "prenom" },
        { colname: "Département", target_attribute: "nom_circo" },
        { colname: "Groupe", target_attribute: "groupe_sigle" },
      ]
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

  components: { SearchBar, TableHeaderComponent, },

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

    updateSearchString(criterion_and_string) {
      this.search_criterion = criterion_and_string.search_criterion;
      if (criterion_and_string.search_string)
        this.search_string = criterion_and_string.search_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      else
        this.search_string = null;
      this.state = 'list';
    },

    deputyMatchesSearch(deputy_obj, search_string) {
      // Use criterion if there is one, otherwise, search default attributes
      for (let colname of (this.search_criterion ? [this.search_criterion] : ['nom_de_famille', 'prenom', 'nom_circo', 'num_deptmt', 'groupe_sigle', 'parti_ratt_financier'])) {
        if (deputy_obj[colname].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search_string))
          return true;
      }
      return false;
    },

    showDeputyTag(index) {
      this.deputy_tag_img = 'https://nosdeputes.fr/depute/photo/' + this.filtered_list[index].slug + '/100';
      this.show_deputy_tag = true;
    },

    hideDeputyTag() {
      this.show_deputy_tag = false;
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

<style>
#results-list {
  width: fit-content;
  margin: auto;
  margin: auto;
  margin-top: 30px;
}

.results-found {
  width: fit-content;
  max-height: 700px;
  overflow: scroll;
  scrollbar-color: black white;
  overflow-x: visible;
}


table {
  border-collapse: collapse;
}

th {
  width: 150px;
  text-align: left;
}

th span {
  margin-right: 5px;
}

#results-list table tr :nth-child(3) {
  width: 230px;
}

#results-list table tr :nth-child(4) {
  width: 150px;
}

tr:nth-child(2n+2) {
  background-color: rgb(242, 242, 242);
}

tr:hover {
  cursor: pointer;
}

.deputy-row:hover {
  background-color: lightskyblue;
}

.deputy-tag {
  position: absolute;
}
</style>