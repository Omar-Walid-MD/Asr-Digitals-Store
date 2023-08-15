import React, { useEffect, useRef, useState } from 'react';

function TwoRangeSlider({minLimit=0, maxLimit=100, minValue=0, maxValue=100, setMin, setMax, snap=1, labelClassName=""}) {

    const rangeSlider = useRef();

    function handleMin(e)
    {
        if(+e.target.value < maxValue) setMin(+e.target.value-e.target.value%snap);
        else setMin(maxValue);
        console.log(e.target.value);
    }
    function handleMax(e)
    {
        if(+e.target.value >= minValue) setMax(+e.target.value-e.target.value%snap);
        else setMax(minValue);
        console.log(e.target.value);
    }

    // useEffect(()=>{
    //     if(rangeSlider.current)
    //     {
    //         rangeSlider.current.querySelectorAll("input").forEach(input => {
    //             // input.addEventListener("hover",()=>{
    //             //     input.parentElement.appendChild(input);
    //             // });
    //         });
    //     }
    // },[rangeSlider])

    const m = 1.5;

    return (
        <div>
            <div className="two-range-slider position-relative d-flex align-items-center" ref={rangeSlider}>
                <div className='bg-bar w-100 position-absolute rounded-pill shadow-sm border'></div>
                <div className='position-absolute bar' style={{left: `${(m + minValue/maxLimit*(100 - 2*m) )}%`, right: `${(-m+ (100-maxValue/maxLimit*(100 - 2*m)))}%`}}></div>
                <input className='position-absolute w-100' type="range" min={minLimit} max={maxLimit} value={maxValue} onChange={handleMax} />
                <input className='w-100' type="range" min={minLimit} max={maxLimit} value={minValue} onChange={handleMin} />
            </div>
            <div className={`d-flex justify-content-between fs-5 mt-1 ${labelClassName}`}>
                <span>{minValue}</span>
                <span>{maxValue}</span>
            </div>
        </div>
    );
}

export default TwoRangeSlider;