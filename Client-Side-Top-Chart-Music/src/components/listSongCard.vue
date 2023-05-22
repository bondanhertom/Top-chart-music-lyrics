<script>
import { useSongStore } from '../stores/song'
import { mapActions } from "pinia";
export default {
    name: "SongCard",
    props: ['card'],
    methods: {

        viewDetail() {
            this.$router.push('/detailSong/' + this.card.id)
        },

    },
}
</script>
<template>
    <section class="song">
        <div class="song-grid">
            <div class="card">
                <img :src="card.imageUrl" />
                <div class="card-body">
                    <h3 class="card-title">{{ card.title }}</h3>
                    <p class="card-artist">{{ card.artist }}</p>
                    <div class="card-buttons">
                        <button class="card-btn" @click.prevent="viewDetail">
                            <i class="material-icons">visibility</i> View Detail
                        </button>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Products section */
.song h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
}

.song-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    max-width: 900px;
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
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 1px 4px rgba(248, 24, 24, 0.1);
    transition: all 0.3s ease-in-out;
    position: relative;
    margin-top: 10px;
}

.card-icon-btn {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    padding: 0;
    margin-left: 10px;
    cursor: pointer;
}

.card-icon-btn i {
    font-size: 39px;
}

.card:hover {
    transform: translateY(-5px);
}

.card img {
    max-width: 80%;
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
    background-color: #050505;
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
