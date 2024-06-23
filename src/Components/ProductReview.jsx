import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { database } from '../Firebase/firebase';
function ProductReview({review})
{
    const [username,setUsername] = useState("");

    useEffect(()=>{
        if(!username)
        {
            (async()=>{
                await get(child(ref(database), `users/${review.userId}`)).then(async (snapshot) => {
                    if(snapshot.exists())
                    {
                        const user = snapshot.val();
                        setUsername(user.username || `${user.firstName} ${user.lastName}`)
                    }
                    else
                    {
                        setUsername("Anonymous")
                    }
               });
            })()
        }
    },[username])
    
    return (
        <div className="w-100 bg-white-gradient border-3 border-bottom border-secondary-subtle rounded-3 p-3 shadow-sm">
            <div className="d-flex flex-column flex-sm-start align-items-start gap-2">
                <div className='d-flex align-items-start gap-2'>
                    <BsFillPersonFill className='bg-light rounded-3 fs-1 shadow-sm border border-2 border-dark' />
                    <div className="d-flex flex-column">
                        <h6 className='m-0'>{username}</h6>
                        <p className='m-0'>{new Date(review.date).toLocaleDateString("en")}</p>
                    </div>
                </div>
                <div className='d-flex ms-sm-3 gap-1 shadow-sm p-2 rounded-pill'>
                    {
                        [1,2,3,4,5].map((n) =>
                            <BsStarFill key={`product-review-rating-${n}`} className={n <= review.rating ? "text-warning" : "text-dark"} />
                        )
                    }
                </div>
            </div>
            <hr />
            <div className='d-flex flex-column mt-2'>
                <h4>{review.title}</h4>
                <div className="d-flex flex-column align-items-start mt-1 gap-4">
                    <p className='m-0'>{review.body}</p>
                    <div>
                        {review.pros && <p className='m-0 mb-2 text-success fw-semibold'>Pros: {review.pros}</p>}
                        {review.cons && <p className='m-0 text-danger fw-semibold'>Cons: {review.cons}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReview;