app.component('search-bar', {
    data() {
        return {
            search_criterion: "",
            search_string: "",
        }
    },

    template:
    /*html*/
    `
    <div class="search-bar">
        <div class="form-wrapper">
            <select name="search-criterion" v-model="search_criterion" @change="onChange">
                <option value="" selected>Tous</option>
                <option value="nom_de_famille">Nom</option>
                <option value="prenom">Prénom</option>
                <option value="nom_circo">Circonscription</option>
                <option value="num_deptmt">Numéro de département</option>
                <option value="parti_ratt_financier">Parti</option>
            </select>
            <input type="text" placeholder="Chercher un député.." v-model="search_string" @input="onChange">
        </div>
    </div>
    `,

    methods: {
        onChange() {
            this.$emit('search-string-updated', {search_criterion: this.search_criterion, search_string: this.search_string});
        }
    }
})