import React from 'react'
import Decrypt from './Decrypt'

export default function AccountRow(props){
 
  function handleDecrypt(event) {
    const password = props.password
    const decrKey = window.prompt("Please enter key: ")
    const decrypted = (Decrypt(password, decrKey))
    const accountRowElement = event.target.parentElement.parentElement
    const passwordText = accountRowElement.querySelector('.password--text')
    passwordText.textContent = decrypted
  }

  return (
      <div className="account-row">
        <div>{props.site}</div>
        <div>{props.username}</div>
        {/* props.password below is the encrypted password stored in the accounts array in AccountRow.jsx*/}
        <div className="password--text">{props.password}</div>
        <div className="account-row--button-container">
          <button className="account-row--button" onClick={handleDecrypt}>Decrypt</button>
        </div>
      </div>
  )
}