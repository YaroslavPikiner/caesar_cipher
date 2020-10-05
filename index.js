const fs = require('fs');
const {program} = require('commander');

function encode(str,shift) {
    let output = ''
      for(let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i)
           code = code + shift
           output += String.fromCharCode(code)
    }
    return output
  }

  function decode(str,shift) {
      let output = ''
      for(let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i)
           code = code - shift
           output += String.fromCharCode(code)
    }
    return output
  }

  function getAndWrite(shift,input,output) {
    fs.readFile(input, (err,data) => {
        if(err) throw err
        let dataInput = program.actions == 'encode' ? encode(data.toString(), shift) : decode(data.toString(), shift)
        console.log(dataInput.toString())
        fs.writeFile(output, dataInput, 'utf8', (err) => {
            if(err) throw err
            console.log('writed')
        })
    })
}

  program
    .option('-a, --actions <actions>', 'action argument')
    .option('-s, --shift <shift>', 'shift argument',getAndWrite)
    .option('-i, --input <input>', 'input argument', getAndWrite)
    .option('-o, --output <output>', 'output argument', getAndWrite)
  ;


  program.parse(process.argv)

