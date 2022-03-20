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
  const [url, setUrl] = useState()
  const [email, setEmail] = useState()

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

      const res = await post('https://b2bc-2405-201-4004-a04c-d5aa-285f-10b0-3687.ngrok.io/api/interview/', token, {
          title: title,
          date: date,
          from_time: from,
          to_time: to,
          questions: question,
          host: user
      })

      setUrl(`${window.location.origin}/interview#${res.id}`)

      document.getElementById('modal').classList.remove('hidden')
  }

  const gohome = () => {
    window.location = '/'
  }

  const openshare = () => {
    document.getElementById('modal').classList.add('hidden')
    document.getElementById('share').classList.remove('hidden')
  }

  const sendmail = async () => {
    document.getElementById('sendbtn').disabled = true
    
    await post('https://b2bc-2405-201-4004-a04c-d5aa-285f-10b0-3687.ngrok.io/twilio/send/', token, {
        email: email,
        subject: 'Interview Invite',
        msg: `Hey!! <br>${localStorage.getItem('name')} has invited you to take their job interview. <br><a href=${url}>Click to give the interview</a>`
    })

    setEmail('')
    document.getElementById('sendbtn').disabled = false
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

        <div className="modal fade bg-black bg-opacity-60 fixed hidden top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="modal">
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none w-2/5 m-auto mt-48">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        Interview Scheduled Successfully
                        </h5>
                    </div>

                    <div className="modal-body relative p-4">
                        <p>
                            Your Interview Url is:-
                            <br />
                            <b><i>{url}</i></b>
                            </p>
                    </div>

                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={openshare}>
                        Share Interview Link
                        </button>

                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={gohome}>
                        Go Back To home
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade bg-black bg-opacity-60 fixed hidden top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="share">
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none w-2/5 m-auto mt-48">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        Share Link
                        </h5>

                        <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" onClick={gohome}>X</button>
                    </div>

                    <div className="modal-body relative p-4">
                        <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Enter Email of Applicant" onChange={(val) => setEmail(val.target.value)} value={email} />
                    </div>

                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={sendmail} id='sendbtn'>
                        Send Mail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create