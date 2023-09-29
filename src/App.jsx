import { useState, useEffect } from 'react'
import './styles/styles.css'
import accounts from './accountData.jsx'
import AccountRow from './components/AccountRow'
import Encrypt from './components/Encrypt'
// import Decrypt from "./components/Decrypt"

import HeadingRow from './components/HeadingRow'
import InputRow from './components/InputRow'


function App() {
  
  //Did user input a key?
  const [needKey, setNeedKey] = useState(true)

  //temp hardcoded key
  let encrKey='key'

  //User enters their master key
  const keyInput = <>
    <h4>Enter your master key</h4>
    <input placeholder="key" className="key input" onKeyDown={handleKeyInput}/>
  </>

  //Handles user entering master key
  function handleKeyInput(event){
    if (event.key === 'Enter'){
      encrKey=event.target.value
      console.log(encrKey)
      setNeedKey(prevState => !prevState)
    }  
  }

  //Toggle the input boxes for site, username, password
  function handleAddAccount(){
    setShowInputRow(prevState => !prevState)
  }

  //Clears adn hides input row
  //Pushes account info to accounts array, password is encrypted
  function handleEncrypt(){
    setShowInputRow(prevState => !prevState)
    if(currentAccount.site !== "" && currentAccount.username !== "" &&  currentAccount.password !== ""){
      const password = currentAccount.password
      accounts.push(
        {site: currentAccount.site,
        username: currentAccount.username,
        password: Encrypt(password, encrKey)
        }
      )
      currentAccount.site = ""
      currentAccount.username = ""
      currentAccount.password = ""
    }
    else{
      alert("Fill in the account info")
    }

    // setIsEncrypted(prevState => !prevState)
    
  }
  
  const [showInputRow, setShowInputRow] = useState(false)
  
  const [currentAccount, setCurrentAccount] = useState({
    site: "",
    username: "",
    password: ""
  })
  
  function handleInputChange(event){
    setCurrentAccount(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  //Goes through each object in the accounts array and displays the info in the AccountRow component
  const accountRows = accounts.map(account => {
    return (<AccountRow 
        key={account.site}
        site={account.site}
        username={account.username}
        password={account.password}
    />)
  })

  return (
    <>
     
        <div className="container">
          <h1 className="page-title">Vault Keeper</h1>
          {/* {needKey &&  keyInput} */}
          <HeadingRow handleAddAccount={handleAddAccount}/>
          {/* Input row appears if showInputRow is true*/}
          {showInputRow && <InputRow
            handleInputChange={handleInputChange}
            handleEncrypt={handleEncrypt}
          />}
          {/* Account rows */}
          <div className="account-info-container row">
            {accountRows}
          </div>
          <div className="note-container">
            <p className="note">Thanks for checking out Vault Keeper!</p>
            <p>It's a password manager with a custom encryption and a master key for decryption.</p>
            <p>This projects is still a work in progress. More features are currently being added such as re-encrypting a password after it has been decrypted.</p>
            <p><strong>The feature that allows users to choose a master key is still being built, for now, the master key is hardcoded to be "key".</strong></p>
            <p>Click "Add an account" to start!</p>
          </div>
        </div>
        
    </>
  )
}

export default App
