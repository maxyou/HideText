import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useState } from 'react';
const utf8 = require('utf8');

//work well: http://localhost:3001/?xor=48494a01000319181b70565f1910161e525d15&key=xyz012

function enXorStr(txt:string, key:string) {

  const text = utf8.encode(txt)
  
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
  return utf8.decode(result) 
  
}


const Home: NextPage = () => {
  const [plainText, setPlainText] = useState('')
  const [xorKey, setXorKey] = useState('')
  const [cipherText, setCipherText] = useState('')

  // const a = 'aaa'
  // const b = 'abc中文123'

  // const aa = enXorStr(a, '123')
  // const bb = enXorStr(b, '123')

  // console.log(`==== enXorStr - aa:${aa}, bb:${bb}`)

  // const aaa = deXorStr(aa, '123')
  // const bbb = deXorStr(bb, '123')
  
  // console.log(`==== deXorStr - aa:${aaa}, bb:${bbb}`)

  const router = useRouter()
  const {xor, key} = router.query


  console.log(`deXorStr ${xor as string} with ${key as string}`)

  var result = 'xor and key must has one char'
  if(xor && key){
    
    result = deXorStr(xor as string, key as string)  
    console.log(`deXorStr ${xor} with ${key}, result:${result}`)
  
  }

  // const c = deXorStr(b, k)

  const genetateCipherText = async () => {
    setCipherText(enXorStr(plainText, xorKey))
  }

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
          {result}
        </div>
        
        <div className='bg-yellow-500 w-full h-8'>
          
        </div>
        <div className='bg-orange-500 w-full h-42'>
          <div className='p-2'>
            <input className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" name="plainText" onChange={e => setPlainText(e.target.value)} value={plainText} />
          </div>
          <div className='p-2'>
            <input className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" name="xorKey" onChange={e => setXorKey(e.target.value)} value={xorKey} />
          </div>
          <div className='p-2'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
              onClick={genetateCipherText}>generate</button>
          </div>
          <div className='p-2'>
            http://localhost:3001/?xor={cipherText}&key={xorKey}            
          </div>
        </div>
    </div>      
  </>
  )
}

export default Home
