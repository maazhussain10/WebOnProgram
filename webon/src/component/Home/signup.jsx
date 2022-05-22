import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navbar";

class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        fNameColor: "none",
        lNameColor: "none",
        usernameColor: "none",
        passwordColor: "none",
        cPasswordColor: "none",
        signupStatus: false,
    };

    checkRule = (event, value) => {
        const re =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/;

        if (value === "fName") {
            if (event.length < 3) {
                this.setState({ fNameColor: "red" });
            } else {
                this.setState({ fNameColor: "green" });
            }
        }
        if (value === "lName") {
            if (event.length < 3) {
                this.setState({ lNameColor: "red" });
            } else {
                this.setState({ lNameColor: "green" });
            }
        }
        if (value === "username") {
            if (event.length < 3) {
                this.setState({ usernameColor: "red" });
            } else {
                this.setState({ usernameColor: "green" });
            }
        }
        if (value === "password") {
            if (!re.test(event)) {
                this.setState({ passwordColor: "red" });
            } else {
                this.setState({ passwordColor: "green" });
            }
        }
        if (value === "cPassword") {
            if (!re.test(event)) {
                this.setState({ cPasswordColor: "red" });
            } else {
                this.setState({ cPasswordColor: "green" });
            }
        }
    };

    registerUser = async () => {
        await this.setState({
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmpassword").value,
        });
        console.log(this.state.firstName);
        let { firstName, lastName, username, password, confirmPassword } =
            this.state;
        if (
            !(firstName, lastName, username, password, confirmPassword === "")
        ) {
            try {
                axios({
                    method: "post",
                    url: "http://localhost:5000/signingUp",
                    params: {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        password: password,
                        confirmpassword: confirmPassword,
                    },
                }).then((response) => {
                    this.setState({ signupStatus: true });
                    alert("Account Created Successfully");
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("Please, fill in all the details!");
        }
    };

    render() {
        return (
            <>
                <NavBar />
                <div className="divn">
                    <div
                        className="container register"
                        style={{ marginTop: "1%" }}
                    >
                        <div className="row">
                            <div className="col-md-4 register-left"></div>
                            <div className="col-md-5 register-right">
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                        aria-labelledby="home-tab"
                                    >
                                        <h3 className="register-heading">
                                            Sign Up
                                        </h3>
                                        <div className="register-form">
                                            <div className="row g-3">
                                                <div className="col mb-3 input-group flex-nowrap">
                                                    <span
                                                        className="input-group-text"
                                                        id="addon-wrapping"
                                                    >
                                                        <i className="fas fa-user-graduate"></i>
                                                    </span>
                                                    <input
                                                        required
                                                        id="firstname"
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        placeholder="FirstName"
                                                        aria-label="FirstName"
                                                        onChange={(e) =>
                                                            this.checkRule(
                                                                e.target.value,
                                                                "fName"
                                                            )
                                                        }
                                                        style={{
                                                            boxShadow:
                                                                "0 0 8px " +
                                                                this.state
                                                                    .fNameColor,
                                                        }}
                                                        aria-describedby="addon-wrapping"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3 input-group flex-nowrap">
                                                    <span
                                                        className="input-group-text"
                                                        id="addon-wrapping"
                                                    >
                                                        <i className="fas fa-address-card"></i>
                                                    </span>
                                                    <input
                                                        required
                                                        id="lastname"
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        placeholder="LastName"
                                                        aria-label="LastName"
                                                        onChange={(e) =>
                                                            this.checkRule(
                                                                e.target.value,
                                                                "lName"
                                                            )
                                                        }
                                                        style={{
                                                            boxShadow:
                                                                "0 0 8px " +
                                                                this.state
                                                                    .lNameColor,
                                                        }}
                                                        aria-describedby="addon-wrapping"
                                                    />
                                                </div>
                                            </div>

                                            <div className="input-group mb-3 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-at"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="username"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Username"
                                                    aria-label="username"
                                                    onChange={(e) =>
                                                        this.checkRule(
                                                            e.target.value,
                                                            "username"
                                                        )
                                                    }
                                                    style={{
                                                        boxShadow:
                                                            "0 0 8px " +
                                                            this.state
                                                                .usernameColor,
                                                    }}
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <div className="row g-3">
                                                <div className="input-group col mb-3 flex-nowrap">
                                                    <span
                                                        className="input-group-text"
                                                        id="addon-wrapping"
                                                    >
                                                        <i className="fas fa-unlock-alt"></i>
                                                    </span>
                                                    <input
                                                        required
                                                        id="password"
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        placeholder="Password"
                                                        aria-label="Password"
                                                        onChange={(e) =>
                                                            this.checkRule(
                                                                e.target.value,
                                                                "password"
                                                            )
                                                        }
                                                        style={{
                                                            boxShadow:
                                                                "0 0 8px " +
                                                                this.state
                                                                    .passwordColor,
                                                        }}
                                                        aria-describedby="addon-wrapping"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-group col mb-3 flex-nowrap">
                                                    <span
                                                        className="input-group-text"
                                                        id="addon-wrapping"
                                                    >
                                                        <i className="fas fa-lock"></i>
                                                    </span>
                                                    <input
                                                        required
                                                        id="confirmpassword"
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        placeholder="ConfirmPassword"
                                                        aria-label="ConfirmPassword"
                                                        onChange={(e) =>
                                                            this.checkRule(
                                                                e.target.value,
                                                                "cPassword"
                                                            )
                                                        }
                                                        style={{
                                                            boxShadow:
                                                                "0 0 8px " +
                                                                this.state
                                                                    .cPasswordColor,
                                                        }}
                                                        aria-describedby="addon-wrapping"
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                type="button"
                                                className="btnRegister1"
                                                onClick={() =>
                                                    this.registerUser()
                                                }
                                                defaultValue="Sign Up"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Signup;
