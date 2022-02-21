import React, { useEffect, useState } from 'react';
import { Modal} from 'react-bootstrap';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { checkjwt, createPost, getAllTags } from '../service/api';
import './CreateBlog.css'
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@material-ui/icons/Image';
const useStyle = makeStyles(theme => ({
    container: {
        margin: '83.17px 100px',
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
        padding:'0 10px',
        
    },
    textfield: {
        flex: 1,
        margin: '0 10px',
        fontSize: 25,
        color:'var(--white)'
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        padding:'0 10px',
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        },
        background:'none',
        color:'var(--white)'
        
    
    },
    publish:{
        width:'10%',
        [theme.breakpoints.down('md')]: {
            width: '0%'
        },
    },
    search:{
        width:'80%',
        background:'none',
        border:'none',
        color:'var(--white)'
    }
}));
const initials={
    title:'',
    writeup:'',
    picture:'',
    author:'',
    catgories:'',
    like:0,
    userLike:[],
    createdDate:new Date() 
}
function CreateBlog() {
    //USESTATE
    const classes = useStyle();
    const [open,setOpen]=useState(false)
    const [tag,setTag]=useState([])
    const [tagvalue,setTagvalue]=useState('')
    const [post,setPost]=useState(initials)
    const [file,setFile] = useState('')
    const [link,setLink] = useState('')
    const [create,setCreate]=useState(false)
    const url = post.picture || 'https://5.imimg.com/data5/XY/NR/MY-2626186/project-wallpaper-500x500.jpg';
    const navigate = useNavigate()

   
    
    //ONSUBMIT AND ONTAG SELECTION ONCHANGE
    const handleChange = (e) =>{
    setPost({...post, [e.target.name]:e.target.value})
    }

    const savePost = async () =>{
        let token=localStorage.getItem('token')
        await createPost({post:post,token:token});
        navigate('../home')
    }

    //MODAL OPEN_CLOSE
    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }

    //FETCH ALL TAGS
    
    useEffect(()=>{
        const fetchData = async () =>{
          let data = await getAllTags()
          setTag(data)
          setFoundtag(data)
        }
        fetchData();
      },[])

      useEffect(()=>{
        const fetchData = async () =>{
        const token = localStorage.getItem('token')
        let jwt = await checkjwt({tokenjwt:token});
        if (jwt.data.status!='ok'){
            alert('Login to acess the page')
            navigate('../')
            
        }
        
        
        }
        fetchData();
      },[])



    //ONCHANGE SET VALUE OF BLOG 
    const titlevalue = async (e) =>{
        setPost({...post, [e.target.name]:e.target.value})
        console.log(post)
        setOpen(false)
    }

    //IMAGE UPLOAD
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

    //SEARCH TAG
    const [foundtag, setFoundtag] = useState(tag);
    const filter = (e) => {
        setTagvalue(e.target.value)
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = tag.filter((tags) => {
            return tags.tagOptions.toLowerCase().includes(keyword.toLowerCase());
            
            });
            if(results.length==0){setCreate(true)}
            else{setCreate(false)}
            setFoundtag(results);
        } else {
            setFoundtag(tag);
        }
        
    }

    //JWT VERIFICATION
    useEffect(()=>{
        const fetchData = async () =>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('../')
        }
        else{
            let jwt = await checkjwt({tokenjwt:token});
            if (jwt.data.status!='ok'){
                navigate('../')
            }
        }
        
        
        
        
        }
        fetchData();
      },[])
      
  return (
    <Box className={classes.container}>
            <div className='imagestyle'>
                <img src={url} alt="" className="image"></img>
            </div>

            <FormControl className={classes.title}>
            <label htmlFor="fileInput">
                    <ImageIcon className={classes.addIcon} fontSize="large" color="action" style={{color:'white',cursor:'pointer'}}/>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                    
                />
                <InputBase 
                    onChange={(e) => handleChange(e)} 
                    name='title' 
                    placeholder="TITLE" 
                    className={classes.textfield} 
                    spellCheck='false'
                />
                <Button onClick={openModal} variant="contained" color="bg-dark" style={{margin:'5px',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}}>
                    <LocalOfferIcon style={{verticalAlign:'middle'}}/>
                    &nbsp;&nbsp;Tag
                </Button>
                <Button onClick={() => savePost()} variant="contained" color="bg-dark" style={{margin:'5px 4px',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}} >
                    <PublishIcon style={{verticalAlign:'middle'}}/>
                    &nbsp;&nbsp;Post
                </Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Start your creative blog"
                className={classes.textarea}
                name='writeup'
                onChange={(e) => handleChange(e)}
                spellCheck='false'
            />
            <Modal show={open} onHide={closeModal} style={{zIndex:5000}}>
            
            <Modal.Body className='navop' style={{display:'flex',flexDirection:'column'}}>
                {foundtag.map((tags) =>(
                    <Box
                        onClick={() =>{setTagvalue(tags.tagOptions);
                            const newState = post
                            newState['catgories'] = tags.tagOptions
                            setPost(newState)
                        }}
                        style={{color:'var(--white)',textDecoration:'none'}}>
                            <span>
                                {tags.tagOptions}
                            </span>
                    </Box>
                ))}
            </Modal.Body>

            <Modal.Footer>
                <TextareaAutosize
                    rowsMin={1}
                    onChange={(e) => filter(e)}
                    placeholder="Search || Create"
                    className={classes.search}
                    name='catgories'
                    value={tagvalue}
                    spellCheck='false'
                />
                <Button variant="secondry" onClick={() =>{setTagvalue(tagvalue);
                            const newState = post
                            newState['catgories'] = tagvalue
                            setPost(newState);setOpen(false)
                        }}
                         style={{fontSize:'12px'}}>
                    {!create ? 'Done' :'create'}
                </Button>
            </Modal.Footer>
            </Modal>
        </Box>
  )
}

export default CreateBlog