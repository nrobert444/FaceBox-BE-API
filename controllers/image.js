const Clarifai = require('clarifai')
const apiKey = process.env.CLARIFAI_API_KEY

const app = new Clarifai.App({
  apiKey: apiKey
})

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with Api'))
}

const handleImage = db => (req, res) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get count'))
}

module.exports = {
  handleImage,
  handleApiCall
}