import React, {useState} from 'react'
import '../styles/output.css';
import {get, post} from '../scripts/requests';

function Create() {
    if (!localStorage.getItem('token')){
        window.location = '/login'
    }
    
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const [count, setCount] = useState([null])
  const [title, setTitle] = useState()
  const [date, setDate] = useState()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [question, setQuestion] = useState([])

  const increaseCount = () => {
      setCount(prev => {
          return [null, ...prev]
      })
  }

  const ques = (key,val) => {
    setQuestion(prev => {
        prev[key] = val
        return prev
    })
  }

  const submit = async (e) => {
      e.preventDefault()

      const res = await post('http://localhost:8000/api/interview/', token, {
          title: title,
          date: date,
          from_time: from,
          to_time: to,
          questions: question,
          host: user
      })

      console.log(`http://localhost:3000/interview#${res.id}`)

      window.location = '/'
  }

  return (
    <div className='bg-gray-100 flex bg-local'>
        <div className="bg-gray-100 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mt-10">
            <form>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

                    <div className="-mx-3 md:flex mb-1">
                        <div className="md:w-full px-3">
                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                Title*
                            </label>
                            <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Interview Title" onChange={(val) => setTitle(val.target.value)} />
                        </div>
                    </div>

                    <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                Date*
                            </label>
                            
                            <div>
                                <input type='date' className="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" onChange={(val) => setDate(val.target.value)} />
                            </div>
                        </div>

                        <div className="md:w-1/2 px-3">
                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                Start Time*
                            </label>

                            <div>
                                <input type='time' className="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" onChange={(val) => setFrom(val.target.value)} />
                            </div>
                        </div>

                        <div className="md:w-1/2 px-3">
                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                End Time*
                            </label>

                            <div>
                                <input type='time' className="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" onChange={(val) => setTo(val.target.value)} />
                            </div>
                        </div>
                    </div>

                    {count.map((item, key) => 
                        <div className="-mx-3 md:flex" key={key}>
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                    Question {key+1}*
                                </label>
                                <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Type your question here.." onChange={(val) => ques(key, val.target.value)} />
                            </div>
                        </div>
                    )}

                    <button type="button" className=" inline-block p-2 bg-gray-900 text-white font-medium text-2xl leading-tight rounded shadow-md focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out w-12" onClick={increaseCount}>+</button>

                    <div className="-mx-3 md:flex mt-8">
                        <div className="md:w-full px-3">
                            <button className="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full" onClick={submit}>
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
  )
}

export default Create