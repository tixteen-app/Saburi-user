import React, { useState } from 'react'
import {makeApi} from '../../api/callApi.tsx'
import axios from 'axios'

function Razorpay() {

    // razorpay testing
    const [responseId , setResponseId] = useState("")
    const [responseState , setResponseState] = useState([])

    // load razorpay script 
    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');

            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        })
    }

    const CreateRazorpayOrder = async(amount) => {
        let data = JSON.stringify({
            amount: amount * 100,
            currency: "INR",
        })
        let config = {
            method: "POST",
            url: "http://localhost:7000/api/create-razorpay-order",
            headers: {
                "content-type": "application/json",
            },
            data: data
        }

        axios.request(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
                handelRazorpayScreen(response.data.amount)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handelRazorpayScreen = async(amount) => {
        const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK failed to load")
            return
        }

        const options = {
            key: "rzp_test_DaA1MMEW2IUUYe",
            currency: "INR",
            amount: amount, 
            name: "Vaibhav ",
            description: "vaibhav test Transaction",
            image: "https://example.com/your_logo",
            order_id: responseId,
            handler: function (response) {
                setResponseId(response.data.id)

                console.log(response)
                alert(response.razorpay_payment_id)
            },
            prefill: {
                name: "VAibhav ",
                email: "fZ5vA@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const paymentFetch = async(e) => {
        e.preventDefault()
        const PaymentID = e.target.paymentId.value
        axios.get(`http://localhost:7000/api/get-razorpay-payment-details/${PaymentID}`)
            .then(function (response) {
                console.log(response.data)
                setResponseState(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


  return (
    <div>

    <button onClick={() => CreateRazorpayOrder(1000)}>Razorpay payment of 1000 </button>
    {responseId && <div>{responseId}</div>}
    <h1>payment veification </h1>
        <form onSubmit={paymentFetch}>
            <input type="text" name="paymentId" />
            <button type="submit">Fetch</button>
        </form>
        {responseState && <div>{responseState.status}</div>}

    </div>
  )
}

export default Razorpay