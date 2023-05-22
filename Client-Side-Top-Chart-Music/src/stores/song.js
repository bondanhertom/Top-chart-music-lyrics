import { defineStore } from 'pinia'
import Axios from 'axios'
import Swal from "sweetalert2";

export const useSongStore = defineStore('song', {
    // other options...
    state: () => ({ //data() dikomponenen
        cards: [],
        favorites: [],
        songDetail: {}
    }),
    getters: {
        filteredCards: state => filter => {
            return state.cards.songs.filter(card => {
                return card.songs.title.toLowerCase().includes(filter.toLowerCase())
            })
        }

    },
    actions: { //seperti method di komponene
        async fetchCard() {
            try {
                const { data } = await Axios.get('https://i-project-music-production.up.railway.app/pub/songs')
                this.cards = data;
            } catch (error) {
                console.log(error);
            }
        },

        async searchCards(filter) {
            try {                               
                const { data } = await Axios.get(`https://i-project-music-production.up.railway.app/pub/songs?filter=${filter}`)
                this.cards = data
                this.loading = false
            } catch (error) {
                console.log(error);
            }
        },

        async nextPage(page) {
            try {
                let { data } = await Axios({
                    url: `https://i-project-music-production.up.railway.app/pub/songs`,
                    method: "get",
                    params: { page },
                });

                this.cards = data;
            } catch (err) {
                console.log(err);
            }
        },


        async addFavorite(id) {
            try {
                const { data } = await Axios({
                    url: `https://i-project-music-production.up.railway.app/pub/favorites/${id}`,
                    method: 'POST',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                Swal.fire("Add Favorite Success!", "Added!", "success");
            } catch (error) {
                console.log(error);
                new Swal("Info", error.response.data.message, "info");
            }
        },


        async fetchFavorites() {
            try {
                const response = await Axios.get(`https://i-project-music-production.up.railway.app/pub/favorites`, {
                    headers: {
                        access_token: localStorage.getItem('access_token'),
                    },
                });
                this.favorites = response.data; // Mengupdate state dengan daftar favorites dari server
                return response;
            } catch (error) {
                new Swal("Error", error.response.data.message, "error");
            }
        },


        async removeFavorite(favoriteId) {
            try {
                const response = await Axios.delete(`https://i-project-music-production.up.railway.app/pub/favorites/${favoriteId}`, {
                    headers: {
                        access_token: localStorage.getItem('access_token'),
                    },
                });
                Swal.fire("Delete Favorite Success!", "Deleted!", "success");
                this.favorites = this.favorites.filter((favorite) => favorite.id !== favoriteId); // Menghapus favorite dari state
                return response;
            } catch (error) {
                console.error(error);
                new Swal("Error", error.response.data.message, "error");
            }
        },



        async fetchDetail(id) {
            try {
                let { data } = await Axios.get(`https://i-project-music-production.up.railway.app/pub/songs/${id}`)
                this.songDetail = data
                //  console.log(this.productDetail);
            }
            catch (error) {
                console.log(error);

            }
        },

    },
})