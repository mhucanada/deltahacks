import React from "react";

import Titles from "./components/Titles";
import Input from "./components/Input";
import Result from "./components/Result";



class App extends React.Component{
    state = {
        saved: undefined,
        error: undefined
    }

    getInfo =  async(e) => {
        e.preventDefault();
        const speed  = e.target.elements.speed.value;
        if (speed && isNaN(speed)) {
            this.setState({
                saved: undefined,
                error: "Please enter a valid pressure"
            });
        }
        else if (speed && speed < 30) {
            this.setState({
                saved: undefined,
                error: "Water pressure is too low"
            });
        }
        else if (speed && speed > 80) {
            this.setState({
                saved: undefined,
                error: "Water pressure is too high"
            });
        }
        else if (speed) {
            this.setState({
                saved: speed,
                error: ""
            });
        }
        else {
            this.setState({
                saved: undefined,
                error: "Please enter a pressure"
            });
        }
    }

    render(){
        return(
            <div className="back">
                <div className="main-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-5 info center">
                                <Titles/>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Input getInfo={this.getInfo}/>
                            </div>
                            <div className="col-xs-7 wow">
                                <Result
                                    saved={this.state.saved}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default App;