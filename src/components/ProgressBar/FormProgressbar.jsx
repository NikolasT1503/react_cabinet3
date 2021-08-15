import React from 'react';
import './FormProgressbar.css';

function FormProgressbar(props) {
    return (
        <div class="progress">
        <div class="circle done">
            <span class="label">1</span>
            <span class="title">Personal</span>
        </div>
        <span class="bar done"></span>
        <div class="circle done">
            <span class="label">2</span>
            <span class="title">Address</span>
        </div>
        <span class="bar half"></span>
        <div class="circle active">
            <span class="label">3</span>
            <span class="title">Payment</span>
        </div>
        <span class="bar"></span>
        <div class="circle">
            <span class="label">4</span>
            <span class="title">Review</span>
        </div>
        <span class="bar"></span>
        <div class="circle">
            <span class="label">5</span>
            <span class="title">Finish</span>
        </div>
        </div>
    );
}

export default FormProgressbar;


