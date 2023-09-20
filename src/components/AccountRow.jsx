import React from 'react'
import Decrypt from './Decrypt'

export default function AccountRow(props){
 
  function handleDecrypt(event) {
    const pwText = document.querySelector('.password--text')
    const password = props.password
    const decrKey = window.prompt("Please enter key: ")
    const decrypted = (Decrypt(password, decrKey))
    pwText.textContent = decrypted
  }

  

  return (
      <div className="account-row">
        <div>{props.site}</div>
        <div>{props.username}</div>
        <div className="password--text">{props.password}</div>
        <div className="account-row--button-container">
          <button className="account-row--button" onClick={handleDecrypt}>Decrypt</button>
        </div>
      </div>
  )
}