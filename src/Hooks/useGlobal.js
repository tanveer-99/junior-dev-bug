import axios from "axios";
import { useState } from "react";
import countryCode from "../Features/Checkout/Data/countryCode.json";
const useGlobal = () => {
  const [open, setOpen] = useState(false);
  const [mbCode, setMbCode] = useState(countryCode[15]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleModal = () => setOpen(!open);

  const getPayment = (body) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bkash/createPayment`, { ...body, totalPrice }, 
    {
      //for the cors issue
      headers: {
        "Access-Control-Allow-Origin": "*",
        'content-type': 'application/json'
      }
    })
    .then(res => {
      const email = res.config.data?.email;
      const paymentID = res.data;
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bkash/execute/?email=${email}&totalPrice=${totalPrice}&paymentID=${paymentID}`, {...body, totalPrice},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'content-type': 'application/json'
        }
      })
      .then(res => console.log(res))

    });
   
    
  }
  return {
    toggleModal,
    open,
    setMbCode,
    mbCode,
    getPayment,
    totalPrice,
    setTotalPrice,
  };
};
export default useGlobal;
