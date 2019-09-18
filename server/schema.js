const mongoose = require('mongoose')

// import {
//   GraphQLObjectType,
//   GraphQLInputObjectType,
//   GraphQLString,
//   GraphQLList
// } from 'graphql'

// const commentFields = {
//   createdDate: { type: new Date(), description: ''},
//   createdBy: { type: GraphQLString, description: ''},
//   textContent: { type: GraphQLString, description: ''}
// }

// const CommentType = new GraphQLObjectType({
//   name: 'CommentType',
//   description: '',
//   fields: {
//     ...commentFields
//   }
// })

// const CommentInput = new GraphQLInputObjectType({
//   name: 'CommentInput',
//   description: '',
//   fields: { ...commentFields }
// })

// const postFields = {
//   title: { type: GraphQLString, description: ''},
//   imageLink: { type: GraphQLString, description: ''},
//   textContent: { type: GraphQLString, description: ''},
//   createdDate: { type: new Date(), description: ''},
//   createdBy: { type: GraphQLString, description: ''},
//   tags: { type: GraphQLString, description: ''},
//   comments: { type: CommentType, description: ''}
// }

// const PostType = new GraphQLObjectType({
//   name: 'PostType',
//   description: '',
//   fields: {
//     ...postFields
//   }
// })

// const PostInput = new GraphQLInputObjectType({
//   name: 'PostInput',
//   description: '',
//   fields: {
//     ...postFields
//   }
// })

const commentSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: Date, default: 'Anonymous' },
  textContent: { type: String, required: true }
})

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageLink: { type: String, required: false },
  textContent: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String, default: 'Anonymous' },
  tags: [String],
  comments: [Object]
})

let Post = mongoose.model("Post", postSchema)
let Comment = mongoose.model("Comment", commentSchema)
module.exports = {
  Post : Post,
  Comment: Comment
}
