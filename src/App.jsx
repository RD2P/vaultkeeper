import { useState, useEffect } from 'react'
import './styles/styles.css'
import KeyInput from './components/KeyInput'
import accounts from '../data/accountData.jsx'
import AccountRow from './components/AccountRow'
import Encrypt from './components/Encrypt'
import HeadingRow from './components/HeadingRow'
import InputRow from './components/InputRow'
import KeyModal from './components/modal/KeyModal.jsx'


function App() {
  
  const [showKeyInput, setShowKeyInput] = useState(false)
  const [encrKeyExists, setEncrKeyExists] = useState(false)
  const [encrKey, setEncrKey] = useState('firstkey')
  const [showInputRow, setShowInputRow] = useState(false)
  const [currentAccount, setCurrentAccount] = useState({
    site: "",
    username: "",
    password: ""
  })



  function handleKeyInput(event){

    if (event.key === 'Enter'){
      setEncrKey(event.target.value)
      if (encrKey){
        setEncrKeyExists(true)
        setShowKeyInput(false)
        alert("Master key set!")
      } else {
        alert("Set a master key")
      }
    }  
  }

  const handleKeyButton = () => {
    setShowKeyInput(prevState => !prevState)
  }

  //Toggle the input boxes for site, username, password
  function handleAddAccount(){
    encrKeyExists ? setShowInputRow(prevState => !prevState) : alert("Set a master key")
  }

  //Clears and hides input row
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
    
  }
  
  
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
        encrKey={encrKey}
    />)
  })

  return (
    <>
      <div className="container">
        <h1 className="page-title">Vault Keeper</h1>

        <button className="keyButton" onClick={handleKeyButton}>Set master key</button>

        {showKeyInput && <KeyInput handleKeyInput={handleKeyInput}/>}
        
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
          <p className="note">Thanks for checking out Vault Keeper 🗝️</p>
          <p>It's a password manager with a custom encryption and a master key for decryption.</p>
          <br/>
          <p>Click <strong>Set master key</strong> to start!</p>
          <a href="https://github.com/RD2P/vaultkeeper/blob/main/README.md" className="link">Learn more</a>
        </div>
      </div>

    </>
  )
}

export default App
