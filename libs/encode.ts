
const utf8 = require('utf8');
const Buffer = require('buffer').Buffer; // Node.js 的 Buffer

export function enXorStr(text:string, key:string) {

  const encoded = utf8.encode(text);
  let xorResult = '';
  for (let i = 0; i < encoded.length; i++) {
    const vv = (encoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16);
    xorResult += vv.length === 1 ? '0' + vv : vv;
  }
  let base64 = Buffer.from(xorResult, 'hex').toString('base64'); // 将十六进制字符串转换为 Base64
  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_'); // URL 安全
  return base64;
}

export function deXorStr(base64Str:string, key:string):string {

  base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/'); // 还原 Base64
  const xorResult = Buffer.from(base64Str, 'base64').toString('hex'); // 将 Base64 转换为十六进制字符串
  let result = '';
  for (let i = 0; i < xorResult.length; i += 2) {
    const vv = xorResult.substring(i, i + 2);
    const hexNum = parseInt(vv, 16);
    result += String.fromCharCode(hexNum ^ key.charCodeAt(i / 2 % key.length));
  }
  return utf8.decode(result);  
}
