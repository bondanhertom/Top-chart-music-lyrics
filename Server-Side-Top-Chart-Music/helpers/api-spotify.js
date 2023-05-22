const axios = require('axios');
require('dotenv').config()

clientId = process.env.CLIENT_ID_SPOTIFY;
clientSecret = process.env.CLIENT_SECRET_SPOTIFY;

const getToken = async () => {
    const { data } = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
            grant_type: 'client_credentials',
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`,
            ).toString('base64')}`,
        },
    });

    const accessToken = data.access_token;

    return accessToken;
};

module.exports = { getToken }
