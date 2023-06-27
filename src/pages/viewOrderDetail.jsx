import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";


const ViewOrderDetails = () => {

    const params = useParams();
    const firebase = useFirebase();

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
    },[firebase])

    console.log(orders);

    if(orders==null){
        return (
            <h1>Invalid</h1>
        )
    }
    else{


    return(
        <div className="container">
            <h1>Orders</h1>
            {orders.map((order) => {
                const data = order.data();
                return <div key={order.id} className="mt-5" style={{border : "1px solid" , padding : "10px"}}> 
                    <h5>Order By : {data.displayName}</h5>
                    <h6>Quantity : {data.qty}</h6>
                    <p>Email : {data.userEmail}</p>
                </div>
                })}
        </div>
    );
            }
};

export default ViewOrderDetails;