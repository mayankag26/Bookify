import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useFirebase } from "../context/firebase";

const BookCard = (props) => {

    const navigate = useNavigate();
    const firebase = useFirebase();
    const [url,setURL] = useState(null);

    useEffect(()=>{
        if(props.imageURL)
        firebase?.getImageUrl(props.imageURL)?.then((url)=>setURL(url));
    },[props.imageURL,firebase.user]);


    return (
            <Card style={{ width: '18rem', margin: "25px"}}>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This books has a title {props.name} and this book is sold by {props.displayName} and this book costs Rs. {props.price}
                </Card.Text>
                <Button onClick={(e) => navigate(props.link)} variant="primary">View</Button>
                </Card.Body>
            </Card>        
    )
};

export default BookCard;