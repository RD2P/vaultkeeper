import { useState, useEffect } from 'react'
import styles from './styles/styles.css'
import accounts from './accountData.jsx'
import AccountRow from './components/AccountRow'
import Encrypt from './components/Encrypt'
// import Decrypt from "./components/Decrypt"

import HeadingRow from './components/HeadingRow'
import InputRow from './components/InputRow'


function App() {
  
  const [needKey, setNeedKey] = useState(true)
  let encrKey='key'

  const keyInput = <>
    <h4>Enter your master key</h4>
    <input placeholder="key" className="key input" onKeyDown={handleKeyInput}/>
  </>

  function handleKeyInput(event){
    if (event.key === 'Enter'){
      encrKey=event.target.value
      console.log(encrKey)
      setNeedKey(prevState => !prevState)
    }  
  }

  function handleAddAccount(){
    setShowInputRow(prevState => !prevState)
  }

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
          <h1 className="page-title">Vault Keeper</h1>
        {/* {needKey &&  keyInput} */}
   
      <HeadingRow handleAddAccount={handleAddAccount}/>

      {/* Input row */}
      {showInputRow && <InputRow 
        handleInputChange={handleInputChange}
        handleEncrypt={handleEncrypt}
      />}
  
      {/* Account rows */}
      <div className="account-info-container row">
        {accountRows}
      </div>
      
    </>
  )
}

export default App
