import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-400 p-8 flex flex-col items-center justify-center">
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-gray-800'>
          About the Owner
        </h1>
        <p className='text-gray-800'>Learn more about the person behind SOWMMYA-MALL.</p>
      </div>

      <div className='bg-white p-8 rounded-lg shadow-lg flex flex-col items-center'>
        <img
          src="/images/product10.png" // Placeholder image
          alt="Owner"
          className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-blue-500"
        />
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>K. Sowmya</h2>
        <p className='text-xl text-gray-700 mb-2'>M.C.A</p>
        <p className='text-lg text-gray-600 mb-1'>Contact No: 7386078298</p>
        <p className='text-lg text-gray-600'>Address: Goshamahal, Hyd-12, Telangana, India</p>
      </div>
    </div>
  );
}