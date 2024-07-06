import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePopup } from '../Store/Popups/popupsSlice';
import { Button } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";

function PopupContainer({}) {

    const popups = useSelector(store => store.popups.popups);

    return (
        <div className='position-fixed bottom-0 w-100 d-flex justify-content-center align-items-center' style={{height:"150px",pointerEvents:"none"}}>
        {
            popups.map((popup)=>
                <Popup popup={popup} key={popup.id}/>
            )
        }
        </div>
    );
}

function Popup({popup})
{

    const [closed,setClosed] = useState(false);

    const dispatch = useDispatch();

    function onEnd(e)
    {
        console.log(e.animationName);
        if(e.animationName==="popup-animation" || e.animationName==="popup-close")
        dispatch(removePopup(popup.id));
    }

    return (
        <div className={`popup position-absolute d-flex align-items-center bg-black text-white text-center fs-5 p-2 px-5 pb-3 rounded-2 shadow ${closed ? "close" : ""}`} onAnimationEnd={onEnd}>
            <p className='m-0'>{popup.text}</p>
            <Button variant='dark' className='position-absolute top-0 d-flex align-items-center justify-content-center fs-6 m-2 p-1 rounded-2 border-white border-3 text-white' style={{right:0,aspectRatio:1,pointerEvents:"all"}} onClick={()=>setClosed(true)}>
                <IoCloseSharp />
            </Button>
        </div>
    )
}

export default PopupContainer;