import React, { Component } from "react";
import axios from "axios";
import DashboardNavbar from "./dashboardNavbar";

class Account extends Component {
state = { loginAuth: false, load: false, accountName:"", INRValue:"" };

AddAccount = async () => {
    await this.setState({
        accountName: document.getElementById("accountName").value,
        INRValue: document.getElementById("INRValue").value,
    });
    let  username = localStorage.getItem("username");
    console.log(username)
    try {
        axios({
            method: "post",
            url: "http://localhost:5000/addAccount",
            params: {
                username: username,
                accountName: this.state.accountName,
                INRValue: this.state.INRValue
            },
        }).then((response) => {
            console.log(response.data);
        });
    } catch (e) {
        console.log(e);
    }
};

render() {
    return (
            <>
                <DashboardNavbar />
                <div className="divn">
                    <div className="container-fluid">
                        <div className="container p-4">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-6 col-md-10">
                                    <div className="card h-100  w-80 shadow-lg">
                                        <form className="form">
                                            <h1 className="loginfont">
                                                Account Details
                                            </h1>
                                            <div className="input-group mb-2 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-at"></i>
                                                </span>
                                                <input
                                                    id="accountName"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Account Name"
                                                    aria-label="accountName"
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
                                                    id="INRValue"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="INR Value"
                                                    aria-label="INRValue"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <button
                                                className="btn btn-outline-dark btn-lg loginbtn"
                                                type="button"
                                                onClick={() => this.AddAccount()}
                                            >
                                                Add Amount
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


export default Account;
