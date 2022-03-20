import React, {useEffect, useState} from 'react';
import '../styles/output.css';
import {get, post} from '../scripts/requests';
import {Link} from 'react-router-dom';


function Applicants() {
  if (!localStorage.getItem('token')){
      window.location = '/login'
  }

  const id = window.location.hash.replace('#', '')
  const token = localStorage.getItem('token')
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
      (async () => {
          const res = await get('http://localhost:8000/api/applicant/', token, {interview: id})

          setApplicants(res)
      })()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    window.location = '/login'
}

  return (
    <div className='bg-gray-100 h-screen'>
        <header className="text-blue-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                <Link to='/' className="flex title-font font-medium items-center text-blue-900 mb-4 md:mb-0">
                <span className="ml-3 text-xl">RecruitEasy</span>
                </Link>

                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <a className="mr-9 text-lg hover:text-blue-900" href="#">Profile</a>
                <a className="mr-9 text-lg hover:text-blue-900" href="#">Archives</a>
                </nav>

                <button className="inline-flex text-lg items-center bg-blue-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-200 rounded text-base mt-4 mr-4 md:mt-0" onClick={logout}>Logout</button>
            </div>
        </header>

        <div className="container flex justify-center mx-auto pt-20">
            <div className="flex flex-col">
                <div className="w-screen">
                    <div className="border-gray-200">
                        <table className='w-9/12 m-auto'>
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        S. No.
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Email
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500" colSpan={2}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {applicants.map((item, key) => 
                                <tr className="whitespace-nowrap" key={key}>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {key+1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={{pathname: '/applicant', hash: `${item.id}`}}>
                                        <div className="text-sm text-gray-900">
                                            {item.name}
                                        </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{item.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="px-4 py-1 text-sm text-white bg-red-400 rounded w-1/2">Fail</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="px-4 py-1 text-sm text-white bg-blue-400 rounded w-1/2">Pass</button>
                                    </td>
                                </tr>
                                )}
        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Applicants