import './App.css';
import React,{ Component } from "react";

import Icosahedron from './Icosahedron';


class App extends Component {
 
    render() {
        return (
            <div style={{display:"grid"}}>
         
            <Icosahedron />
            </div>
        )
    }
}

export default App;