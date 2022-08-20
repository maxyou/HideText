import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { useState } from 'react';
import { enXorStr, deXorStr } from '../libs/encode'
import { getRandomAlphaNum } from '../libs/random'

const Home: NextPage = () => {

  // console.log(`test random - ${getRandomAlphaNum(8)}`)

  const [plainText, setPlainText] = useState('')
  const [xorKey, setXorKey] = useState('')
  const [cipherText, setCipherText] = useState('')
  const [finalLink, setFinalLink] = useState('')

  const router = useRouter()
  const {xor, key} = router.query

  console.log(`deXorStr ${xor as string} with ${key as string}`)

  var result = 'xor and key must has one char'
  if(xor && key){    
    result = deXorStr(xor as string, key as string)  
    // console.log(`deXorStr ${xor} with ${key}, result:${result}`)  
  }
  const copyFinalLink = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(finalLink);
    } else {
      document.execCommand("copy", true, finalLink);
    }
  } 
  const refreshKey = async () => {   
    setXorKey(getRandomAlphaNum(8))
  }
  const genetateCipherText = async () => {

    const encoded = enXorStr(plainText, xorKey)

    setFinalLink(`http://localhost:3000/?xor=${encoded}&key=${xorKey}`)    
    setCipherText(encoded)
  }

  return (
    <>
      <Head>
        <title>hide your text</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-gray-200 w-screen h-screen grid gap-2 place-content-center'>
        
        {
          xor?
          <div>
            <div className='bg-red-500 max-w-3xl p-2'>
                <p className='w-auto h-auto break-all'>              
                  {result}
                </p>
            </div>        
            
            <Link href={'/'}>
              <a>create my covered text</a>
            </Link>
          </div>
          :
          <div className='bg-orange-500 max-w-3xl h-auto'>
            <div className='p-2'>
              <textarea className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="plainText" onChange={e => setPlainText(e.target.value)} value={plainText} />
            </div>
            <div className='p-2'>
              <input className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" name="xorKey" onChange={e => setXorKey(e.target.value)} value={xorKey} />
            </div>
            <div className='p-2'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded' 
                onClick={genetateCipherText}>generate</button>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded' 
                onClick={refreshKey}>refresh key</button>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded' 
                onClick={copyFinalLink}>copy</button>
            </div>
            <div className='p-2'>
              <p className='w-auto h-auto break-all'>                
                {finalLink}
              </p>
            </div>
          </div>
        }

        



    </div>      
  </>
  )
}

export default Home
