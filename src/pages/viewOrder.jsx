import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/card";

const OrderPage = () => {

    const firebase = useFirebase();
    const [books,setBooks] = useState([]);

    useEffect(() => {
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs))
    },[firebase,firebase.user])

    console.log(books.docs);

    if(!firebase.isLoggedIn) return <h1>Please log in</h1>
    
    return (
        <div>
            {books.map((book) => (
                <BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
            ))}
        </div>
    );
};

export default OrderPage;