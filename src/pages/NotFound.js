import React from 'react';

export default function NotFound() {
    return(
        <div className="bg h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <h1 className="text-white title m-5">short_Stack</h1>
            </div>
            <p class="text-yellow-300 font-roboto text-center m-5">404 Error</p>
                <p class="text-yellow-300 font-roboto text-center m-5">OOPS... BUTTER go back and try again!</p>
        </div>
    );
};