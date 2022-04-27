
import React, { useEffect, useState } from 'react';
import {MainForm} from '../components/Form';


const Home = () => {
    return (
        <div>
        <h1>UMich Dining Facts Calculator</h1>
        <br></br>
        <MainForm /> {MainForm.value}
        </div>
    );
}

export default Home;