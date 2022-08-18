import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

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

  console.log(`enXorStr ${text} with ${key}, get result:${result}`)
  return result;
}

function deXorStr(hexStr:string, key:string) {

  var result = '';

  for (var i = 0; i < hexStr.length; i+=2) {

    const vv = hexStr.substring(i, i+2)
    // console.log('bv:'+v)
    const hexNum = parseInt(vv, 16)

    var v =  String.fromCharCode(hexNum ^ key.charCodeAt((i/2) % key.length))

    result += v

  }
  console.log(`deXorStr ${hexStr} with ${key}, get result:${result}`)
  return result
  
}

const Home: NextPage = () => {

  const a = '000111aaa@gmail.com'
  const k = 'z'

  const b = enXorStr(a, k)  

  const c = deXorStr(b, k)


  return (
    <>
      <Head>
        <title>purebbs-nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-gray-200 w-screen h-screen grid gap-2 place-content-center'>
        <div className='bg-red-500 w-full h-16 p-2'>
          {a}
        </div>
        <div className='bg-green-500 w-full h-16'>
          {b}
        </div>        
        <div className='bg-blue-500 w-full h-16'>
          {c}
        </div>
        {/* <div className='bg-yellow-500 w-32 h-8'>
          测试
        </div>
        <div className='bg-orange-500 w-32 h-8'>
          测试
        </div> */}
    </div>      
  </>
  )
}

export default Home
