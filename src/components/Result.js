import React from "react";
import cold from "./cold.png";
import hot from "./hot.png";



const images = [
    cold,
    hot,
]

const temperatures = [
    29,
    31,
]

const testTemp = 31;
var imageSource = "";
var power = true;
var waterSaved = 0;
var flowRate = 30;

function whichImage() {
    imageSource = images[0];
    while (testTemp > 30) {
        function myFunction() { 
            setInterval(myTimer, 1000);
        }
        myFunction();
        function myTimer() {
            waterSaved += flowRate;
            document.getElementById("demo").innerHTML = waterSaved
        };
        imageSource = images[1];
        return imageSource;
    };
    window.onload = function savedWater(){
    document.getElementById("demo").innerHTML = waterSaved;
    };

    return imageSource;
};

const chooseImage = whichImage();


const Result = props => (
    <div className="result">
        <br></br> 
        <p className="pad">Current state:</p>
        <img src={cold} height="480" width="630"></img>
        <br></br>
        {props.saved && 
        <p className="result__key">The flow rate is currently at:
            <span className="result__value"> {props.saved}</span> L/s
        </p>}
        {props.error && 
        <p className="result__key">Error:
            <span className="result__value"> {props.error}</span>
        </p>}
        <p id="demo"></p>
    </div>
);


export default Result;