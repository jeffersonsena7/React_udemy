import './styles.css'

import { Component } from "react";

export class Button extends Component {

  render() {
    const {text, quandoClick, disabled} = this.props

    return(
      //o evento do click
      <button 
        disabled = {disabled}
        className='button' 
        onClick={quandoClick}
      >
        {text}
      </button>
    ) 
    
  }
}