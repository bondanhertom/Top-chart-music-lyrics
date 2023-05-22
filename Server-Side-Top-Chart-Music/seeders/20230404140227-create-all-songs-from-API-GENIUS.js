'use strict';
require('dotenv').config()

const axios = require('axios');
//const Song = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const api_key = process.env.ACCESS_TOKEN_GENIUS;
    const per_page = 30; // Jumlah hasil pencarian yang ingin ditampilkan
    const page = 2; // 

    try {
      const response = await axios.get(`https://api.genius.com/search?q=Neeck-Deep%20&sort=popularity&per_page=${per_page}&page=${page}&access_token=${api_key}`);
      const data = response.data.response.hits;
      const songs = data.map((hit) => {
        return {
          title: hit.result.title,
          artist: hit.result.primary_artist.name,
          lyrics: hit.result.url,
          imageUrl: hit.result.song_art_image_url,
          releaseDate: hit.result.release_date_for_display,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
      await queryInterface.bulkInsert('Songs', songs, {});
    } catch (error) {
      console.error(api_key,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log('Error adding songs to database');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
    console.log('Songs deleted from database');
  }
};
