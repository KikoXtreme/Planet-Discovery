const { planetModel } = require('../models');
const { newPost } = require('./postController')

function getPlanets(req, res, next) {
    const title = req.query.title || '';

    planetModel.find({ planetName: { $regex: title, $options: 'i' } })
        .populate('userId')
        .then(planets => res.json(planets))
        .catch(next);
}

function getPlanet(req, res, next) {
    const { planetId } = req.params;

    planetModel.findById(planetId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId'
            }
        })
        .then(planet => res.json(planet))
        .catch(next);
}

function createPlanet(req, res, next) {
    const { planetName, postText } = req.body;
    const { _id: userId } = req.user;

    planetModel.create({ planetName, userId, subscribers: [userId] })
        .then(planet => {
            newPost(postText, userId, planet._id)
                .then(([_, updatedPlanet]) => res.status(200).json(updatedPlanet))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const planetId = req.params.planetId;
    const { _id: userId } = req.user;
    planetModel.findByIdAndUpdate({ _id: planetId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedPlanet => {
            res.status(200).json(updatedPlanet)
        })
        .catch(next);
}

module.exports = {
    getPlanets,
    createPlanet,
    getPlanet,
    subscribe,
}
