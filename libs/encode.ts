
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

export function deXorStr(input:string, key:string):string {

  // 容错：防止参数被 encodeURIComponent 编码
  let raw = input;
  try {
    raw = decodeURIComponent(raw);
  } catch (e) {
    // ignore
  }

  // 如果是旧版的 hex（只包含 0-9a-fA-F 且长度为偶数），直接当作 hex 处理
  let xorHex: string;
  if (/^[0-9a-fA-F]+$/.test(raw) && (raw.length % 2 === 0)) {
    xorHex = raw.toLowerCase();
  } else {
    // 新版：URL-safe Base64 -> 标准 Base64 -> 转为 hex
    const b64 = raw.replace(/-/g, '+').replace(/_/g, '/'); // 还原 Base64
    xorHex = Buffer.from(b64, 'base64').toString('hex'); // 将 Base64 转换为十六进制字符串
  }

  let result = '';
  for (let i = 0; i < xorHex.length; i += 2) {
    const vv = xorHex.substring(i, i + 2);
    const hexNum = parseInt(vv, 16);
    result += String.fromCharCode(hexNum ^ key.charCodeAt(i / 2 % key.length));
  }
  return utf8.decode(result);
}
