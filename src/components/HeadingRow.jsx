import '../styles/headingrow.css'

const HeadingRow = (props) => {
  const { handleAddAccount } = props
  return(
    <tr className="heading-row row">
      <th>Site</th>
      <th>Username</th>
      <th>Password</th>
      <button onClick={handleAddAccount}>Add an account</button>
    </tr>
  )
}

export default HeadingRow