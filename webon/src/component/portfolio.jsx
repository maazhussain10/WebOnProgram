import React, { Component } from "react";
import axios from "axios";
import DashboardNavbar from "./dashboardNavbar";

class Portfolio extends Component {
state = { 
    transactionDetails: []
};

componentDidMount(){
    try {
        axios({
            method: "get",
            url: "http://localhost:5000/getTransactions",
            params: {
                username: localStorage.getItem("username")
            },
        }).then((response) => {
            console.log(response.data);
            // let dummy=[]
            // dummy.push(response.data)
            this.setState({transactionDetails: response.data});
        });
    } catch (e) {
        console.log(e);
    }
}

render() {
    return (
            <>
                <DashboardNavbar />
                <div className="divn">
                    <div className="container-fluid">
                        <div className="container p-4">
                        {this.state.transactionDetails.map(
                                                (transaction, index) =>
                                                    this.state.selectedCrypto ===
                                                    transaction.name ? (
                                                        <div
                                                            key={index}
                                                        >
                                                            <div>
                                                                Name: {transaction.transactionId}
                                                            </div>                                                            
                                                            <div>
                                                                CryptoCurrency: {transaction.cryptocurrency}
                                                            </div>                                                            
                                                            <div>
                                                                INR Purchased: {transaction.INRAmount}
                                                            </div>                                                            
                                                            <div>
                                                                Crypto Coins: {transaction.cryptoValue}
                                                            </div>                                                            
                                                            {/* <div>
                                                                Volume: {transaction.volume}
                                                            </div>                                                            
                                                            <div>
                                                                Market Cap: {transaction.market_cap}
                                                            </div>                                                            
                                                            <div>
                                                                Description: {transaction.description}
                                                            </div>                                                    */}
                                                        </div>

                                                    ) : null
                                            )}  
                    </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Portfolio;
