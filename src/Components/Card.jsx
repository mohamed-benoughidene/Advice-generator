import React, { useState, useEffect } from 'react';
import {ReactComponent as Dice} from '../Images/icon-dice.svg'
import DividerDesktop from '../Images/pattern-divider-desktop.svg';
import DividerMobil from '../Images/pattern-divider-mobile.svg'

export default function Card() {
const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
let x = Math.floor(Math.random() * 224);
const [quote, setQuote] = useState([]);
const [quoteID, setQuoteId] = useState([]);
const [mobile, setMobile] = useState();

// this function to call api on click event
function getApi(){
    const axios = require('axios');
    axios.get(`https://api.adviceslip.com/advice/${x}`)
        .then(function (response) {
            setQuote(response.data.slip.advice);
            setQuoteId(response.data.slip.id);
        })
        .catch(function (error) {
            console.log(error);
        })
}
useEffect(()=>{
 getApi();
    }, []);

    // this to get the width of the window
function getWindowDimensions() {
  const { innerWidth: width} = window;
  return {
    width
  };
}
     useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    
setMobile(()=>{
  if(windowDimensions.width > '850'){
    return false;
  }else{
    return true;
  }
})   
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

    return (
        <div className="card">

            <h3 className="quoteNumber">Advice #{quoteID}</h3>
            <p className="quote">“{quote}”</p>
           
        {/* show desktop divider or mobile divider */}
            {
              mobile ? <img className="divider" src={DividerMobil} alt="" /> : <img className="divider" src={DividerDesktop} alt="" />  
            } 
       
                <button className="button" onClick={getApi}><Dice/></button>
       
        </div>
    )
}
