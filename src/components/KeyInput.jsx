import '../styles/key.css'

const KeyInput = () => {
    //Handles user entering master key
    function handleKeyInput(event){
      if (event.key === 'Enter'){
        encrKey=event.target.value
        console.log(encrKey)
        setNeedKey(prevState => !prevState)
      }  
    }
  
  return(
    <div className="keyInputWrapper">
      <h4>Enter your master key</h4>
      <input placeholder="key" type="password" className="input" onKeyDown={handleKeyInput}/>
    </div>
  )
}

export default KeyInput