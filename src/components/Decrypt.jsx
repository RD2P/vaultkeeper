import React from 'react'

export default function Decrypt(password, decrKey) {
  const entryRotor = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

  const exitRotor = password.substring(0, 95)
  const encr = password.substring(95)

  // Turn password into ascii codes
  let myAscii = []
  for (let i = 0; i < decrKey.length; i++){
    myAscii.push(decrKey.charCodeAt(i))
  }

  //Initial shift by sum of ascii codes
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

  let shiftedRotor = shiftAnyString(exitRotor, keyNum)

  let decrypted = ''

  for(const char of encr){
    const index = shiftedRotor.indexOf(char)
    const decrChar = entryRotor[index]
    decrypted += decrChar
  }


 
  return decrypted
}