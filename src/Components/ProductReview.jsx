import React from 'react';
import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
function ProductReview({}) {
    return (
        <div className="d-flex gap-4 align-items-start w-100 border-3 border-bottom border-secondary rounded-3 p-3 shadow">
            <div className="d-flex gap-2 align-items-center">
                <BsFillPersonFill className='bg-light rounded-3 fs-1 shadow' />
                <div className="d-flex flex-column">
                    <h6 className='m-0'>Username</h6>
                    <p className='m-0'>00/00/0000</p>
                </div>
            </div>
            <div className='d-flex flex-column align-items-start'>
                <h4 className=''>I like it</h4>
                <div className='d-flex gap-1 shadow-sm p-2 rounded-pill'><BsStarFill className='text-warning' /><BsStarFill className='text-warning' /><BsStarFill className='text-warning' /><BsStarFill /><BsStarFill /></div>
                <p className='mt-3 m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat temporibus illum ad. Velit, in eos. Deleniti repudiandae corrupti vitae voluptatem eius mollitia reprehenderit aliquid harum magni commodi. Totam, sequi adipisci?</p>
            </div>
        </div>
    );
}

export default ProductReview;