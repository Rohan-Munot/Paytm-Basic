
// eslint-disable-next-line react/prop-types
import axios from "axios";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
export const Balance = () => {
    const [balance, setBalance] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => setBalance(res.data.balance))
    }, [])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}