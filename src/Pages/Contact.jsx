import React, { useEffect, useState } from 'react';
import { Accordion, Button, Carousel, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareTwitter, FaSquareWhatsapp, FaSquareYoutube } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';


const schema = yup
  .object({
    name: yup.string().required("Please enter your name..."),
    email: yup.string().email("Email must be valid...").required("Please enter your email..."),
    subject: yup.string().required("Please enter message subject"),
    body: yup.string().required("Please enter message body")
})
.required();

function Contact({}) {

    const [formMessage,setFormMessage] = useState();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    function onSubmit(data)
    {
        reset();
        setFormMessage("Message sent!");
    }

    const faqs = [
        {
            q: "How do I place an order on your website?",
            a: "To place an order, simply browse our products, select the item(s) you wish to purchase, add them to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information, and confirm your order."
        },
        {
            q: "How long does it take to process and deliver an order?",
            a: "We strive to process and deliver orders as quickly as possible. Typically, orders are processed within 1-3 business days. Delivery times vary depending on your location."
        },
        {
            q: "What are your delivery options and costs?",
            a: "We offer standard and express delivery options. You can select Express for faster delivery, but it comes with additional fees"
        },
        {
            q: "What is your return policy?",
            a: "We have a flexible return policy. If you are not satisfied with your purchase, you can return the item within 30 days of delivery for a refund or exchange. Please review our Returns & Exchanges page for detailed instructions and any specific criteria that may apply."
        },
        {
            q: "How do I initiate a return or exchange?",
            a: "To initiate a return or exchange, please contact our customer support team through our designated channels. They will guide you through the process, provide you with a return shipping label if applicable, and assist with any further inquiries."
        },
        {
            q: "Can I place an order over the phone?",
            a: "Currently, we only accept orders placed through our website or at our branches. Our online ordering process is secure, convenient, and designed to provide you with the best shopping experience."
        },
        {
            q: "Do you offer a warranty on your products?",
            a: "Yes, we offer warranties on all of our products. The duration and coverage of the warranty may vary depending on the manufacturer and specific product. For detailed information about the warranty for a particular item, please refer to the product description or contact our customer support team."
        },
        {
            q: "What should I do if I receive a defective or damaged product?",
            a: "We apologize for any inconvenience caused. If you receive a defective or damaged product, please contact our customer support team immediately. We will guide you through the return/exchange process and ensure that you receive a replacement or refund as quickly as possible."
        },
        {
            q: "What are your customer service hours?",
            a: "Our customer service team is available 20 Hours a day, 7 Days a week, to assist you with any inquiries or concerns you may have. Please feel free to reach out to us during our business hours, and we'll be happy to help."
        },
        {
            q: "Do you offer bulk or corporate discounts?",
            a: "Yes, we offer bulk or corporate discounts for qualifying orders. If you are interested in making a bulk purchase or have specific corporate requirements, please contact our sales team at asr-digitals-sales@gmail.com. They will assist you with pricing, availability, and any special arrangements that may apply."
        },
        {
            q: "Can I change the shipping address for my order?",
            a: "If you need to change the shipping address for your order, please contact our customer support team as soon as possible. We will do our best to accommodate your request if the order has not been shipped yet. However, please note that once the order has been shipped, we may not be able to modify the shipping address."
        },
        {
            q: "How can I contact technical support for a product issue?",
            a: "If you are experiencing a technical issue with a product you purchased from us, please reach out to our technical support team at @asr-digitals-support@gmail.com or call our dedicated technical support hotline at +201028549449. Our skilled technicians will assist you in troubleshooting and resolving the issue."
        },
        {
            q: "Do you have a physical store or showroom",
            a: "Yes, we have four branches where you can buy our products. Please refer to our Home Page to find the nearest branch to you."
        },
        {
            q: "Are all products on your website brand new?",
            a: "Yes, all products featured on our website are brand new unless otherwise specified. We source our products directly from reputable manufacturers and authorized distributors to ensure their authenticity and quality.",
        },
        {
            q: "Do you provide product recommendations or consultations?",
            a: "Absolutely! Our team of experts is available to provide personalized product recommendations and consultations. If you need assistance in finding the right product for your specific needs, please reach out to our customer support team. Provide us with details about your requirements, preferences, and budget, and we will be happy to assist you in making an informed decision."
        }
    ]

    const socialMedia = [
        {
            icon: <FaSquareFacebook color='var(--bs-light)' fontSize={"min(4rem,20vw)"} />,
            color: "linear-gradient(to right, rgb(50,170,255), rgb(13,110,253))",
            link: "https://facebook.com"
        },
        {
            icon: <FaSquareYoutube color='var(--bs-light)' fontSize={"min(4rem,20vw)"} />,
            color: "linear-gradient(to right, #e54757, #b82c3a)",
            link: "https://youtube.com"
        },
        {
            icon: <FaSquareWhatsapp color='var(--bs-light)' fontSize={"min(4rem,20vw)"} />,
            color: "linear-gradient(to right, rgb(101, 223, 101), rgb(39, 176, 39))",
            link: "https://whatsapp.com"
        },
        {
            icon: <FaSquareTwitter color='var(--bs-light)' fontSize={"min(4rem,20vw)"} />,
            color: "linear-gradient(to right, rgb(124, 222, 255), deepskyblue)",
            link: "https://twitter.com"
        },
        {
            icon: <FaSquareInstagram color='var(--bs-light)' fontSize={"min(4rem,20vw)"} />,
            color: "linear-gradient(45deg, yellow, orange 20%, magenta)",
            link: "https://instagram.com"
        },
        {
            icon: <FaLinkedin color='var(--bs-light)' fontSize={"min(4rem,20vw)"} />,
            color: "linear-gradient(to right, rgb(106, 97, 169), darkslateblue)",
            link: "https://linkedin.com"
        }
    ]

    const [faqSearch,setFaqSearch] = useState("");
    const [faqIndex,setFaqIndex] = useState(0);
    const [filteredFaqs,setFilteredFaqs] = useState(faqs);

    useEffect(()=>{
        setFilteredFaqs(faqSearch ? faqs.filter((faq)=>(`${faq.q} ${faq.a}`).toLowerCase().includes(faqSearch.toLowerCase())) : faqs);
        if(faqSearch) setFaqIndex(0);
    },[faqSearch])

    return (
        <div className='page-container bg-white'>
             <header className='contact-header-bg d-flex align-items-center justify-content-center pb-5' style={{minHeight:"450px"}}>
                <Container className='m-2 m-md-5 d-flex justify-content-center justify-content-sm-start'>
                    <div className='header-content text-white m-0 d-flex flex-column gap-3 align-items-center'>
                        <h1 className='text-center'>Get in Touch</h1>
                        <p className='text-center fs-5'>We'd love to hear from you! Whether you have a question, need assistance, or simply want to share feedback, our team is here to help.</p>
                    </div>
                </Container>
            </header>

            <section>
                <div className="d-flex flex-column flex-md-row">
                    <div className="w-xs-100 w-md-50 py-5">
                        <Container className='px-3 px-md-4 px-lg-5 py-5 pb-2 pb-md-5'>
                            <h1 className='mb-4 text-center text-md-start'>Reach us easily</h1>
                            <p className='fs-5'>
                                You can reach us via email at <b>asr-digitals@gmail.com</b>, and our dedicated support team will respond to your inquiries promptly.
                            </p>
                            <p className='fs-5'>
                                Or if you prefer to speak with us directly, please feel free to call our customer service hotline at <b>+201028549449</b>. Our knowledgeable representatives are available <b>24/7</b> to assist you.
                            </p>
                        </Container>
                    </div>
                    <div className='contact-bg-1 w-xs-100 w-md-50'></div>
                </div>
            </section>

            <section>
                <div className="w-100 py-5 bg-img-7" style={{boxShadow:" 0 0 20px rgb(195, 195, 210)"}}>
                    <Container className='px-3 px-md-5 py-5'>
                        <h1 className='mb-4 text-center text-md-start'>Frequently Asked Questions (FAQ)</h1>
                        <p className='fs-5'>
                            Check our FAQ list to find the answer to any inquiry. <br /> If you don't find your question, you can write to us directly via email at <b>asr-digitals-support@gmail.com</b>.
                        </p>
                        <Form.Control type="search" placeholder="What's your inquiry?" value={faqSearch} onChange={(e)=>{setFaqSearch(e.target.value)}} />
                        <Carousel className='w-100 overflow-visible' slide={false} controls={false} indicators={false} activeIndex={faqIndex}>
                        {
                            Array.from({length:Math.ceil(faqs.length/5)}).map((p,i)=>
                            <Carousel.Item key={`faq-slide-${i}`}>
                                <Accordion flush className='mb-4 mt-4 m-0 w-100'>
                                {
                                    filteredFaqs.slice(5*i,5*i+5).map((faq, j) => (

                                    <Accordion.Item key={`faq-${i}-${j}`} eventKey={j} className='border-0 rounded-3 mb-2 rounded-bottom shadow'>
                                        <Accordion.Header className='px-4 py-3 rounded-top '><h5 className='m-0'>{faq.q}</h5></Accordion.Header>
                                        <Accordion.Body className='border-top border-2 rounded-bottom fs-5'>{faq.a}</Accordion.Body>
                                    </Accordion.Item>
                                    ))
                                }
                                </Accordion>
                            </Carousel.Item>
                            )
                        }
                        </Carousel>
                        <div className="d-flex align-items-center justify-content-start w-100 gap-3">
                        {
                            Array.from({length:Math.ceil(filteredFaqs.length/5)}).map((p,i)=>
                            <Button className={`d-flex rounded-0 bg-transparent text-primary border-0 border-top border-3 p-3 fs-5 py-0 ${faqIndex===i ? "border-primary" : ""}`} key={`faq-button-${i}`} onClick={(e)=>{setFaqIndex(i)}}>{i+1}</Button>
                            )
                        }
                        </div>
                    </Container>
                </div>
            </section>

            <section>
                <div className="d-flex flex-column flex-md-row">
                    <div className="w-xs-100 w-md-50 contact-bg-2 order-1 order-md-0"></div>
                    <div className="w-xs-100 w-md-50">
                        <Container className='px-3 px-md-5 py-5'>
                            <h1 className='mb-4 text-center text-md-start'>Customer Support</h1>
                            <p className='fs-5'>
                                Our Customer Support Team is available for help in case of any issues or inquiries you might have.
                            </p>
                            <p className='fs-5'>
                                We are always dedicated to providing you with the best possible assistance. Whether you have a question about a product, need help with an order, or require technical support, we are here to lend a hand. Please don't hesitate to get in touch, and we'll do our utmost to resolve your query promptly and satisfactorily.
                            </p>
                        </Container>
                    </div>
                </div>
            </section>

            

            <section>
                <div className="w-100 py-5 contact-bg-4" style={{boxShadow:" 0 0 20px rgb(195, 195, 210)"}}>
                    <Container className='px-3 px-md-5 py-5'>
                        <h1 className='text-center text-sm-start'>Feedback and Suggestions</h1>
                        <p className='fs-5'> Your input is essential in shaping our offerings and ensuring that we meet your expectations. Please feel free to reach out and share your thoughts with us.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className='bg-light p-2 p-md-3 shadow rounded-3 d-flex flex-column gap-2 gap-md-3'>
                            <div className="d-flex gap-2 gap-md-3">

                                <FloatingLabel className='w-100 z-0' controlId="" label="Name">
                                    <Form.Control type="text" placeholder="Name" {...register("name")} />
                                    {errors.name ? <div className='error-message text-danger mt-2'>{errors.name.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel className='w-100 z-0' controlId="" label="Email">
                                    <Form.Control type="email" placeholder="Email" {...register("email")} />
                                    {errors.email ? <div className='error-message text-danger mt-2'>{errors.email.message}</div> : ''}
                                </FloatingLabel>
                            </div>

                            <FloatingLabel className='w-100 z-0' controlId="" label="Message Subject">
                                <Form.Control type="text" placeholder="Message Subject" {...register("subject")} />
                                {errors.subject ? <div className='error-message text-danger mt-2'>{errors.subject.message}</div> : ''}
                            </FloatingLabel>

                            <FloatingLabel className='w-100 z-0' controlId="" label="Message Body">
                                <Form.Control style={{minHeight:"300px"}} as={"textarea"} type="text" placeholder="Message Body" {...register("body")} />
                                {errors.body ? <div className='error-message text-danger mt-2'>{errors.body.message}</div> : ''}
                            </FloatingLabel>

                            {formMessage && <p className='text-info'>{formMessage}</p>}
                            <Button variant='btn-secondary' className='main-button bg-primary border-0 d-flex align-items-center justify-content-center gap-2 fs-5' type='submit'>Send <IoSend/></Button>
                        </form>
                    </Container>
                </div>
            </section>

            <section>
                <div className="d-flex flex-column flex-md-row">
                    <div className="w-xs-100 w-md-50">
                        <Container className='px-3 px-md-5 py-5 my-5'>
                            <h1 className='mb-4 text-center text-md-start'>Business Inquiries</h1>
                            <p className='fs-5'>
                                For business-related inquiries, partnerships, or collaborations, please contact our business development team at <b>asr-digitals-marketing@gmail.com</b>. We are always open to exploring new opportunities and working with like-minded individuals and organizations.
                            </p>
                        </Container>
                    </div>
                    <div className='contact-bg-3 w-xs-100 w-md-50'></div>
                </div>
            </section>

            <section>
                <div className="d-flex contact-bg-5 justify-content-center text-center" style={{boxShadow:" 0 0 20px rgb(195, 195, 210)"}}>
                    <div className="w-100">
                        <Container className='px-3 px-md-5 py-5'>
                            <h1 className='mb-4 text-center'>Social Media</h1>
                            <p className='fs-5'>
                                Stay connected with us on social media! Follow us on your favorite platforms to receive updates on new products, promotions, and company news. Our social media channels are also a great place to engage with our community and share your experiences.
                            </p>
                            <Row className='gy-4 mt-2'>
                            {
                                socialMedia.map((s,i) =>
                                <Col className='col-4 col-md-2' key={`social-media-card-${i}`}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <Link to={s.link}>
                                            <div className='p-2 rounded-4 shadow-sm' style={{background:s.color}} >
                                                {s.icon}
                                            </div>
                                        </Link>
                                    </div>
                                </Col>
                                )
                            }
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;