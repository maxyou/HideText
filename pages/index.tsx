import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react';
import { enXorStr, deXorStr } from '../libs/encode'
import { getRandomAlphaNum } from '../libs/random'
import { sys } from '../config';

const Home: NextPage = () => {

  const [plainText, setPlainText] = useState('')
  const [xorKey, setXorKey] = useState('')
  const [finalLink, setFinalLink] = useState('')
  const [copyButtonText, setCopyButtonText] = useState('Copy')

  const router = useRouter()
  const { c, k } = router.query

  // console.log(`deXorStr ${c as string} with ${k as string}`)

  var result = useMemo(
    () => {
      return c && k && deXorStr(c as string, k as string) || ''
    },
    [c, k]
  )  

  const copyFinalLink = async () => {
    if ("clipboard" in navigator) {
      setCopyButtonText('Done!')
      await navigator.clipboard.writeText(finalLink);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCopyButtonText('Copy')
    } else {
      document.execCommand("copy", true, finalLink);
    }
  }

  const copyResult = async () => {
    if ("clipboard" in navigator) {
      setCopyButtonText('Done!')
      await navigator.clipboard.writeText(result);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCopyButtonText('Copy')
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

      <div className='bg-gray-100 w-screen h-screen flex flex-col justify-center items-center'>

        {
          c ?
            <div className='bg-white w-full sm:w-4/5 max-w-xl h-auto p-6 border rounded'>
              <div className='p-2'>
                <p className='w-auto h-auto break-all p-2 border rounded min-h-[4rem] hover:decoration-inherit'>
                  {result}
                </p>
              </div>
              <div className='p-2 flex flex-row justify-between'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                  onClick={copyResult}>{copyButtonText}</button>
                <div className='bg-white hover:text-blue-500 text-black p-2 border border-blue-600 rounded'>
                  <Link href={'/'}>
                    <a>Create my hidden text</a>
                  </Link>
                </div>
              </div>

            </div>
            :
            <div className='bg-white w-full sm:w-4/5 max-w-xl h-auto p-6 border rounded'>
              <div className='p-2'>
                <textarea className="shadow appearance-none border rounded w-full min-h-[10rem] p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
                  name="plainText" onChange={e => setPlainText(e.target.value)} value={plainText} placeholder="here your plain text" />
              </div>
              <div className='p-2 flex gap-2'>
                <input className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600"
                  type="text" name="xorKey" onChange={e => setXorKey(e.target.value)} value={xorKey} placeholder="key should be alphabet or numeric" >
                </input>
                <button className='bg-blue-500 min-w-fit hover:bg-blue-700 text-white p-2 rounded'
                  onClick={refreshKey}>Random Key</button>
              </div>
              <div className='p-2'>
                {
                  plainText && xorKey ?
                    <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                      onClick={genetateCipherText}>Generate</button>
                    :
                    <button className="bg-blue-500 text-white p-2 rounded opacity-50 cursor-not-allowed">Generate</button>
                }
              </div>

              {
                finalLink ?
                  <div>
                    <div className='p-2'>
                      <p className='w-auto h-auto break-all p-2 border rounded min-h-[4rem] hover:decoration-inherit'>
                        <a href={`${finalLink}`} className='underline decoration-transparent hover:decoration-inherit'>{finalLink}</a>
                      </p>
                    </div>
                    <div className='p-2'>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                        onClick={copyFinalLink}>{copyButtonText}</button>
                    </div>
                  </div>
                  : null
              }

            </div>
        }

        <div className='pt-4'>
          <a href={`${sys.proj_repo}`} className='text-sm text-blue-500 underline decoration-transparent hover:decoration-inherit'>goto project repository</a>
        </div>

      </div>
    </>
  )
}

export default Home
