const app = Vue.createApp({
    data() {
        return {
            all_deputies: null,
            sort_by: 'nom_de_famille',
            current_deputy: null,
            ascending: 1,
            state: 'list',
        }
    },
    computed: {
        filtered_list() {
            return this.all_deputies.sort( (a,b) => this.ascending * a[this.sort_by].localeCompare(b[this.sort_by]) );
        }
    },
    methods: {
        async init_deputy_list() {
            response = await fetch('https://www.nosdeputes.fr/deputes/enmandat/json');
            response_json = await response.json();
            this.all_deputies = response_json.deputes.map( (obj) => {return obj.depute} );
            console.log(this.all_deputies);
        },
        updateSortBy(criterion) {
            if ( criterion == this.sort_by ) {
                this.ascending = -this.ascending;
                return;
            }
            this.sort_by = criterion;
            this.ascending = 1;
        },
        showDetails(index) {
            this.current_deputy = this.filtered_list[index];
            this.state = 'details';
            console.log(`Showing details about ${this.current_deputy.nom}`);
        },
        showList() {
            this.state = 'list';
        }
    },
    beforeMount() {
        this.init_deputy_list();
    }
})