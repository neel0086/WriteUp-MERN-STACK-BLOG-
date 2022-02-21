import axios from 'axios';

const url = 'http://localhost:5000';


export const createPost = async (post) => {
    try {
        return await axios.post(`${url}/createblog`, post);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}

export const getAllBlogs = async(query) =>{
    try{
        
        let response = await axios.get(`${url}/blogs${query.search}`)
        return response.data
    }catch(error){
        console.log("Error while getting blogs",error)
    }
}

export const getAllTags = async() =>{
    try{
        
        let response = await axios.get(`${url}/tags`)
        return response.data
    }catch(error){
        console.log("Error while getting blogs",error)
    }
}

export const getPost = async(id) =>{
    try{
        
        let response = await axios.get(`${url}/blogs/${id.id}`)
        return response.data
    }catch(error){
        console.log("Error while getting blogs",error)
    }
}

export const updatePost = async(id,post) =>{
    try{
        await axios.post(`${url}/updateblog/${id.id}`,post)
    }catch(error){
        console.log("error while updating the post",error)
    }
}


export const uploadFile = async (data) => {
    // console.log(post);
    try {
        return await axios.post(`${url}/file/upload`,data);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}

export const likePost = async  (id,user,flag) =>{
    console.log(`${url}/like/${id}`)
    try{
        let response = await axios.put(`${url}/like/${id}`,[user,flag]);
        return response.data
    }catch(error){
        console.log("Error while like_unliking the post",error);
    }
}


//USER
export const createUser = async (user) => {
    try {
        return await axios.post(`${url}/authdata`, user);
    } catch (error) {
        console.log('Error while calling RegisteringUser API ', error);
    }
}

export const checkUser = async (user) => {
    try {
        return await axios.post(`${url}/checkdata`, user);
        
    } catch (error) {
        console.log('Error while calling RegisteringUser API ', error);
    }
}

export const checkjwt = async (jwt) => {
    try {
        return await axios.post(`${url}/checkjwt`, jwt);
        
    } catch (error) {
        console.log('Error while calling RegisteringUser API ', error);
    }
}

