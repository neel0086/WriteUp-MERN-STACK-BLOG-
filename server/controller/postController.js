import { response } from 'express';
import Tag from '../schema/CategoriesSchema.js';
import Post from '../schema/postSchema.js';
import user from '../schema/userSchema.js';
import User from '../schema/userSchema.js';
import jwt from 'jsonwebtoken'

export const createPost = async (request, response) => {
    let userdata = request.body.post
    let author = jwt.verify(request.body.token,'iaminevitable').username
    userdata.author=author
    console.log(userdata)
    try {
        const post = await new Post(userdata);
        const tag = await new Tag({tagOptions:userdata.catgories});
        tag.save()
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}
export const getAllBlogs = async (req,res) =>{
    let username = req.query.author
    let category = req.query.category
    let posts;
    try{
        if(username){
            posts=await Post.find({author:username})
        }
        else if(category && category!='all'){
            posts=await Post.find({catgories:category})
        }
        else{
            posts = await Post.find({}).sort({createdDate:-1});
        }
        res.status(200).json(posts)
        
    }catch(error){
        res.status(500).json(error)
    }
}

export const getAllTags = async (req,res) =>{
    
    try{
        let tags = await Tag.find({});
        res.status(200).json(tags)
        
    }catch(error){
        res.status(500).json(error)
    }
}

export const getPost = async (req,res) =>{
    try{
        let post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(error){
        res.status(500).json(error)
    }
}

export const updatePost = async (req,res) =>{
    try{
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).json("Blog Updated sucessfully")
    }catch(error){
        res.status(500).json(error)
    }
}

export const likePost = async(req,res) =>{
    console.log(req.body)
    try{
        
        if(req.body[1]==1){
            await Post.findByIdAndUpdate(req.params.id,
                { $push: { userLike: req.body[0]},$inc:{like:1}  })
        }
        if(req.body[1]==-1){
            await Post.findByIdAndUpdate(req.params.id,
                { $pull: { userLike: req.body[0]},$inc:{like:-1}  })
        }
        let blog = await Post.findById(req.params.id)
        
        res.status(200).json(blog)
        
        
    }catch(error){
        console.log(error)
    }
}

//USER
export const createUser = async (request, response) => {
    console.log(request.body)
    try {
        const person = await User.findOne({username:request.body.username})
        if(!person){
            const user = await new User(request.body);
            user.save()
            return response.json({status:'ok'})
        }
        else{
            return response.json({status:'nok'})
        }
    } catch (error) {
        return response.json({status:'nok'})
    }
}

export const checkUser = async (request, response) => {
    console.log(request.body)
    try {
        const person = await User.findOne({username:request.body.username})
        console.log(person)
        if (!person){
            return {status:'Invalid'}
        }
        console.log(request.body.password,person.password)
        if(request.body.password==person.password){
            const token = jwt.sign({
                username:person.username,
                password:person.password
            },"iaminevitable",
                {
                    expiresIn: '50h'
                }
            )
            return response.json({status:'okd',user:token})
        }
        else{
            return response.json({status:'not valid'})
        }
    } catch (error) {
        return response.json({status:'not valid'});
    }
}


export const checkjwt = async (request, response) => {
    try {
        let data = jwt.verify(request.body.tokenjwt,'iaminevitable')
        return response.json({status:'ok',user:data.username});

    } catch (error) {
        return response.json({status:'not valid'});
    }
}