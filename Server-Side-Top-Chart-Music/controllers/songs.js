const { Song, Favorite } = require('../models')
const { Op } = require('sequelize');
const { getToken } = require('../helpers/api-spotify')
const axios = require('axios');

class ControllerSong {


    static async getTopChart(req, res, next) {
        try {
            const accessToken = await getToken();
            const limit = 9;
            const market = 'US';
            const playlistUrl = 'https://api.spotify.com/v1/playlists/2KGxHR4cSJDOouz6WXjrhv';
            const url = `${playlistUrl}/tracks?fields=items(track(id,name,artists(name),album(name))),next&limit=${limit}&market=${market}&offset=0`;

            const { data: playlistData } = await axios({
                method: 'get',
                url: url,
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Extracting track ids from the playlist response
            const trackIds = playlistData.items.map(item => item.track.id).join(',');

            // Getting track details with images using track ids
            const tracksUrl = `https://api.spotify.com/v1/tracks?ids=${trackIds}`;
            const { data: tracksData } = await axios({
                method: 'get',
                url: tracksUrl,
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Extracting required track details
            const tracks = tracksData.tracks.map(track => ({
                id: track.id,
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                imageUrl: track.album.images[0].url,
            }));

            res.status(200).json(tracks);
        } catch (error) {
            next(error);
        }
    }

    static async getSongs(req, res, next) {
        try {
            const { filter } = req.query;
            const pageAsNumber = Number.parseInt(req.query.page);
            const sizeAsNumber = Number.parseInt(req.query.size);

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber;
            }

            let size = 9;
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
            }

            let songs;
            if (filter) {
                songs = await Song.findAndCountAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.iLike]: `%${filter}%`,
                                },
                            },
                            {
                                title: {
                                    [Op.iLike]: `%${filter.split('').join('%')}%`,
                                },
                            },
                        ],
                    },
                    limit: size,
                    offset: page * size,
                });
            } else {
                songs = await Song.findAndCountAll({
                    limit: size,
                    offset: page * size,
                });
            }

            res.status(200).json({
                songs: songs.rows,
                totalPages: Math.ceil(songs.count / size),
            });
        } catch (error) {
            next(error)
        }
    }


    static async getSongsById(req, res, next) {
        try {
            let id = req.params.id
            let songById = await Song.findByPk(id)
            if (!songById) {
                throw { name: "Song not found" }
            }

            res.status(200).json(songById)

        } catch (error) {
            next(error)
        }
    }

    static async createFavorite(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId } = req.user;

            const song = await Song.findByPk(id);
            if (!song) {
                throw { name: "Song not found" };
            }

            const existingFav = await Favorite.findOne({ where: { user_id: userId, song_id: id } });
            if (existingFav) {
                throw { name: 'Favorite already exists' };
            }

            const favorite = await Favorite.create({ user_id: userId, song_id: id });
            res.status(201).json({ message: 'Successfully added to favorites', data: favorite });
        } catch (error) {
            next(error)
        }
    }

    static async getFavorite(req, res, next) {
        try {
            const favorites = await Favorite.findAll({
                include: {
                    model: Song,
                }, where: {
                    user_id: req.user.id
                }
            });
            res.status(200).json(favorites);
        } catch (error) {
            next(error);
        }
    }

    static async deleteFavorite(req, res, next) {
        try {
            let id = req.params.id

            await Favorite.destroy({ where: { id } })

            res.status(200).json({ message: `Successfully delete favorites with id ${id}` });

        } catch (error) {
            next(error)
        }
    }

}


module.exports = ControllerSong