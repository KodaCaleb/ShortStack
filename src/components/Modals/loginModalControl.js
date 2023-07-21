import { useState } from 'react';

export default function LoginModalControl() {
    const [ modalDisplayed, setModalDisplayed] = useState(false);

    const changeModalDisplayed = () => {
        setModalDisplayed(!modalDisplayed);
    }

    return(
        <div className="flex flex-col items-center justify-center text-white">

        </div>
    )
}