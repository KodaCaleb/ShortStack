import React from 'react';


export default function AccountModal({ isOpen, closeModal, toggleModalMode }) {
    return (
        <>
         <div className="flex flex-col items-center justify-center text-yellow-500 ">
        <h3 className="pt-4 text-2xl text-center"> View Account Info</h3>
        <form
          className="relative flex flex-col  bg-black text-white rounded shadow-lg p-12 mt-12 border border-white"
          action=""
        >
          <div className="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
              <label
                class="block mb-2 text-sm font-bold text-gray-700"
                for="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="md:ml-2">
              <label
                class="block mb-2 text-sm font-bold text-gray-700"
                for="lastName"
              >
                Last Name
              </label>
              <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="usernameField"
          >
            {" "}
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text" placeholder="Email"
          />
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="passwordField"
          >
            {" "}
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password" placeholder="password"
          />
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="phoneNumberField"
          >
            {" "}
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text" placeholder="phoneNumber"
          />
              <div className="flex mt-6 justify-center text-xs">
            <a href="#" className="text-blue-499 hover:text-yellow-300" onClick={toggleModalMode}>
              Delete Account
            </a>
          </div>
          <div className="flex items-center justify-center">
          <button className="flex items-center justify-center h-12 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-yellow-300">
            Save Changes
          </button>
          </div>
          <button className=" absolute top-2 right-2 px-2 py-2" onClick={closeModal}>
           X
          </button>
        </form>
      </div>
    </>
    );
};

  
//     return (
//         <div className="h-screen">
//             <p className="text-white">This is my account!</p>
//         </div>
//     )
// }
