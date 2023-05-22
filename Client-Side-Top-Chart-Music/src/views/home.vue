<script>
import SongCard from "../components/songCardTop.vue"
import { mapActions, mapState } from 'pinia'
import { useTopChartStore } from '../stores/topChart'
export default {
    name: "HomePage",
    components: {
        SongCard,
    },
    computed: {
        ...mapState(useTopChartStore, ['cards']),
    },
    methods: {
        ...mapActions(useTopChartStore, ['fetchTopChart']),

    },
    created() {
        this.fetchTopChart()
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-3 mb-5" style="display: flex; align-items: center; justify-content: center;">
                <lord-icon src="https://cdn.lordicon.com/vkweisbr.json" trigger="hover"
                    style="width: 100px; height: 100px; margin-right: 10px;"></lord-icon>
                <h1 class="text-center" style="margin: 0;">TOP CHART GLOBAL POP PUNK</h1>
            </div>
            <SongCard :cards="cards" />
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 4.4rem;
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
