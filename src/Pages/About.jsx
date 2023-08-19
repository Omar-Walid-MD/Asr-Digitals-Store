import React from 'react';
import { Container } from 'react-bootstrap';

function About({}) {

    return (
        <div className='page-container bg-white'>
            <header className='homepage-header pt-5 pt-md-0 d-flex align-items-center justify-content-center pb-5' style={{minHeight:"450px"}}>
                <Container className='m-2 m-md-5 d-flex justify-content-center justify-content-sm-start'>
                    <div className='header-content text-white m-0 d-flex flex-column gap-3 align-items-center'>
                        <h1 className='text-center'>About Us</h1>
                        <p className='text-center fs-5 fw-bold'>
                            Welcome to [Website Name], your ultimate destination for cutting-edge electronic devices. We are passionate about technology and strive to provide our customers with the latest everyday devices including smartphones, laptops, tablets, and more. <br /> <br /> As technology enthusiasts ourselves, we understand the importance of staying connected in today's fast-paced world. With our wide range of products and exceptional customer service, we aim to make your shopping experience a seamless and enjoyable one.
                        </p>
                    </div>
                </Container>
            </header>

           <section>
                <div className="d-flex flex-column flex-md-row">
                    <div className="w-xs-100 w-md-50">
                        <Container className='px-3 px-md-4 px-lg-5 py-5 pb-2 pb-md-5'>
                            <h1 className='mb-4 text-center text-md-start'>Our Mission</h1>
                            <p className='fs-5'>
                                At [Website Name], our mission is to empower individuals and businesses by offering top-quality electronic devices that enhance productivity, connectivity, and entertainment. <br /> <br /> We believe in delivering innovative solutions that simplify your daily life, whether you're a student, professional, or tech-savvy individual. Our team carefully curates a diverse selection of devices from renowned brands, ensuring that you have access to the best-in-class products that meet your unique needs.
                            </p>
                        </Container>
                    </div>
                    <div className='about-bg-1 w-xs-100 w-md-50'></div>
                </div>
            </section>

            <section>
                <div className="d-flex flex-column flex-md-row justify-content-md-end position-relative z-0 overflow-hidden">
                    <div className="w-xs-100 about-bg-2 position-absolute top-0 h-100"></div>
                    <div className="w-xs-100 w-md-50">
                        <Container className='px-3 px-md-4 px-lg-5 py-5 text-white'>
                            <h1 className='mb-4 text-center text-md-start'>Product Quality</h1>
                            <p className='fs-5'>
                                We take great pride in offering only the highest quality electronic devices. Each product featured on our website undergoes rigorous testing and evaluation to ensure its performance, durability, and reliability. <br /> <br /> We collaborate closely with trusted manufacturers and suppliers to source genuine and authentic devices, providing you with peace of mind and value for your investment. Our commitment to quality extends beyond the products themselves to the overall shopping experience we offer.
                            </p>
                        </Container>
                    </div>
                </div>
            </section>

            <section>
                <div className="d-flex flex-column flex-md-row position-relative z-0">
                    <div className="w-xs-100 w-md-50">
                        <Container className='px-3 px-md-4 px-lg-5 py-5 pb-2 pb-md-5'>
                            <h1 className='mb-4 text-center text-md-start'>Expert Guidance</h1>
                            <p className='fs-5'>
                                Navigating the world of electronic devices can be overwhelming, especially with the constant advancements in technology. That's why our team of knowledgeable experts is here to guide you every step of the way. <br /> <br /> Whether you have questions about specific features, compatibility, or need recommendations, we are dedicated to providing you with accurate and up-to-date information. <br /> <br /> We believe in empowering our customers with the knowledge they need to make informed decisions and find the perfect device that meets their requirements.
                            </p>
                        </Container>
                    </div>
                    <div className='w-xs-100 w-md-50 right-0 about-bg-3'></div>
                </div>
            </section>
            
            <section>
                <div className=" d-flex flex-column align-items-center justify-content-center flex-md-row position-relative z-0 overflow-hidden" style={{minHeight:"500px"}}>
                <div className="w-xs-100 about-bg-4 position-absolute top-0 h-100"></div>
                    <div className="w-100 text-center text-white">
                        <Container className='px-3 px-md-4 px-lg-5 py-5'>
                            <h1 className='mb-4 text-center'>Customer Satisfaction</h1>
                            <p className='fs-5'>
                                Your satisfaction is our top priority. We strive to exceed your expectations by offering exceptional customer service throughout your shopping journey. <br /> <br /> From pre-purchase inquiries to post-sale support, our friendly and responsive team is always ready to assist you. We value your feedback and continuously work towards enhancing our services to ensure that you have a seamless and enjoyable experience with us.
                            </p>
                            <p className='fs-5 fw-semibold'>
                                Your trust in our brand is of utmost importance, and we are committed to building long-lasting relationships with our customers.
                            </p>
                        </Container>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default About;