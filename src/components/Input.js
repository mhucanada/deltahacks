import React from "react";

const Input = props => (
    <div>
        <form onSubmit={props.getInfo}>
            <input type="text" name="speed" placeholder="Flow rate in L/s ..."/>
            <button>Calculate!</button>
        </form>
    </div>
);



export default Input;