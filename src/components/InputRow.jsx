import '../styles/inputrow.css'

const InputRow = (props) => {
  const { handleInputChange, handleEncrypt, site, username, password} = props
  return(
    <div className="input-row">
      <input
        className="input"
        placeholder="Site"
        name="site"
        onChange={handleInputChange}
        value={site}
      />
      <input
        className="input"
        placeholder="Username"
        name="username"
        onChange={handleInputChange}
        value={username}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleInputChange}
        value={password}
      />
      <button onClick={handleEncrypt}>Encrypt</button>
    </div>
  )
}

export default InputRow