<script>

import { mapActions, mapState } from 'pinia'
import { useSongStore } from "../stores/song"

export default {
    name: 'detail',
    computed: {
        ...mapState(useSongStore, ['songDetail']),
        isAuthenticated() {
            return !!localStorage.getItem('access_token')
        },
    },

    methods: {
        ...mapActions(useSongStore, ['fetchDetail', 'addFavorite']),
        goToLyricsPage() {
            window.location.href = this.songDetail.lyrics;
        }
    },
    created() {
        this.fetchDetail(this.$route.params.id)
    }
}
</script>


<template>
    <div class="song-details d-flex justify-content-center align-items-center">
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="title"> Song: {{ songDetail.title }}</h1>
                        <h2 class="artist"> Artist: {{ songDetail.artist }}</h2>
                        <h2 class="artist"> Release Date: {{ new Date(songDetail.releaseDate).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        }) }}</h2>
                    </div>
                </div>
                <div class="lyrics-body" style="text-align: center;">
                    <button class="lyrics-button" @click="goToLyricsPage()">Click for lyrics</button>
                    <button v-if="isAuthenticated" class="lyrics-button" @click.prevent="addFavorite(this.$route.params.id)">Add to
                        Favorite</button>
                    <div class="image-wrapper">
                        <img :src="songDetail.imageUrl" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.lyrics-body {
    position: relative;
}

.lyrics-button {
    background-color: #0b0b0b;
    border: none;
    color: white;
    padding: 7px 17px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 1px;
    cursor: pointer;
    margin: 2px;
    margin-top: 5px;
}

.song-details {
    font-family: 'Open Sans', sans-serif;
    color: #333;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
}

.header {
    background-color: #f8f8f8;
    padding: 60px 0;
    border-bottom: 1px solid #ddd;  
}

.title {
    font-size: 41px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
}

.artist {
    font-size: 26px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 3px;
}

.image-wrapper {
    margin-top: 20px;
    text-align: center;
}

.image-wrapper img {
    max-width: 28%;
    height: auto;
    border: 1px solid #ddd;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
    padding: 10px;
    margin: 0 auto;
}

@media (max-width: 700px) {
    .title {
        font-size: 32px;
    }

    .artist {
        font-size: 20px;
    }
}
</style>
  