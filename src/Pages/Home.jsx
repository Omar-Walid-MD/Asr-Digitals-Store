import React from 'react';

function Home({}) {

    const style = {
        header: {
            height: "700px"
        },
        section: {
            height: "400px"
        }
    }

    return (
        <div>
            <header className='bg-secondary' style={style.header}></header>
            <section className='bg-white' style={style.section}></section>
            <section className='bg-secondary' style={style.section}></section>
            <section className='bg-white' style={style.section}></section>
            <section className='bg-secondary' style={style.section}></section>
        </div>
    );
}

export default Home;