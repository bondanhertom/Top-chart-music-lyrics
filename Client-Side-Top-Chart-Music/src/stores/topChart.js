import { defineStore } from 'pinia'
import Axios from 'axios'

export const useTopChartStore = defineStore('topChart', {
    // other options...
    state: () => ({ //data() dikomponenen
        cards: [],
    }),
    getters: {

    },
    actions: { //seperti method di komponene
        async fetchTopChart() {
            try {
                let { data } = await Axios.get('https://i-project-music-production.up.railway.app/spotify/top-charts')
                this.cards = data

            } catch (error) {
                console.log(error);
            }
        },

    },
})