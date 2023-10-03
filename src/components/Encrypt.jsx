// Encrypts passwords up to 95 characters long
const Encrypt = (password, encrKey) => {
  
  const entryRotor = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

  //Will be randomly generated in future
  const exitRotor = 'Y3?$JfA!(\\B=n_yih942FgekD:ZcvTEat<.&z{I#">x]o,w\'0UqjGOrRdLCuQ^W8S[sb`H;17*%|)VMP}p6@/-Km5~+lX N'
  
  // Turn encryption key into ascii codes
  let myAscii = []
  for (let i = 0; i < encrKey.length; i++){
    myAscii.push(encrKey.charCodeAt(i))
  }

  //Sum of ascii codes determine shift of exitRotor
  let keyNum = 0
  myAscii.map(num => {
    keyNum += num
  })


  // Input:   string and number
  // Output:  string shifted by the number
  const shiftAnyString = (str, shiftAmount) => {
    
    // Calculate the effective shift amount within the string length
    const effectiveShift = shiftAmount % str.length;
  
    // Handle negative shift amounts
    const normalizedShift = effectiveShift >= 0 ? effectiveShift : effectiveShift + str.length;
  
    // Split the string into an array of characters
    const chars = str.split('');
  
    // Perform the shift operation
    const shiftedChars = chars.slice(-normalizedShift).concat(chars.slice(0, -normalizedShift));
  
    // Join the shifted characters back into a string
    const shiftedString = shiftedChars.join('');
  
    return shiftedString;
  };

  let encrypted = ''

  //Add exitRotor to packet before shifting, key will then determine the shift upon decryption
  encrypted += exitRotor

  //Generate rotor by shifted exit rotor with sum of password ascii codes
  let shiftedRotor = shiftAnyString(exitRotor, keyNum)

  //Map through password string, each character goes through the entry rotor and shifted exitRotor
  for(const char of password){
    const index = entryRotor.indexOf(char)
    const encrChar = shiftedRotor[index]
    encrypted += encrChar
  }

  return encrypted
}

export default Encrypt