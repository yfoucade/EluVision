<template>
  <div class="deputy-details" v-if="deputy_details">

    <div class="card mb-3" style="max-width: 540px;min-height: 160px; overflow: scroll;">
      <div class="row g-0">
        <div class="col-md-4">
          <img class="img-fluid rounded-start"
            :src="'https://nosdeputes.fr/depute/photo/' + deputy_details.slug + '/260'">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ (deputy_details.sexe == 'F' ? 'Mme ' : 'M. ') + deputy_details.nom }}</h5>
            <p class="card-text">{{ deputy_details.groupe.organisme }}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                <span v-if="deputy_details.nom_circo in departments_preposition">
                  <span>
                    {{
                      (deputy_details.sexe == 'F' ? 'Députée' : 'Député')
                      + ' de la '
                      + deputy_details.num_circo
                    }}
                  </span>
                  <span>
                    <sup>
                      <small>
                        {{ (deputy_details.num_circo == 1 ? 'ère' : 'ème') }}
                      </small>
                    </sup>
                  </span>
                  <span>
                    {{
                      ' circonscription'
                      + departments_preposition[deputy_details.nom_circo]
                      + deputy_details.nom_circo
                    }}
                  </span>
                </span>
                <span v-else>
                  {{ deputy_details.nom_circo }} ({{
                    deputy_details.num_circo }})
                </span>
                <br>
                <span>
                  Depuis le {{ deputy_details.mandat_debut.split('-').reverse().join('-') }}
                </span>
              </small>
            </p>
            <div class="external-links">
              <div class="personnal-website" v-if="deputy_details.urls.personnal_website">
                <a :href="deputy_details.urls.personnal_website" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-globe2"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                  </svg>
                </a>
              </div>
              <div class="twitter" v-if="deputy_details.urls.twitter">
                <a :href="deputy_details.urls.twitter" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-twitter-x"
                    viewBox="0 0 16 16">
                    <path
                      d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </a>
              </div>
              <div class="facebook" v-if="deputy_details.urls.facebook">
                <a :href="deputy_details.urls.facebook" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-facebook"
                    viewBox="0 0 16 16">
                    <path
                      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </a>
              </div>
              <div class="email" v-if="deputy_details.urls.email">
                <a :href="'mailto: ' + deputy_details.urls.email" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-envelope"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TODO: lien vers le profile assemblee nationale -->

    <div class="responsibilities">
      <h2>Responsabilités</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Responsabilités parlementaires
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul>
                <li v-for="resp in deputy_details.responsabilites">
                  {{ resp.responsabilite.organisme }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Responsabilités extra-parlementaires
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul>
                <li v-for="resp in deputy_details.responsabilites_extra_parlementaires">
                  {{ resp.responsabilite.organisme }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Groupes parlementaires
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul>
                <li v-for="resp in deputy_details.groupes_parlementaires">
                  <div class="resp-div">
                    {{ resp.responsabilite.organisme }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="addresses">
      <h2>Adresse{{ deputy_details.adresses.length > 1 ? 's' : '' }}</h2>
      <ul>
        <li v-for="address in deputy_details.adresses">
          <p>{{ address.adresse }}</p>
        </li>
      </ul>
    </div>

    <div class="back-button">
      <router-link to="/">
        <button @click="showList">Retour</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import departments_preposition from '../departments';

export default {

  data() {
    return {
      slug: this.$route.params.slug,
      deputy_details: null,
      departments_preposition: departments_preposition,
    };
  },

  methods: {
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
  },

  async beforeMount() {
    let response = await fetch(`https://www.nosdeputes.fr/${this.slug}/json`);
    let response_json = await response.json();
    this.deputy_details = response_json.depute;
    this.deputyDetailsPreprocessing();
  }
}

</script>

<style>
.deputy-details {
  width: 50%;
  max-width: 600px;
  margin: auto;
  margin-top: 30px;
}

.card {
  margin: auto;
  height: fit-content;
  width: fit-content;
}

.card-title {
  font-weight: bold;
}

.external-links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.card-body {
  height: 100%;
}

.external-links svg {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}

li {
  list-style-type: none;
  margin-top: 10px;
  width: 100%;
}

.responsibilities {
  margin-top: 30px;
}

.addresses {
  margin-top: 30px;
}
</style>