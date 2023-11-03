import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";
import useSpeechToText from "react-hook-speech-to-text";

function Signup2() {
    const {
        error,
        interimResult,
        results,
        isRecording,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: false,
        useLegacyResults: false,
    });

    const [formData, setFormData] = useState({
        name: "",
        birthYear: "",
        email: "",
        disability: "",
        password: "",
        confirmPassword: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const activeInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleEmailSpeechToText = () => {
        if (!isRecording) {
            activeInputRef.current = "email";
            startSpeechToText();
        } else {
            stopSpeechToText();
        }
    };

    const handleDisabilitySpeechToText = () => {
        if (!isRecording) {
            activeInputRef.current = "disability";
            startSpeechToText();
        } else {
            stopSpeechToText();
        }
    };

    const handlePasswordSpeechToText = () => {
        if (!isRecording) {
            activeInputRef.current = "password";
            startSpeechToText();
        } else {
            stopSpeechToText();
        }
    };

    

    const handleSpeechRecognitionResult = () => {
        if (results) {
            results.forEach((result) => {
                let transcript = result.transcript;
                transcript = transcript.trim();
                if (activeInputRef.current === "email") {
                    // Correct the transcribed "at the rate" to "@"
                    transcript = transcript.replace(/at the rate/g, "@");
                    setFormData({
                        ...formData,
                        email: formData.email + transcript + " ",
                    });
                } else if (activeInputRef.current === "disability") {
                    setFormData({
                        ...formData,
                        disability: formData.disability + transcript + " ",
                    });
                } else if (activeInputRef.current === "password") {
                    setFormData({
                        ...formData,
                        password: formData.password + transcript + " ",
                    });
                }
            });
        }
    };

    useEffect(() => {
        handleSpeechRecognitionResult();
    }, [results]);

    useEffect(() => {
        if (selectedFile) {
            var fileData = new FormData();
            fileData.append("input_file", selectedFile);
            var requestOptions = {
                method: "POST",
                body: fileData,
                redirect: "follow",
            };

            fetch(
                "https://394c-103-207-59-68.ngrok-free.app/verify",
                requestOptions
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("API request failed");
                    }
                })
                .then((data) => {
                    if (data.status === "Authorized") {
                        setFormData({
                            ...formData,
                            name: data.name,
                            birthYear: data.year,
                        });
                        setIsDisabled(true);
                    } else {
                        alert("Unauthorized");
                        setIsDisabled(true);
                    }
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                    setIsDisabled(true);
                });
        }
    }, [selectedFile, formData]);

    const handleSignUp = () => {
        const formDataToSend = {
            name: formData.name,
            age: formData.birthYear,
            email: formData.email,
            disability: formData.disability,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        };

        fetch("http://localhost:5000/userregister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add any additional headers if required
            },
            body: JSON.stringify(formDataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Sign up request failed");
                }
            })
            .then((data) => {
                // Handle the response data as needed after successful sign up
                console.log("Sign up successful:", data);
            })
            .catch((error) => {
                // Handle errors during sign up
                console.error("Sign up error:", error);
            });
    };

    return (
        <MDBContainer fluid className="p-4">
            <MDBRow>
                <MDBCol
                    md="6"
                    className="text-center text-md-start d-flex flex-column justify-content-center"
                >
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        ENVISION <br />
                        <span className="text-primary">Ability in Disability</span>
                    </h1>

                    <p
                        className="px-3"
                        style={{ color: "hsl(217, 10%, 50.8%)" }}
                    >

                    </p>
                </MDBCol>

                <MDBCol md="6">
                    <MDBCard className="my-5">
                        <MDBCardBody className="p-5">
                            <MDBRow>
                                <MDBInput
                                    wrapperClass="mb-4"
                                    id="form1"
                                    type="file"
                                    accept=".jpg, .jpeg"
                                    onChange={handleFileChange}
                                />

                            </MDBRow>
                            <MDBRow>
                                <MDBCol col="6">
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Name"
                                        value={formData.name}
                                        disabled={isDisabled}
                                        id="name"
                                        type="text"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </MDBCol>

                                <MDBCol col="6">
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Birth Year"
                                        id="birthYear"
                                        value={formData.birthYear}
                                        disabled={isDisabled}
                                        type="text"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                birthYear: e.target.value,
                                            })
                                        }
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol col="12">
                                    <div className="position-relative">
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Email"
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                        <MDBIcon
                                            icon="microphone"
                                            className="position-absolute top-50 end-0 translate-middle-y"
                                            onClick={handleEmailSpeechToText}
                                            style={{
                                                cursor: "pointer",
                                                color: "#007bff",
                                            }}
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol col="12">
                                    <div className="position-relative">
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Disability"
                                            id="disability"
                                            type="text"
                                            value={formData.disability}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    disability: e.target.value,
                                                })
                                            }
                                        />
                                        <MDBIcon
                                            icon="microphone"
                                            className="position-absolute top-50 end-0 translate-middle-y"
                                            onClick={
                                                handleDisabilitySpeechToText
                                            }
                                            style={{
                                                cursor: "pointer",
                                                color: "#007bff",
                                            }}
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol col="6">
                                    <div className="position-relative">
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Password"
                                            id="password"
                                            type="text"
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </MDBCol>
                                <MDBCol col="6">
                                    <div className="position-relative">
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            type="text"
                                            value={formData.confirmPassword}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBBtn
                                className="w-100 mb-4"
                                onClick={handleSignUp} // Ensure this line is correctly binding the function
                                size="md"
                                data-bs-dismiss="toast"
                            >
                                Sign Up
                            </MDBBtn>

                            <div className="text-center">
                                <p>or sign up with:</p>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="facebook-f" size="sm" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="twitter" size="sm" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="google" size="sm" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="github" size="sm" />
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Signup2;
