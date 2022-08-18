import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'

function enXorStr(text:string, key:string) {
    
  var result = '';

  for (var i = 0; i < text.length; i++) {

    // console.log('text char:'+ text.charCodeAt(i).toString(16))
    // console.log('key char:'+ key.charCodeAt(i % key.length).toString(16))

    var vv =  (text.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16)
    if(vv.length == 1){
      vv = '0'+vv
    }
    
    // console.log('v:'+v)    
    result += vv
  }

  console.log(`enXorStr ${text} with ${key}, result:${result}`)
  return result;
}

function deXorStr(hexStr:string, key:string):string {

  console.log(`deXorStr hexStr:${hexStr} key:${key}`)

  var result = '';

  for (var i = 0; i < hexStr.length; i+=2) {

    const vv = hexStr.substring(i, i+2)
    // console.log('bv:'+v)
    const hexNum = parseInt(vv, 16)

    var v =  String.fromCharCode(hexNum ^ key.charCodeAt((i/2) % key.length))

    result += v

  }
  console.log(`deXorStr ${hexStr} with ${key}, result:${result}`)
  return result
  
}

function hexEncode(str:string){
  var hex, i;

  var result = "";
  for (i=0; i<str.length; i++) {
      hex = str.charCodeAt(i).toString(16);
      result += ("000"+hex).slice(-4);
  }

  return result
}
function hexDecode(str:string){
  var j;
  var hexes = str.match(/.{1,4}/g) || [];
  var back = "";
  for(j = 0; j<hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

const Home: NextPage = () => {

  const router = useRouter()
  const {xor, key} = router.query



  const a = '中文'
  const k = 'xyz012'
  const r = enXorStr(a,k)
  console.log(`==enXorStr ${a} with ${k}, result:${r}`)
  const r2 = deXorStr(r, k)  
  console.log(`==deXorStr ${r} with ${k}, result:${r2}`)
  console.log(`==check Str ${a.toString()} with ${k}, result:${r2}`)
  



  console.log(`deXorStr ${xor as string} with ${key as string}`)

  var result = 'xor and key must has one char'
  if(xor && key){
    
    result = deXorStr(xor as string, key as string)  
    console.log(`deXorStr ${xor} with ${key}, result:${result}`)
  
  }

  // const c = deXorStr(b, k)

  return (
    <>
      <Head>
        <title>purebbs-nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-gray-200 w-screen h-screen grid gap-2 place-content-center'>
        
        <div className='bg-green-500 w-full h-16'>
          xor str is {xor}
        </div>        
        <div className='bg-blue-500 w-full h-16'>
          key is {key}
        </div>
        <div className='bg-red-500 w-full h-16 p-2'>
          Your plain text is {result}
        </div>
        
        <div className='bg-yellow-500 w-full h-8'>
          {r2}  
        </div>
        <div className='bg-orange-500 w-full h-8'>
          {a}
        </div>
    </div>      
  </>
  )
}

export default Home
