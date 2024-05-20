import React from 'react'

function Admin() {
  return (
    <section className='w-full h-full  flex flex-col items-center '>
      <div className='w-[90%] flex flex-col items-center my-10 space-y-14'>

        {/* STATS */}
        <div className='w-[85%] flex justify-between'>
            {/* 0001 */}
            <div className='w-[13rem] h-[4.5rem] bg-gray-300 rounded  '>
                Hello
            </div>
            {/* 0002 */}
            <div className='w-[13rem] h-[4.5rem] bg-gray-300 rounded  '>
                Hello
            </div>
            {/* 0003 */}
            <div className='w-[13rem] h-[4.5rem] bg-gray-300 rounded  '>
                Hello
            </div>
        </div>

        {/* USERS */}
        <div className='w-full h-auto rounded-xl p-10 space-y-6'>

            <h1 className='text-2xl font-bold'>USERS</h1>

            {/* Table will come here */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-md font-semibold text-black uppercase bg-gray-300">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Google Pixel Phone
                            </th>
                            <td className="px-6 py-4">
                                Gray
                            </td>
                            <td className="px-6 py-4">
                                Phone
                            </td>
                            <td className="px-6 py-4">
                                $799
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-50  even:bg-gray-100 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple Watch 5
                            </th>
                            <td className="px-6 py-4">
                                Red
                            </td>
                            <td className="px-6 py-4">
                                Wearables
                            </td>
                            <td className="px-6 py-4">
                                $999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>



      </div>
    </section>
  )
}

export default Admin
