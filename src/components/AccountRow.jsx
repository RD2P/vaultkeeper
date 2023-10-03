import { useState } from 'react'
import Decrypt from './Decrypt'
import Encrypt from './Encrypt'


const AccountRow = (props) =>{
  
  const { encrKey } = props
  const [isEncrypted, setIsEncrypted ] = useState(true)

  
  const handleDecrypt = (event) => {
    const password = props.password
    const decrKey = window.prompt("Please enter key: ")
    const decrypted = (Decrypt(password, decrKey))
    const accountRowElement = event.target.parentElement.parentElement
    const passwordText = accountRowElement.querySelector('.password--text')
    passwordText.textContent = decrypted
    setIsEncrypted(prevState => !prevState )
  }
  
  const handleReEncrypt = (event) => {
    const accountRowElement = event.target.parentElement.parentElement
    const passwordElement = accountRowElement.querySelector('.password--text')
    const encrypted = Encrypt(passwordElement.innerText, encrKey)
    passwordElement.innerText = encrypted
    setIsEncrypted(prevState => !prevState )
  }
  
  const decryptBtn = 
      <button className="account-row--button" onClick={handleDecrypt}>Decrypt</button>
  
  const reEcryptBtn = 
      <button className="account-row--button" onClick={handleReEncrypt}>Encrypt</button>

  return (
      <div className="account-row">
        <div>{props.site}</div>
        <div>{props.username}</div>
        {/* props.password below is the encrypted password stored in the accounts array in AccountRow.jsx*/}
        <div className="password--text">{props.password}</div>
        <div className="account-row--button-container">
          {isEncrypted ? decryptBtn : reEcryptBtn}
        </div>
      </div>
  )
}

export default AccountRow