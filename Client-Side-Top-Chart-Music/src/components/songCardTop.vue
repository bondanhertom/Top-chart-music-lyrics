<script>
// import { useFavoriteStore } from '../stores/favorite'
import { useLoginStore } from '../stores/login'
export default {
    name: "SongCard",
    props: ['cards', 'isIcon'],
    computed: {
        userId() {
            const userId = useLoginStore().userId;
            console.log('userId:', userId);
            return userId;
        }
    },
}
</script>
<template>
    <div class="row">
        <div class="table-responsive">
            <table class="table align-middle table-transparent table-hover">
                <tbody>
                    <tr v-for="(card, index) in cards" :key="card.id">
                        <td scope="row">#{{ index + 1 }}</td>
                        <td><img :src="card.imageUrl" alt="" style="max-width:70px;"></td>
                        <td>{{ card.artist }}</td>
                        <td>{{ card.album }}</td>
                        <td>{{ card.title }}</td>
                        <td>
                            <lord-icon src="https://cdn.lordicon.com/kwsfrmbv.json" trigger="hover"
                                style="width:50px;height:45px">
                            </lord-icon>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
.table {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    color: #333;
}

.table td,
.table th {
    text-align: left;
    font-family: sans-serif;
    font-size: 22px;
}

.table-transparent {
    background-color: transparent;
}

.table-hover tbody tr:hover {
    background-color: rgba(227, 36, 36, 0.05);
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
    background-color: transparent;
}


.table-hover tbody tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1);
}

.table-hover thead th {
    text-align: center;
    font-weight: bold;
    background-color: transparent;
    color: #333;
}

.table-hover thead th:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

img {
    display: block;
    margin: 0 auto;
    max-width: 80px;
}
</style>