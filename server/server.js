const mongoose = require('mongoose')
const express = require('express')
const casual = require('casual')
const bodyParser = require('body-parser')
const logger = require('morgan')
let cors = require('cors')

const configs = require('./config')
const models = require('./schema')

const mongoAddress = configs.find(config => (config.id === 'mongodb'))
const apiPort = configs.find(config => (config.id === 'api'))
const templateImages = configs.find(config => (config.id === 'templateimages'))
const app = express()
app.use(cors())
const router = express.Router()

mongoose.connect(mongoAddress.value, {useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection

db.once('open', () => {
  models.Post.findOne((err, data) => {
    if (err) return res.json({ success: false, error: err })
    if (!data) {
      console.log('No posts found... Creating example posts.')
      for(const templateImage of templateImages.value) {
        const newPost = new models.Post({ title: casual.title, imageLink: templateImage, textContent: casual.sentences(20), tags: ['example', 'default'], createdBy: 'd.kqgqn@gmail.com' })
        newPost.save()
      }
    }
  })
})
db.on('error', console.error.bind(console, 'connection error:'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

router.get('/getPost', (req, res) => {
  models.Post.find((err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

router.post('/updatePost', (req, res) => {
  const { id, update } = req.body
  models.Post.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

router.delete('/deletePost', (req, res) => {
  const { id } = req.body
  models.Post.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true })
  })
})

router.post('/createPost', (req, res) => {
  let post = new models.Post()

  const { id, message } = req.body

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    })
  }
  post.message = message
  post.id = id
  post.save((err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})
  

app.use('/api', router)
app.listen(apiPort.value, () => console.log(`LISTENING ON PORT ${apiPort.value}`))