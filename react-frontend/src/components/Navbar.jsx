import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../envision.png";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Navbar() {
    const [showBasic, setShowBasic] = useState(false);
    return (
        <MDBNavbar expand='lg' light bgColor='light' >
            <MDBContainer fluid >
                <MDBNavbarBrand href='#'>
                            <img
                                src={require('../envision.png')}
                                className='img'
                            />
                            <p id="transcript">
                                <button class="button1" onClick={SpeechRecognition.startListening}>Click me</button> </p>
                        </MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        {/* <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='/Home'>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='#'>
                                Market Place
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='/Jobs'>
                                Jobs
                            </MDBNavbarLink>
                        </MDBNavbarItem> */}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
            <MDBContainer tag="form" fluid className='justify-content-end'>
                <MDBBtn outline color="success" className='me-2' type='button' href='/Login2'>
                    Login
                </MDBBtn>
                <MDBBtn outline color="secondary" size="sm" type='button' href='/Signup2'>
                    Signup
                </MDBBtn>
            </MDBContainer>
        </MDBNavbar>
    );
}
