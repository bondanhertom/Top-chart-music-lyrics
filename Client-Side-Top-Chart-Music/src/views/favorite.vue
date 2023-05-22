<script>

import { useSongStore } from '../stores/song'
import { mapState, mapActions } from 'pinia'
import { useLoginStore } from '../stores/login'

export default {
    name: 'FavoriteSongs',
    computed: {
        ...mapState(useSongStore, ['favorites']),
    },
    methods: {
        ...mapActions(useSongStore, ['fetchFavorites','removeFavorite']),

        viewDetail(favorite) {
            this.$router.push('/detailSong/' + favorite.Song.id)
        },
    },
    created() {
        this.fetchFavorites();
    }
};
</script>
<template>
    <section class="song">
        <div class="col-12 mt-3 mb-5">
            <h1 class="text-center">LIST FAVORITE</h1>
        </div>
        <div v-if="favorites.length > 0" class="song-grid">


            <div class="card" v-for="favorite in favorites" :key="favorite.id">
                <div class="card-body">
                    <img :src="favorite.Song.imageUrl" class="card-img" />
                    <h3 class="card-title">{{ favorite.Song.title }}</h3>
                    <p class="card-artist">{{ favorite.Song.artist }}</p>
                    <div class="card-buttons">
                        <button class="card-btn" @click.prevent="viewDetail(favorite)">
                            <i class="material-icons">visibility</i> View Detail
                        </button>
                        <button class="card-icon-btn" @click.prevent="removeFavorite(favorite.id)">
                            <i class="material-icons" style="color:red;">delete</i>
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
        <div v-else class="col-12 mt-3 mb-5">
            <h1 class="text-else">YOU HAVEN'T ADDED ANY FAVORITES YET!</h1>

        </div>

    </section>
</template>

<style scoped>
/* Products section */


h1 {
    margin-top: 80px;
    font-size: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    margin-bottom: 2rem;
    color: #333;
}


.text-else {
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin-top: 4rem;
    text-align: center;
}

.song h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
}

.song-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto;

}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Center items horizontally */
    justify-content: center;
    /* Center items vertically */
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0px 1px 4px rgba(248, 24, 24, 0.1);
    transition: all 0.3s ease-in-out;
    position: relative;
    margin-bottom: 30px;
    margin-top: 10px;
}

.card-icon-btn {
    cursor: pointer;
}

.card-icon-btn i {
    font-size: 39px;
}

.card:hover {
    transform: translateY(-5px);
}

.card img {
    max-width: 100%;
    margin-bottom: 1rem;
}

.card h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
}

.card p {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 1rem;
}

.card-btn {
    background-color: #090909;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style> 



