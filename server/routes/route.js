import express, { Router } from 'express';
import { getImage, uploadImage } from '../controller/imageController.js';

import { checkjwt, checkUser, createPost,createUser,getAllBlogs, getAllTags, getPost, likePost, updatePost } from '../controller/postController.js';
import upload from '../utils/upload.js'

const router = express.Router();

//POST REQUEST
router.post('/createblog', createPost);
router.post('/authdata', createUser);
router.post('/updateblog/:id',updatePost)
router.post('/file/upload', upload.single('file'), uploadImage);
router.post('/checkdata',checkUser)
router.post('/checkjwt',checkjwt)

//GET REQUEST
router.get('/blogs',getAllBlogs)
router.get('/tags',getAllTags)
router.get('/blogs/:id',getPost)
router.get('/file/:filename',getImage)

//PUT REQUEST
router.put('/like/:id',likePost)
export default router;