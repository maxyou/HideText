
const utf8 = require('utf8');

export function enXorStr(text:string, key:string) {

  const encoded = utf8.encode(text)
  
  var result = '';

  for (var i = 0; i < encoded.length; i++) {

    var vv =  (encoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16)

    if(vv.length == 1){ vv = '0'+vv }
    
    result += vv
  }

  // console.log(`enXorStr ${text} with ${key}, result:${result}`)
  return result;
}

export function deXorStr(hexStr:string, key:string):string {

  // console.log(`deXorStr hexStr:${hexStr} key:${key}`)

  var result = '';

  for (var i = 0; i < hexStr.length; i+=2) {

    const vv = hexStr.substring(i, i+2)
    
    const hexNum = parseInt(vv, 16)

    var v =  String.fromCharCode(hexNum ^ key.charCodeAt((i/2) % key.length))

    result += v

  }
  
  // console.log(`deXorStr ${hexStr} with ${key}, result:${result}`)
  return utf8.decode(result)   
}
