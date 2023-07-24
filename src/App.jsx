import { useState, useEffect } from 'react'
import styles from './styles/styles.css'
import accounts from './accountData.jsx'
import AccountRow from './components/AccountRow'
import Encrypt from './components/Encrypt'
// import Decrypt from "./components/Decrypt"



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
    if(currentAccount.password !== ""){
    // {currentAccount.site !== "" && currentAccount.username !== "" && }
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

  const inputRow =  <div className="input-row">
                      <input
                        className="input"
                        placeholder="Site"
                        name="site"
                        onChange={handleInputChange}
                        value={currentAccount.site}
                      />
                      <input
                        className="input"
                        placeholder="Username"
                        name="username"
                        onChange={handleInputChange}
                        value={currentAccount.username}
                      />
                      <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                        value={currentAccount.password}
                      />
                      <button onClick={handleEncrypt}>Encrypt</button>
                    </div>

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
      <div className="page-title">
        <h1>Vault Keeper</h1>
        {/* {needKey &&  keyInput} */}
      </div>

       {/* Heading row */}
      <div className="heading-row">
        <h4>Site</h4>
        <h4>Username</h4>
        <h4>Password</h4>
        <button onClick={handleAddAccount}>Add an account</button>
      </div>

      {showInputRow && inputRow}
  
      <div className="account-info-container">
        {accountRows}
      </div>
    </>
  )
}

export default App
