import React from 'react';

function payment() {

    const orderId=45896588
	const name="Just For You Mom Ribbon Cake"
	const amount="4500"
    //4916217501611292
  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '1218554', // Replace your Merchant ID
    return_url: 'http://sample.com/return',
    cancel_url: 'http://sample.com/cancel',
    notify_url: 'http://sample.com/notify',
    order_id: orderId,
    items: name,
    amount: amount, 
    currency: 'LKR',
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'anushka.darshana01@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South', // optional field
    delivery_city: 'Kalutara', // optional field
    delivery_country: 'Sri Lanka', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
  };
    
  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
  };

  function pay(){
    window.payhere.startPayment(payment);
  }


    return (
        <>
        <div className="main">
      

    <div className="OnGoing">
    <div className="ONG" >student member</div>
            <button onClick={pay}>Pay with Payhere</button>;

    </div>
    </div>
        </>
    )
}



export default payment