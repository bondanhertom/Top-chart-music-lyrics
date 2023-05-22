<script>
import listSong from "../components/listSongCard.vue";
import PageNav from "../components/paginasi.vue"
import { mapActions, mapState } from "pinia";
import { useSongStore } from "../stores/song";

export default {
    name: "List-Page",
    components: {
        listSong,
        PageNav
    },
    data() {
        return {
            page: 0,
        };
    },

    computed: {
        ...mapState(useSongStore, ['cards']),
        getCardsCount() {
            if (this.cards.songs) {
                return this.cards.songs.length;
            }
        },
    },
    methods: {
        ...mapActions(useSongStore, ["nextPage", 'fetchCard']),

        nextPageHandler() {
            this.page++;
        },

        backPageHandler() {
            if (this.page > 0) {
                this.page--;
            }
        },

    },
    watch: {
        page(val) {
            this.nextPage(val);
        },
    },
    created() {
        this.fetchCard()
    }
};
</script>
<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-12 mt-3 mb-5">
                    <h1 class="text-center">SONG LIST</h1>
                </div>
                <div class="row">
                    <listSong v-for="card in cards.songs" :key="card.id" :card="card"
                        class="col col-md-4" />
                    <PageNav class="d-flex justify-content-center" @nextPageNav="nextPageHandler"
                        @backPageNav="backPageHandler" :page="page" :songCount="getCardsCount" />
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped>
.container {
    margin-top: 5rem;
    max-width: 1200px;

}

h1 {
    font-size: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    margin-bottom: 2rem;
    color: #333;
}


.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    justify-content: center;
}

.col {
    padding: 0 15px;
    width: 100%;
    max-width: 100%;
}

@media (min-width: 768px) {
    .col {
        width: calc(33.333333% - 30px);
        max-width: calc(33.333333% - 30px);
    }
}
</style>
