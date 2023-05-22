const { Favorite } = require('../models')

async function authorization(req, res, next) {
    try {
        let favoriteId = req.params.id
        let favorite = await Favorite.findByPk(favoriteId)

        if (!favorite) {
            throw { name: "Song not found" };
        }

        if (req.user.id !== favorite.user_id) {
            throw ({ name: "Forbidden" })
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authorization }