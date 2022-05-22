import React, { Component } from "react";
import DashboardNavbar from "./dashboardNavbar";
import axios from "axios";
import "../css/dashboard.css";

class Dashboard extends Component {
    state = {
        cryptocurrencies: [],
        selectedCrypto:"",
        liveAPIData:[]
    };

    componentDidMount(){
        let dummyValue=[
            {
            name:"btc",
            price:8500,
            change:0.01,
            change_percent:0.01,
            volume:0.01,
            market_cap:0.01,
            description:"Bitcoin is a good coin"
        },
            {
            name:"xrp",
            price:2500,
            change:0.01,
            change_percent:0.01,
            volume:0.01,
            market_cap:0.01,
            description:"XRP is a good coin"
        },
            {
            name:"eth",
            price:1100,
            change:0.01,
            change_percent:0.01,
            volume:0.01,
            market_cap:0.01,
            description:"Etherium is a good coin"
        },
    ]        
        this.setState({cryptocurrencies: dummyValue});
    }

    buyCrypto = async()=>{
        console.log("JAJJS")
        try {
            axios({
                method: "get",
                url: "https://api.wazirx.com/sapi/v1/tickers/24hr",
            }).then((response) => {
                console.log(response.data);
                this.setState({liveAPIData: response.data})
            });
        } catch (e) {
            console.log(e);
        }

        for(let i=0;i<10;i++){
            console.log(this.state.liveAPIData[i].baseAsset,this.state.selectedCrypto);
            if(this.state.liveAPIData[i].baseAsset===this.state.selectedCrypto){
                try {
                    axios({
                        method: "post",
                        url: "http://localhost:5000/transaction",
                        params:{
                            username: localStorage.getItem("username"),
                            selectedCrypto: this.state.selectedCrypto,
                            cryptoValue: this.state.liveAPIData[i].lastPrice
                        }
                    }).then((response) => {
                        console.log(response.data);
                        this.setState({liveAPIData: response.data})
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    
    selectedCrypto = async (crypto) => {
        this.setState({ selectedCrypto: crypto});
        // this.getCryptoDetails();
    };

    render() {
        let theme, sidebarTheme, chatWindowTheme;

        theme = "black";
        sidebarTheme = "white";
        chatWindowTheme = "#F0FFFF";
        return (
            <>
                <div>
                <DashboardNavbar />
                <div className="container">
                    <div className="messaging">
                        <div
                            className="inbox_msg"
                            style={{ background: sidebarTheme }}
                        >
                            <div
                                className="inbox_people"
                                style={{ background: sidebarTheme }}
                            >
                                <div
                                    className="headind_srch"
                                    style={{ background: sidebarTheme }}
                                >
                                    <div className="recent_heading">
                                        <h4
                                            style={{
                                                fontWeight: "bold",
                                                color: "#a674b8",
                                            }}
                                        >
                                            Cryptocurrencies
                                        </h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <span className="input-group-addon">
                                                <button type="button"></button>
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {this.state.cryptocurrencies.map((crypto, index) => (
                                        <div
                                            key={index}
                                            className="chat_list active_chat"
                                            style={{
                                                backgroundColor: sidebarTheme,
                                            }}
                                            onClick={() =>
                                                this.selectedCrypto(
                                                    crypto.name,
                                                    crypto.price
                                                )
                                            }
                                        >
                                            <div className="chat_people">
                                                <div className="chat_ib">
                                                        <h5
                                                            style={{
                                                                color: theme,
                                                            }}
                                                        >
                                                            {crypto.name}{" "}
                                                        </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="mesgs"
                                style={{ background: chatWindowTheme }}
                            >
                                <div
                                    className="msg_history"
                                    id="outerbox"
                                >
                                    {this.state.selectedCrypto === "" ? (
                                        <h1 style={{ color: theme }}>
                                            Select Any Crypto
                                        </h1>
                                    ) : (
                                        <>
                                                <h2
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "#a674b8",
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    {this.state.selectedCrypto}
                                                </h2>
                                            {this.state.cryptocurrencies.map(
                                                (cryptocurrency, index) =>
                                                    this.state.selectedCrypto ===
                                                    cryptocurrency.name ? (
                                                        <div
                                                            key={index}
                                                        >
                                                            <div>
                                                                Name: {cryptocurrency.name}
                                                            </div>                                                            
                                                            <div>
                                                                Price: {cryptocurrency.price}
                                                            </div>                                                            
                                                            <div>
                                                                Change: {cryptocurrency.change}
                                                            </div>                                                            
                                                            <div>
                                                                Change Percent: {cryptocurrency.change_percent}
                                                            </div>                                                            
                                                            <div>
                                                                Volume: {cryptocurrency.volume}
                                                            </div>                                                            
                                                            <div>
                                                                Market Cap: {cryptocurrency.market_cap}
                                                            </div>                                                            
                                                            <div>
                                                                Description: {cryptocurrency.description}
                                                            </div>                                                   
                                                            <button onClick={()=>{this.buyCrypto()}}>Buy</button>
                                                            <button>Sell</button>
                                                        </div>

                                                    ) : null
                                            )}
                                        </>
                                    )}
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

export default Dashboard;
