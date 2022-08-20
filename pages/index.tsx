import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { enXorStr, deXorStr } from '../libs/encode'
import { getRandomAlphaNum } from '../libs/random'
import { sys } from '../config';

const Home: NextPage = () => {

  const [plainText, setPlainText] = useState('')
  const [xorKey, setXorKey] = useState('')
  const [finalLink, setFinalLink] = useState('')

  const router = useRouter()
  const { c, k } = router.query

  console.log(`deXorStr ${c as string} with ${k as string}`)

  var result = ''
  if (c && k) {//useMemo
    result = deXorStr(c as string, k as string)
    // console.log(`deXorStr ${xor} with ${key}, result:${result}`)  
  }

  const copyFinalLink = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(finalLink);
    } else {
      document.execCommand("copy", true, finalLink);
    }
  }
  
  const copyResult = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(result);
    } else {
      document.execCommand("copy", true, result);
    }
  }

  const refreshKey = async () => {
    setXorKey(getRandomAlphaNum(8))
  }
  
  const genetateCipherText = async () => {

    const encoded = enXorStr(plainText, xorKey)

    setFinalLink(`${sys.host_domain}/?c=${encoded}&k=${xorKey}`)
    
  }

  return (
    <>
      <Head>
        <title>hide your text</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-gray-100 w-screen h-screen flex flex-row justify-center items-center'>

        {
          c ?
            <div className='bg-white w-1/2 max-w-2xl 	min-w-[30rem] h-auto p-6 border rounded'>
              
              <div className='p-2'>
                <p className='w-auto h-auto break-all p-2 border rounded min-h-[4rem] hover:decoration-inherit'>
                {result}
                </p>                
              </div>
              <div className='p-2 flex flex-row justify-between'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                  onClick={copyResult}>Copy</button>
                <div className='bg-white hover:text-blue-500 text-black p-2 border border-blue-600 rounded'>
                  <Link href={'/'}>
                    <a>Create my hidden text</a>
                  </Link>
                </div>
              </div>

            </div>
            :
            <div className='bg-white w-1/2 max-w-2xl 	min-w-[30rem] h-auto p-6 border rounded'>
              <div className='p-2'>
                <textarea className="shadow appearance-none border rounded w-full min-h-[10rem] p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
                  name="plainText" onChange={e => setPlainText(e.target.value)} value={plainText} />
              </div>
              <div className='p-2 flex gap-2'>
                <input className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
                  type="text" name="xorKey" onChange={e => setXorKey(e.target.value)} value={xorKey} placeholder="key should be alphabet or numeric" >                    
                  </input>
                <button className='bg-blue-500 min-w-fit hover:bg-blue-700 text-white p-2 rounded'
                  onClick={refreshKey}>Random Key</button>
              </div>
              <div className='p-2'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                  onClick={genetateCipherText}>Generate</button>
                
              </div>
              <div className='p-2'>
                <p className='w-auto h-auto break-all p-2 border rounded min-h-[4rem] hover:decoration-inherit'>
                  <a href={`${finalLink}`} className='underline decoration-transparent hover:decoration-inherit'>{finalLink}</a>
                </p>                
              </div>
              <div className='p-2'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                  onClick={copyFinalLink}>Copy</button>
              </div>
            </div>
        }





      </div>
    </>
  )
}

export default Home
