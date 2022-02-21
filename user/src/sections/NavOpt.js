import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { useEffect, useState } from 'react'
import './NavOpt.css'
import SearchIcon from '@material-ui/icons/Search';
import CachedIcon from '@material-ui/icons/Cached';
import { Link } from 'react-router-dom';
import { getAllTags } from '../service/api';
import { TextareaAutosize } from '@material-ui/core';
function NavOpt() {

    //USESTATES
    const [open,setOpen]=useState(false)
    const [tag,setTag]=useState([])
    const [tagvalue,setTagvalue]=useState('')
    const [foundtag, setFoundtag] = useState(tag);

    //FETCHING ALL THE TAGS
    useEffect(()=>{
        const fetchData = async () =>{
            let data = await getAllTags()
            setTag(data)
            setFoundtag(data)
        }
        fetchData();
        },[])

    // SEARCH TAG SYSTEM
    const filter = (e) => {
        setTagvalue(e.target.value)
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = tag.filter((tags) => {
            return tags.tagOptions.toLowerCase().includes(keyword.toLowerCase());
            
            });
            setFoundtag(results);
        } else {
            setFoundtag(tag);
        }
        
    }
    
    //OPENMODAL
    function openModal(){
        setOpen(true)
    }
    
    //CLOSEMODAL
    function closeModal(){
        setOpen(false)
    }
    
    //ADDELPPISIS
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 
    
  return (
    <React.Fragment>
        <Modal show={open} onHide={closeModal} style={{zIndex:5000}}>
            <Modal.Body className='navop' style={{display:'flex',flexDirection:'column'}}>
                {foundtag.map((tags) =>(
                    <Link to={`./?category=${tags.tagOptions}`} 
                        style={{color:'var(--white)',textDecoration:'none'}}>
                        <span>
                            {tags.tagOptions}
                        </span>
                    </Link>
                ))}                
            </Modal.Body>

            <Modal.Footer>
                <TextareaAutosize
                        rowsMin={1}
                        onChange={(e) => filter(e)}
                        placeholder="Search Tag"
                        className="search"
                        name='catgories'
                        value={tagvalue}
                        spellCheck='false'
                    />
                <Button variant="secondry" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
            </Modal>
        <div className="opt">
            <div className="opt_scroll">
                <button onClick={openModal}>
                    <SearchIcon />&nbsp;Search
                </button>
            </div>
            <div className="opt_scroll">
                <Link to={'./?category=all'}>
                <button>
                    <CachedIcon />&nbsp;Default
                </button>
                </Link>
            </div>
            
            {tag.map((tags) => (
                <div className="opt_scroll">
                    <Link to={`./?category=${tags.tagOptions}`}>
                    <button>{addEllipsis(tags.tagOptions,8)}</button>
                    </Link>
                </div>
            ))}
        </div >
        
    </React.Fragment>
  )
}

export default NavOpt