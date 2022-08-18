import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

function encryptXor(text:string, key:string) {
    var result = '';

    for (var i = 0; i < text.length; i++) {

        console.log('text char:'+ text.charCodeAt(i).toString(16))
        console.log('key char:'+ key.charCodeAt(i % key.length).toString(16))

        var v =  (text.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16)
        if(v.length == 1){
          v = '0'+v
        }
        console.log('v:'+v)
        
        result += v
        console.log('res:'+result)
    }
    return result;
}

function deXor(hexStr:string, key:string) {

  var result = '';

  for (var i = 0; i < hexStr.length; i++,i++) {

    const v = hexStr.substring(i, i+2)
    console.log('bv:'+v)
    const hexNum = parseInt(v, 16)

    var vv =  String.fromCharCode(hexNum ^ key.charCodeAt((i/2) % key.length))

    result += vv

  }

  return result
  
}

const Home: NextPage = () => {

  const a = 'aaa@gmail.com'
  const k = '000xxxfff789'

  const b = encryptXor(a, k)
  console.log('b:'+b)

  const c = deXor(b, k)


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
