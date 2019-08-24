import React from 'react';
import './Togglebutton.css'

const Togglebutton = props =>(

    <button className="toggle-button" onClick={props.click}>

    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />

    </button>
)
export default Togglebutton