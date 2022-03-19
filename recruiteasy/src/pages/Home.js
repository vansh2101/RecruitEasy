import React from 'react';
import '../styles/output.css';
import {get, post} from '../scripts/requests';


function Home() {
  return (
    <>
    <header className="text-blue-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

            <a className="flex title-font font-medium items-center text-blue-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">RecruitEasy</span>
            </a>

            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 text-lg hover:text-blue-900" href="#">Profile</a>
            <a className="mr-5 text-lg hover:text-blue-900" href="#">Archives</a>
            </nav>

            <button className="inline-flex text-lg items-center bg-blue-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-200 rounded text-base mt-4 md:mt-0">Logout</button>
        </div>
    </header>

    <br />
    <br />
    <br />

    {/* Card */}

    <div className="flex justify-center">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Create an Interview</h5>

            <p className="text-gray-700 text-base mb-4">
            Create an Interview by add here.
            </p>

            <button type="button" className=" inline-block px-6 py-4 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">+</button>
        </div>

        <div style={{color: 'white'}}> More Space for Divs</div>

        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Upcoming/ Ongoing Interviews</h5>
            
            <p className="text-gray-700 text-base mb-4">
                View your upcoming/ ongoing interviews
            </p>

            <button type="button" className=" inline-block px-6 py-4 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">+</button>
        </div>
    </div>
    </>
  )
}

export default Home