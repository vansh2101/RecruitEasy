import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import image from '../assets/hire.png';
import {get, post} from '../scripts/requests';

function ViewApplication() {
  if (!localStorage.getItem('token')){
      window.location = '/login'
  }

  const id = window.location.hash.replace('#', '')
  const token = localStorage.getItem('token')
  const [user, setUser] = useState({video: []})
  const [question, setQuestion] = useState([])

  useEffect(() => {
    (async () => {
      const res = await get(`https://recruiteasy.herokuapp.com/api/applicant/${id}`, token)
      setUser(res)

      const data = await get(`https://recruiteasy.herokuapp.com/api/interview/${res.interview}`, token)
      setQuestion(data.questions)
    })()
  }, [])

  return (
    <div className='overflow-y-hidden h-screen bg-gray-100'>
      <header className="text-blue-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                <Link to={`/applicants#${user.interview}`} className="flex title-font font-medium items-center text-blue-900 mb-4 md:mb-0">
                <span className="ml-3 text-xl">Go Back</span>
                </Link>
            </div>
        </header>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

    {/* Container */}
        <div className="container mx-auto">
            <div className="flex justify-center px-6 mt-3">

                {/* Row */}
                <div className="w-full xl:w-3/4 lg:w-2/5 flex">

                    {/* Col */}
                    <div className="w-full h-3/4 bg-gray-300 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg p-10 overflow-y-auto">
                      <h5 className="text-gray-500 text-sm leading-tight font-medium mb-0">Name</h5>
                      
                      <p className="text-black text-xl mb-3">
                          {user.name}
                      </p>

                      <h5 className="text-gray-500 text-sm leading-tight font-medium mb-0">Email</h5>
                      
                      <p className="text-black text-xl mb-3">
                          {user.email}
                      </p>

                      <h5 className="text-gray-500 text-sm leading-tight font-medium mb-0">Introduction</h5>
                      
                      <p className="text-black text-xl">
                          {user.desc}
                      </p>
                    </div>

                    {/* Col */}
                    <div className="w-full h-3/4 lg:w-3/5 bg-white p-5 pl-12 rounded-lg lg:rounded-l-none overflow-y-auto">
                      {question.map((item, key) => 
                        <>
                        <div className="-mx-3 md:flex mb-3">
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-black text-sm font-bold mb-2">
                                    {item}*
                                </label>
                            </div>
                        </div>

                        <video src={user.video[key]} controls className='w-4/5 h-72 mb-10' />
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ViewApplication