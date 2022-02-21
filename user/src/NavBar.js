import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { checkjwt } from './service/api';
function NavBar() {
    const useStyles =makeStyles({
        component:{
            background:'linear-gradient(to bottom right,#071717,#1b1414)',
            
            zIndex:2000
        },
        option:{
            display:'flex',
            justifyContent:'space-between',
            '& > *':{
                padding:12
            }
        },
        rightnav:{
            display:'flex',
            justifyContent:'space-between',
            
        },
        link:{
            textDecoration:'none',
            color:'white',
            '& > *':{
                fontSize:'18px',
                padding:10,
                paddingTop:5,
                paddingBottom:5,
                cursor:'pointer',
                '&:hover' :{
                    backgroundColor:'grey',
                    color:'white',
                    borderRadius:'10px'
                }
            }
        }

    })
    const classes=useStyles()
    const navigate=useNavigate()
    const [jwtcheck,setJwtcheck]=useState(false)
    //JWT VERIFICATION
    useEffect   (()=>{
        const fetchData = async () =>{
        const token = localStorage.getItem('token')
        if(!token){
            setJwtcheck(false)
        }
        else{
            let jwt = await checkjwt({tokenjwt:token});
            if (jwt.data.status!='ok'){
                
                setJwtcheck(false)
            }
            else{
                setJwtcheck(true)
            }
        }
        }
        fetchData();
      },[])
  return (
      
    <AppBar className={classes.component}>
        
        
        <Toolbar className={classes.option}>
            <div>
            <Typography style={{fontSize:25,padding:3,fontFamily:'sofia'}}><b>WRITEUP.</b></Typography>
            </div>
            <div className={classes.rightnav} >
                <Link to={'/home'} className={classes.link}><Typography>HOME</Typography></Link>
                {jwtcheck ?
                <Typography onClick={() =>{localStorage.removeItem("token");navigate('/')}} className={classes.link}><Typography>LOGOUT</Typography></Typography>
                :<Typography onClick={() =>{navigate('/')}} className={classes.link}><Typography>LOGIN</Typography></Typography>
                }   
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar