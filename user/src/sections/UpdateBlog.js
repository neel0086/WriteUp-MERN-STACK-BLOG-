import React, { useEffect, useState } from 'react';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import { AddCircle as Add, CallEnd } from '@material-ui/icons';
import { createPost, getPost, updatePost, uploadFile } from '../service/api';
import { useParams, useNavigate } from 'react-router-dom';

import ImageIcon from '@material-ui/icons/Image';
import './UpdateBlog.css'
const useStyle = makeStyles(theme => ({
    container: {
        margin: '83.17px 100px',
        background:'none',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
        '& > *':{
            fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'
            }
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        color:'var(--white)',
        padding:'0 7px', 
        verticalAlign:'middle'

    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25,
           
        color:'var(--white)',
        fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'

    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        padding:'0 8px',
        '&:focus-visible': {
            outline: 'none'
        },
        background:'none',
        color:'var(--white)'
        
    }
}));

function UpdateBlog() {

    const classes = useStyle();
    //NAVIGATION
    const navigate= useNavigate()

    //USESTATE
    const [post,setPost] = useState({})
    const [file,setFile] = useState('')
    const [link,setLink] = useState('')
    const url = post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    //HANDLING CHANGE IN BLOGS
    const handleChange = (e) =>{
        setPost({...post, [e.target.name]:e.target.value})
    }

    const savePost = async () =>{
        await createPost(post);
    }
    
    //FETCH POST FROM ID AND UPDATE DATA OF THE FORM
    let id=useParams()
    useEffect(() =>{
        const getImage = async () =>{
            if(file){
                const data = new FormData();
                data.append("file",file)
                data.append("upload_preset",'writeup')
                data.append("cloud_name",'writeup')
                fetch("https://api.cloudinary.com/v1_1/writeup/image/upload",{
                    method:"post",
                    body:data
                })
                .then(res=>res.json())
                .then(data=>{
                    post.picture=data.url
                    setLink(data.url)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
        getImage()
    },[file])

    //FETCHING POST TO UPDATE
    useEffect(()=>{
    const fetchData = async () =>{
        let data = await getPost(id)
        setPost(data)
    }
    fetchData();
    },[])

    //UPDATE POST
    const UpdatePost = async () =>{
        await updatePost(id,post)
        navigate(`/viewblog/${id.id}`)
    } 
  return (
    <Box className={classes.container}>
            <div className='imagestyle'>
                <img src={url} alt="" className="image"></img>
            </div>
            <FormControl className={classes.title}>
                <label htmlFor="fileInput">
                    <ImageIcon className={classes.addIcon} fontSize="large" color="action" style={{color:'white',paddingRight:'6px'}}/>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none"}}
                    onChange={(e) => setFile(e.target.files[0])}
                    
                />
                <p style={{marginTop: 10,fontSize:'20px',color:'var(--white)',filter:'invert(0.5)'}}>TITLE: </p>
                <InputBase 
                    onChange={(e) => handleChange(e)} 
                    name='title' 
                    value={post.title}
                    placeholder="Title" 
                    className={classes.textfield} 
                    spellCheck='false'
                />
                <Button onClick={() => UpdatePost()} variant="contained" color="bg-dark" style={{margin:'5px',fontSize:'15px',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',fontFamily:'Verdana'}}>
                    POST
                </Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                className={classes.textarea}
                value={post.writeup}
                name='writeup'
                onChange={(e) => handleChange(e)}
                spellCheck='false'
                style={{background:'none'}}
            />
        </Box>
  )
}

export default UpdateBlog