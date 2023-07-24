import React from 'react'
import Decrypt from './Decrypt'

export default function AccountRow(props){
 
  function handleDecrypt() {
    const password = props.password
    const decrKey = window.prompt("Please enter key: ")
    console.log(Decrypt(password, decrKey))
    // setIsEncrypted(prevState => !prevState)
  }

  return (
      <div className="account-row">
        <p>{props.site}</p>
        <p>{props.username}</p>
        <p className="password--text">{props.password}</p>
        <div className="account-row--button-container">
          <button className="account-row--button" onClick={handleDecrypt}>Decrypt</button>
        </div>
      </div>
  )
}