import React, { Component } from "react";
import NavBar from "./navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

class Login extends Component {
    state = { loginAuth: false, username: "", load: false };

    Login = async () => {
        await this.setState({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });
        let { username, password } = this.state;
        console.log(username, password);
        if ((username, password)) {
            try {
                axios({
                    method: "post",
                    url: "http://localhost:5000/loggingIn",
                    params: {
                        username: username,
                        password: password,
                    },
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.responseMessage === "Successfull login") {
                        this.setState({ loginAuth: true, username:response.data.username });
                        console.log(this.state.loginAuth);
                    } else alert("Check your credentials");
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("Please, fill in all the details!");
        }
    };

    render() {
        if (this.state.loginAuth) {
            localStorage.setItem("username", this.state.username);
            return <Navigate to={`/${this.state.username}/dashboard`} />;
        } else {
            return (
                <>
                    <NavBar />
                    <div className="divn">
                        <div className="container-fluid">
                            <div className="container p-4">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-lg-6 col-md-10">
                                        <div className="card h-100  w-80 shadow-lg">
                                            <form className="form">
                                                <h1 className="loginfont">
                                                    Login
                                                </h1>
                                                <div className="input-group mb-2 flex-nowrap">
                                                    <span
                                                        className="input-group-text"
                                                        id="addon-wrapping"
                                                    >
                                                        <i className="fas fa-at"></i>
                                                    </span>
                                                    <input
                                                        id="username"
                                                        type="username"
                                                        className="form-control form-control-lg"
                                                        placeholder="Username"
                                                        aria-label="username"
                                                        aria-describedby="addon-wrapping"
                                                    />
                                                </div>
                                                <div className="input-group mb-4 flex-nowrap">
                                                    <span
                                                        className="input-group-text"
                                                        id="addon-wrapping"
                                                    >
                                                        <i className="fas fa-unlock-alt"></i>
                                                    </span>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        placeholder="Password"
                                                        aria-label="Password"
                                                        aria-describedby="addon-wrapping"
                                                    />
                                                </div>
                                                <button
                                                    className="btn btn-outline-dark btn-lg loginbtn"
                                                    type="button"
                                                    onClick={() => this.Login()}
                                                >
                                                    Login
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default Login;
