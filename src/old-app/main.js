const app = Vue.createApp({
    data() {
        return {
            all_deputies: null,
            sort_by: 'nom_de_famille',
            current_deputy: null,
            deputy_tag_img: "",
            ascending: true,
            mousePosX: 0,
            mousePosY: 0,
            search_criterion: null,
            search_string: "",
            show_deputy_tag: false,
            state: 'list',
            departments_preposition: departments_preposition,
        }
    },
    computed: {
        filtered_list() {
            let res = this.all_deputies;
            if ( this.search_string )
                res = this.all_deputies.filter( (deputy_obj) => this.deputyMatchesSearch(deputy_obj, this.search_string) );
            return res.sort( (a,b) => (2 * this.ascending - 1) * a[this.sort_by].localeCompare(b[this.sort_by]) );
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
                this.ascending = !this.ascending;
                return;
            }
            this.sort_by = criterion;
            this.ascending = true;
        },

        async showDetails(index) {
            this.current_deputy = this.filtered_list[index];
            response = await fetch(this.current_deputy.url_nosdeputes_api);
            response_json = await response.json();
            this.deputy_details = response_json.depute;
            this.deputyDetailsPreprocessing();
            this.state = 'details';
            console.log(`Showing details about ${this.current_deputy.nom}`);
        },

        showList() {
            this.state = 'list';
            this.hideDeputyTag();
        },

        updateSearchString( criterion_and_string ) {
            this.search_criterion = criterion_and_string.search_criterion;
            if ( criterion_and_string.search_string )
                this.search_string = criterion_and_string.search_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            else
                this.search_string = null;
            this.state = 'list';
        },

        deputyMatchesSearch( deputy_obj, search_string ) {
            for (colname of ( this.search_criterion ? [this.search_criterion] : ['nom_de_famille', 'prenom', 'nom_circo', 'num_deptmt', 'groupe_sigle', 'parti_ratt_financier']) )
            {
                if (deputy_obj[colname].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search_string))
                   return true;
            }
            return false;
        },

        deputyDetailsPreprocessing() {
            urls = {}
            for ( let site of this.deputy_details.sites_web )
            {
                if ( site.site.includes("twitter.com") )
                    urls.twitter = site.site;
                else if ( site.site.includes("facebook.com") )
                    urls.facebook = site.site;
                else if ( !urls.personnal_website )
                    urls.personnal_website = site.site;
            }
            for ( let email of this.deputy_details.emails )
                if ( email.email.includes("assemblee-nationale.fr") )
                    urls.email = email.email;
            console.log(urls);
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
})
