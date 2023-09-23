import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Accordion, Button, Carousel, Col, Container, FloatingLabel, Form, Modal, Nav, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillEraserFill, BsFillPencilFill, BsPersonFill } from 'react-icons/bs';
import { FaSave } from "react-icons/fa";
import { deleteUser, editUser } from '../../Store/Auth/auth';
import { useNavigate } from 'react-router';
import { getDateString } from '../../helpers';

const schemas = [
    yup.object({

    email: yup.string().email("Email must be valid...").required("Please enter your email..."),

  }).required(),
  yup.object({

    firstName: yup.string().required("Please enter your First name..."),
    lastName: yup.string().required("Please enter your Last name..."),
    username: yup.string(),
    phone: yup.string().required("Please enter your Phone number..."),
    dateOfBirth: yup.date("Please enter valid date").required("Please enter your date of birth"),
    
  }).required(),
  yup.object({

    city: yup.string(),
    address: yup.string(),
    street: yup.string(),
    zipcode: yup.string(),
    creditCardNo: yup.string()
    
  }).required(),
 
]

const confirmDeleteSchema = yup.object({
    confirmDelete: yup.string().required()
}).required()

function ProfilePage({}) {

    const currentUser = useSelector((store) => store.auth.currentUser);
    const loading = useSelector((store) => store.auth.loading);
    const loggedInState = useSelector((store) => store.auth.loggedInState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(loggedInState==="no") navigate("/login");

    const users = useSelector((store) => store.auth.users);
    const [validationError,setValidationError] = useState("");

    const [navSelect,setNavSelect] = useState(1);
    const [edit,setEdit] = useState(false);

    const [userData,setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        dateOfBirth: 0,
        city: "",
        address: "",
        zipcode: "",
        street:"",
        creditCardNo: 0,
        id: 0
    });
    const [passwordEdit,setPasswordEdit] = useState({password: "", confirmPassword: ""});
    
    const { register: registerBasic, handleSubmit: handleSubmitBasic, reset: resetBasic, formState: { errors: errorsBasic }, setValue: setBasicValue } = useForm({ resolver: yupResolver(schemas[0]) });
    const { register: registerGeneral, handleSubmit: handleSubmitGeneral, reset: resetGeneral, formState: { errors: errorsGeneral }, setValue: setGeneralValue } = useForm({ resolver: yupResolver(schemas[1]) });
    const { register: registerExtra, handleSubmit: handleSubmitExtra, reset: resetExtra, formState: { errors: errorsExtra }, setValue: setExtraValue } = useForm({ resolver: yupResolver(schemas[2]) });
    const { register: registerConfirmDelete, handleSubmit: handleSubmitConfirmDelete, reset: resetConfirmDelete, formState: { errors: errorsConfirmDelete }, } = useForm({ resolver: yupResolver(confirmDeleteSchema) });

    const [deleteModal,setDeleteModal] = useState(false);
    const handleDeleteModalShow = () => setDeleteModal(true);
    const handleDeleteModalClose = () => setDeleteModal(false);

    function onSubmit(data)
    {
        
        let updatedUserData = {...userData,...data,password: passwordEdit.password};

        if(currentUser.email !== data.email && users.map((user) => user.email).includes(data.email))
        {
            handleValidationError("email");
            return;
        }
        else
        {
            if(data.username && users.map((user) => user.id!==currentUser.id && user.username).includes(data.username))
            {
                handleValidationError("username");
                return;
            }
            else
            {               
                if(currentUser.password!==passwordEdit.password && passwordEdit.password!==passwordEdit.confirmPassword)
                {
        
                    handleValidationError("passwordMismatch");
                    return;
                }
                else if(!passwordEdit.password)
                {
                    handleValidationError("passwordNull");
                    return;
                }
                else
                {
                    handleValidationError("");
                    if(typeof(updatedUserData.dateOfBirth)==="object") updatedUserData.dateOfBirth = getDateString(updatedUserData.dateOfBirth);
                    dispatch(editUser(updatedUserData));
                    setEdit(false);
                    setPasswordEdit({...passwordEdit,confirmPassword:""})
                }
            }
        }


       
    }

    function handleSelect(eventKey)
    {
        if(eventKey!==navSelect) discardEdit();
        setNavSelect(eventKey);
    }

    function discardEdit()
    {
        const setValue = [setBasicValue,setGeneralValue,setExtraValue];
        schemas.forEach((schema,index) => {
            Object.keys(schema.fields).forEach((key)=>{
                setValue[index](key,userData[key]);
            });
        });
        setEdit(false);
        setPasswordEdit({password: currentUser.password, confirmPassword: ""})
    }

    function handleValidationError(errorMessage)
    {
        setValidationError("");
        setTimeout(() => {
            setValidationError(errorMessage);
        }, 0);
    }

    function onSubmitConfirmDelete(data)
    {
        if(data.confirmDelete === `${currentUser.firstName}-${currentUser.password}`)
        {
            dispatch(deleteUser(currentUser.id));
            navigate("/");
        }
    }

    useEffect(()=>{
        if(currentUser)
        {
            let updatedUserData = userData;
            Object.keys(updatedUserData).forEach(key => {
                updatedUserData[key] = currentUser[key];
            });
            setUserData(updatedUserData);
            const setValue = [setBasicValue,setGeneralValue,setExtraValue];
            schemas.forEach((schema,index) => {
                Object.keys(schema.fields).forEach((key)=>{
                    if(updatedUserData[key])
                    {
                        setValue[index](key,updatedUserData[key]);
                    }
                });
            });
            setPasswordEdit({...passwordEdit,password:updatedUserData.password});
        }
    },[currentUser]);


    return (
        <div className='page-container bg-light p-sm-1 px-sm-3'>
            {
                (!loading && loggedInState==="yes") ?
                <>
                    <div className="d-flex ps-4 pt-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                        <BsPersonFill fontSize={"5rem"}/>
                        <div>
                            <h2 className='mt-5 mb-2'>Profile</h2>
                        </div>
                    </div>
                    <hr className='border-3 mb-3' />
                    <Container className='p-0 px-md-2'>
                        <div className='p-2 p-sm-3 p-md-4 gap-3 shadow rounded-sm-3'>
                            <Row className='m-0 gy-2 gy-sm-0 gx-3'>
                                <Col className='col-12 col-sm-3 p-0'>
                                    <Nav variant="pills" activeKey={navSelect} onSelect={handleSelect} className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link className='profile-nav-button' eventKey="1" ><p className='text-dark m-0'>Account</p> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='profile-nav-button' eventKey="2" ><p className='text-dark m-0'>General Info</p> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='profile-nav-button' eventKey="3" ><p className='text-dark m-0'>Address and Payment</p></Nav.Link>
                                    </Nav.Item>
                                    </Nav>                
                                </Col>
                                <hr className='d-block d-sm-none border-2'/>
                                <Col className='col-12 col-sm-9 p-0 ps-sm-3'>
                                    <div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <div>
                                                <h3>{["Account","General Info","Address and Payment"][navSelect-1]}</h3>
                                            </div>
                                            <div className='d-flex gap-2 align-items-center text-primary gap-1'>
                                            {
                                                edit ?
                                                <>
                                                    <Button variant='danger' className='d-flex align-items-center gap-2 p-1 px-2 border-0 main-button' onClick={()=>{discardEdit()}}><BsFillEraserFill /> Discard </Button>
                                                    <Button variant='success' type='submit' form={`profile-form-${navSelect}`} className='d-flex align-items-center gap-2 p-1 px-2 border-0 main-button'><FaSave /> Save Changes </Button>
                                                </>
                                                :
                                                <Button variant='primary' className='d-flex align-items-center gap-2 p-1 px-2 border-0 main-button' onClick={()=>{setEdit(!edit)}}><BsFillPencilFill /> Edit </Button>
                                            }
                                            </div>
                                        </div>
                                        <Carousel className='w-100' controls={false} indicators={false} fade={"true"} activeIndex={+navSelect-1}>
                                            <Carousel.Item>
                                                <form id='profile-form-1' onSubmit={handleSubmitBasic(onSubmit)} className="d-flex bg-light flex-column gap-3 p-1">
                                                    <FloatingLabel controlId="floatingEmail" label="Email">
                                                        <Form.Control disabled={!edit} type="email" placeholder="Email" {...registerBasic("email")} />
                                                        {errorsBasic.email ? <div className='error-message text-danger mt-2'>{errorsBasic.email.message}</div> : ''}
                                                        {validationError==="email" && <div className='error-message text-danger mt-2'>Email already registered...</div>}
                                                    </FloatingLabel>

                                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                                        <Form.Control disabled={!edit} type="password" placeholder="Password" 
                                                        // {...registerBasic("password")}
                                                        value={passwordEdit.password} onChange={(e)=>{setPasswordEdit({...passwordEdit,password:e.target.value});}}
                                                            />
                                                        {errorsBasic.password ? <div className='error-message text-danger mt-2'>{errorsBasic.password.message}</div> : ''}
                                                        {validationError==="passwordNull" && <div className='error-message text-danger mt-2'>Please enter a password...</div>}
                                                    </FloatingLabel>

                                                    {
                                                            currentUser && passwordEdit.password !== currentUser.password &&

                                                        <FloatingLabel controlId="floatingconfirmPassword" label="Confirm Password">
                                                            <Form.Control disabled={!edit} type="confirmpassword" placeholder="Confirm Password" 
                                                            value={passwordEdit.confirmPassword} onChange={(e)=>{setPasswordEdit({...passwordEdit,confirmPassword:e.target.value});}}
                                                            />
                                                            {errorsBasic.confirmPassword ? <div className='error-message text-danger mt-2'>{errorsBasic.confirmPassword.message}</div> : ''}
                                                            {validationError==="passwordMismatch" && <div className='error-message text-danger mt-2'>Password Mismatch...</div>}

                                                        </FloatingLabel>
                                                    }
                                                    
                                                    <div className="d-flex justify-content-end align-items-end" style={{height:"150px"}}>
                                                        <Button variant='danger' className='border-0 main-button' onClick={()=>{handleDeleteModalShow();}}>Delete Account</Button>
                                                    </div>
                                                </form>
                                            </Carousel.Item>

                                            <Carousel.Item>
                                                <form id='profile-form-2' onSubmit={handleSubmitGeneral(onSubmit)} className="d-flex bg-light flex-column gap-3 p-1">
                                                    <div className="d-flex w-100 gap-3">
                                                        <FloatingLabel className='w-50' controlId="floatingFirstName" label="First Name">
                                                            <Form.Control disabled={!edit} type="text" placeholder="First Name" {...registerGeneral("firstName")} />
                                                            {errorsGeneral.firstName ? <div className='error-message text-danger mt-2'>{errorsGeneral.firstName.message}</div> : ''}
                                                        </FloatingLabel>

                                                        <FloatingLabel className='w-50' controlId="floatingLastName" label="Last Name">
                                                            <Form.Control disabled={!edit} type="text" placeholder="Last Name" {...registerGeneral("lastName")} />
                                                            {errorsGeneral.lastName ? <div className='error-message text-danger mt-2'>{errorsGeneral.lastName.message}</div> : ''}
                                                        </FloatingLabel>
                                                    </div>
                                                    
                                                    <FloatingLabel controlId="floatingUsername" label="Username">
                                                        <Form.Control disabled={!edit} type="text" placeholder="Username" {...registerGeneral("username")} />
                                                        {errorsGeneral.username ? <div className='error-message text-danger mt-2'>{errorsGeneral.username.message}</div> : ''}
                                                    </FloatingLabel>

                                                    <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
                                                        <Form.Control disabled={!edit} type="text" placeholder="Phone Number" {...registerGeneral("phone")} />
                                                        {errorsGeneral.phone ? <div className='error-message text-danger mt-2'>{errorsGeneral.phone.message}</div> : ''}
                                                    </FloatingLabel>

                                                    <FloatingLabel controlId="floatingDateOfBirth" label="Date of Birth">
                                                        <Form.Control disabled={!edit} type="date" placeholder="Date of Birth" {...registerGeneral("dateOfBirth")} />
                                                        {errorsGeneral.dateOfBirth ? <div className='error-message text-danger mt-2'>{errorsGeneral.dateOfBirth.message}</div> : ''}
                                                    </FloatingLabel>
                                                </form>
                                            </Carousel.Item>

                                            <Carousel.Item>
                                                <form id='profile-form-3' onSubmit={handleSubmitExtra(onSubmit)} className="d-flex bg-light flex-column gap-3 p-1">   
                                                    <div className="d-flex w-100 gap-3">  
                                                        <FloatingLabel className='w-50' controlId="floatingCity" label="City">
                                                            <Form.Control disabled={!edit} type="text" placeholder="City" {...registerExtra("city")} />
                                                            {errorsExtra.city ? <div className='error-message text-danger mt-2'>{errorsExtra.city.message}</div> : ''}
                                                        </FloatingLabel>

                                                        <FloatingLabel className='w-50' controlId="floatingZipcode" label="Zipcode">
                                                            <Form.Control disabled={!edit} type="text" placeholder="Zipcode" {...registerExtra("zipcode")} />
                                                            {errorsExtra.zipcode ? <div className='error-message text-danger mt-2'>{errorsExtra.zipcode.message}</div> : ''}
                                                        </FloatingLabel>
                                                    </div>
                                                    
                                                    <FloatingLabel controlId="floatingAddress" label="Address">
                                                        <Form.Control disabled={!edit} type="text" placeholder="Address" {...registerExtra("address")} />
                                                        {errorsExtra.address ? <div className='error-message text-danger mt-2'>{errorsExtra.address.message}</div> : ''}
                                                    </FloatingLabel>

                                                    <FloatingLabel controlId="floatingStreet" label="Street">
                                                        <Form.Control disabled={!edit} type="text" placeholder="Street" {...registerExtra("street")} />
                                                        {errorsExtra.street ? <div className='error-message text-danger mt-2'>{errorsExtra.street.message}</div> : ''}
                                                    </FloatingLabel>


                                                    <FloatingLabel controlId="floatingCreditCardNo" label="Credit Card Number">
                                                        <Form.Control disabled={!edit} type="number" placeholder="Credit Card Number" {...registerExtra("creditCardNo")} />
                                                        {errorsExtra.creditCardNo ? <div className='error-message text-danger mt-2'>{errorsExtra.creditCardNo.message}</div> : ''}
                                                    </FloatingLabel>
                                                </form>
                                            </Carousel.Item>
                                        </Carousel>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>


                    <Modal show={deleteModal} onHide={handleDeleteModalClose} centered={true} className='bg-transparent'>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-capitalize'>Delete Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="d-flex flex-column align-items-center gap-3" onSubmit={handleSubmitConfirmDelete(onSubmitConfirmDelete)}>
                                <strong className='text-danger text-center'>HOLD UP! You are going to delete your account! You will lose all your stored cart, favorites, and purchase history.</strong>
                                <p className='m-0 mt-3 text-center'>If you are sure, please enter your first name and password. <br /> (Ex: "Omar-123")</p>
                                <Form.Control type="text" {...registerConfirmDelete("confirmDelete")}/>
                                <Button className='w-100 border-0 main-button' variant='danger' type='submit'>Delete Account</Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </>
                :
                <div className=' d-flex flex-column align-items-center align-items-md-start gap-2'>
                    <div className="loading-bg rounded-3 mb-4" style={{height:"5rem",width:"15rem",marginTop:"6rem"}}></div>
                    <div className="loading-bg rounded-sm-3 w-100" style={{height:"25rem"}}></div>
                </div>
            }

        </div>
    );
}

export default ProfilePage;