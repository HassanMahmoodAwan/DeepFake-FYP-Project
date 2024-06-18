import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function Admin() {
    const [regUsers, setRegUsers] =  useState<number | string>("010")
    const [no_voiceOvers, setNo_voiceOvers] =  useState<number | string>("005")


    const users = [{
        id:'001',
        firstName: "Hassan",
        LastName: "Mahmood",
        Email: "hassanmahmudawan@gmail.com",  
    },
    {
        id:'002',
        firstName: "Ali",
        LastName: "Khan",
        Email: "alikhan@gmail.com",
 
    },
    {
        id:'003',
        firstName: "david",
        LastName: "bin",
        Email: "davidbin@gmail.com",
 
    },
    {
        id:'004',
        firstName: "Ahmad",
        LastName: "Ali",
        Email: "ahmadali@gmail.com",
 
    },
    {
        id:'005',
        firstName: "Khan",
        LastName: "Ali",
        Email: "khanali@gmail.com",
 
    },

]

const targetVoices = [{
    id:'001',
    firstName: "Wajahat",
    LastName: "Qazi",
    Profession:"Professor COMSATS", 
    sampleVoice: "Link", 
},
{
    id:'002',
    firstName: "Donald",
    LastName: "Trump",
    Profession:"American Politician", 
    sampleVoice: "link", 
},
{
    id:'003',
    firstName: "Danial",
    LastName: "Universal",
    Profession:"AI generated Voice", 
    sampleVoice: "link", 
},
{
    id:'004',
    firstName: "Muhammad",
    LastName: "Talha",
    Profession:"Student COMSATS", 
    sampleVoice: "link", 
},
{
    id:'005',
    firstName: "Emma",
    LastName: "Universal",
    Profession:"AI Generated Voice", 
    sampleVoice: "link", 
},


]


  return (
    <section className='w-full h-full  flex flex-col items-center '>
      <div className='w-[90%] flex flex-col items-center my-5 space-y-8'>

        <div id='Heading' className='mb-6'>
            <h1 className='text-2xl font-bold'> Admin DashBoard</h1>
            <div className='py-[2.3px] bg-ttsPurple rounded'></div>
        </div>

        {/* STATS */}
        <div className='w-[85%] flex justify-between'>
            {/* 0001 */}
            <div className='w-[12rem] h-[4.3rem] bg-white rounded-3xl shadow px-3 py-2 box-border space-y-[2px]'>
                <h1 className='text-md font-bold'>Registered Users</h1>
                <h3 className='text-base text-gray-500'>{regUsers}+</h3>
            </div>
            {/* 0002 */}
            <div className='w-[12rem] h-[4.3rem] bg-white rounded-3xl shadow px-3 py-2 box-border'>
                <h1 className='text-md font-bold'>No of Voice-overs</h1>
                <h3 className='text-base text-gray-500'>{no_voiceOvers}+</h3>
            </div>
            {/* 0003 */}
            <div className='w-[12rem] h-[4.3rem] bg-white rounded-3xl shadow px-3 py-2 box-border'>
                <h1 className='text-md font-bold'>Avg. Gen-Time</h1>
                <h3 className='text-base text-gray-500'>03 Minutes</h3>
            </div>
        </div>

        {/* USERS */}
        <div className='w-full h-auto rounded-xl px-10 py-1 space-y-3'>

            <h1 className='text-xl font-bold text-gray-950'>Registered Users:</h1>

            {/* Table will come here */}
            <div className="relative h-[260px] overflow-y-scroll  shadow-md sm:rounded-lg bg-black ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-md font-semibold text-black uppercase bg-gray-300">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        

                        {users.map( (user)=>(
                            <tr key={user.id} className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.id}
                                </th>
                                <td className="px-6 py-4">
                                    {user.firstName}
                                </td>
                                <td className="px-6 py-4">
                                    {user.LastName}
                                </td>
                                <td className="px-6 py-4">
                                    {user.Email}
                                </td>
                                <td className="px-6 py-4">
                                    <a id={user.id} href={'https://linktr.ee/DeepClonning'}target="_blank"> <FontAwesomeIcon icon={faTrashCan} className="text-xl text-ttsPurple cursor-pointer" /> </a>
                                </td>
                            </tr>
                        ) )}
                        
                    </tbody>
                </table>

            </div>

        </div>


        {/* Custom Voices */}
        <div className='w-full h-auto rounded-xl px-10 py-4 space-y-4'>

            <h1 className='text-xl font-bold text-gray-950'>Targets Voice-Overs </h1>

            
            {/* Table will come here */}
            <div className="relative h-[260px] overflow-y-scroll  shadow-md sm:rounded-lg bg-black ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-md font-semibold text-black uppercase bg-gray-300">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Profession
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SampleVoice
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        

                        {targetVoices.map( (each)=>(
                            <tr key={each.id} className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {each.id}
                                </th>
                                <td className="px-6 py-4">
                                    {each.firstName}
                                </td>
                                <td className="px-6 py-4">
                                    {each.LastName}
                                </td>
                                <td className="px-6 py-4">
                                    {each.Profession}
                                </td>
                                <td className="px-6 py-4">
                                    
                                    <a href={each.sampleVoice} className='text-blue-700 underline font-bold text-sm'>Link</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a id={each.id} href={'https://linktr.ee/DeepClonning'}target="_blank"> <FontAwesomeIcon icon={faTrashCan} className="text-xl text-ttsPurple cursor-pointer" /> </a>
                                </td>
                            </tr>
                        ) )}
                        
                    </tbody>
                </table>

            </div>

        </div>



      </div>
    </section>
  )
}

export default Admin
