import '../styles/key.css'

const KeyInput = (props) => {

  const { handleKeyInput } = props
  
  return(
    <div className="keyInputWrapper">
      <h4>Enter your master key</h4>
      <input placeholder="key" type="password" className="input" onKeyDown={handleKeyInput}/>
    </div>
  )
}

export default KeyInput