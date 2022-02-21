import { Box, Button,  makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { checkjwt,  getPost } from '../service/api';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ViewBlog.css'
function ViewBlog() {
    const useStyles =makeStyles((theme) =>({
        container:{
            padding:'68px 80px',
            minHeight:'200vh',
            background:'none',
            [theme.breakpoints.down('md')]:{
                padding:'20px 0 200px 0'
            },
            '& > *':{
                fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'
                }
        
            
            
        },
        
        buton:{
            marginTop:12,
            backgroundColor:'hsla(0,0%,100%,.13)',
            borderRadius:10,
            marginRight:10,
            padding:'0 5px',
            color:'var(--white)',
            outline:'none',border:'none',
            cursor:'pointer',
            float:'right'
        },
        heading:{
            textAlign:'center',
            margin:"50px 0 20px 0",
            color:'var(--white)',
            fontSize:35,
            fontFamily:'Audiowide',
            textDecoration:'underline'
        },
        detail:{
            fontSize: 21,
            width:'100%',
            color:'var(--white)',
            fontFamily:'Luminari',
            padding:'0 12px',
            background:'none'
                // whiteSpace:'pre',
                // wordBreak:'break',
                // overflowWrap:'break-word'
        },
        viewdetails:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            width:'100%'
            
        }
    }))

    //USE STATE
    const classes=useStyles()
    const [post,setPost] = useState({})
    const [privacy,setPrivacy] = useState(false)
    const navigate = useNavigate()
    const url=post.picture || "https://5.imimg.com/data5/XY/NR/MY-2626186/project-wallpaper-500x500.jpg"
    
    //EXTRACT ID FROM URL
    let id=useParams()

    //FETCH POST FROM DATABSE
    useEffect(()=>{
        const fetchData = async () =>{
            let data=await getPost(id)
            setPost(data)
            await jwt_token(data)
        
        }
        fetchData();
      },[])

      
        const jwt_token = async (data) =>{
            console.log(data)
            const token = localStorage.getItem('token')
            let jwt = await checkjwt({tokenjwt:token});
            
            if (jwt.data.status=='ok'){
                console.log(jwt.data.user,post)
                if(jwt.data.user==data.author){
                    
                    setPrivacy(true)
                    console.log(privacy)
                }
                
            }
            }
            
  return (
    <Box className={classes.container} >
        <div container item>
            <div className='imagestyle'>
                <img src={url} alt="" className="image"></img>
            </div>
            <div>
                <div>
                <div className="blogdetail">
                    <p><b style={{color:'black'}}>Author: </b>{post.author}</p>
                    <p><b style={{color:'black'}}>PublishedDate: </b>{new Date(post.createdDate).toDateString()}</p>
                </div>
                </div>
            </div>
        </div>
        
        <Box style={{float:'right'}}>
            {!privacy ? '' :
            <Link to={`/updateblog/${post._id}`} style={{textDecoration:'none'}}>
                <Button variant="contained" color="bg-dark" style={{margin:'5px',fontSize:'15px',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}}>
                    <UpdateIcon style={{verticalAlign:'middle'}}/> 
                    &nbsp;&nbsp;UPDATE
                </Button>
            </ Link>}
            {!privacy ? '' :
            <Button variant="contained" color="bg-dark" style={{margin:'5px 0 5px 2px',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}}>
                <DeleteIcon style={{verticalAlign:'middle'}}/> 
                &nbsp;&nbsp;DELETE
            </Button>}

        </Box>
        <Typography className={classes.heading}>{post.title}</Typography>
        <TextareaAutosize className={classes.detail} value={post.writeup} disabled></TextareaAutosize>
        {/* <p >{post.writeup}</p> */}
    </Box>
  )
}

export default ViewBlog