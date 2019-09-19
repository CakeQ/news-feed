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
        const newPost = new models.Post({
          title: casual.title,
          imageLink: templateImage,
          textContent: casual.sentences(20),
          tags: ['example', 'default'],
          createdBy: 'Dan@gmail.com',
          createdDate: new Date(),
          comments: [
            {
              createdBy: 'Anonymous',
              createdDate: new Date(),
              textContent: casual.sentences(3)
            },
            {
              createdBy: 'Anonymous',
              createdDate: new Date(),
              textContent: casual.sentences(3)
            },
            {
              createdBy: 'Bob@gmail.com',
              createdDate: new Date(),
              textContent: casual.sentences(3)
            }
          ]
        })
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
  const { filter } = req.body
  models.Post.find(filter, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

router.post('/updatePost', (req, res) => {
  const { post, update } = req.body
  const id = post._id
  models.Post.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

router.delete('/deletePost', (req, res) => {
  const { post } = req.body
  const id = post._id
  models.Post.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true })
  })
})

router.post('/createPost', (req, res) => {
  let newPost = new models.Post()

  const { post } = req.body

  newPost.title = post.title
  newPost.imageLink = post.imageLink
  newPost.createdBy = post.createdBy
  newPost.textContent = post.textContent
  newPost.tags = post.tags
  newPost.save((err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})
  

app.use('/api', router)
app.listen(apiPort.value, () => console.log(`LISTENING ON PORT ${apiPort.value}`))