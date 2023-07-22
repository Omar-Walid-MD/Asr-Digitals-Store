import React from 'react';
import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
function ProductReview({}) {
    return (
        <div className="w-100 bg-secondary p-3 rounded-4">
            <div className="d-flex gap-2 align-items-center">
                <BsFillPersonFill className='bg-light rounded-3 fs-1' />
                <h6 className='m-0'>Username</h6>
                <p className='m-0'>00/00/0000</p>
            </div>
            <h3 className='mt-4'>I like it</h3>
            <div className='d-flex gap-1'><BsStarFill className='text-warning' /><BsStarFill className='text-warning' /><BsStarFill className='text-warning' /><BsStarFill /><BsStarFill /></div>
            <p className='fw-semibold mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat temporibus illum ad. Velit, in eos. Deleniti repudiandae corrupti vitae voluptatem eius mollitia reprehenderit aliquid harum magni commodi. Totam, sequi adipisci?</p>
        </div>
    );
}

export default ProductReview;