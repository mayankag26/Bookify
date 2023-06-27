import {createContext, useContext, useState, useEffect, cloneElement} from "react";
import {initializeApp} from "firebase/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth"
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,query,where} from "firebase/firestore"
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCae2XvsbKAtSwhDwE6bhKLFhErr2p7Y5o",
    authDomain: "bookify-b16e3.firebaseapp.com",
    projectId: "bookify-b16e3",
    storageBucket: "bookify-b16e3.appspot.com",
    messagingSenderId: "362834088792",
    appId: "1:362834088792:web:00b17179b424aaefc00b2d"
  };

  export const useFirebase = () => useContext(FirebaseContext);
  
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const googleProvider = new GoogleAuthProvider();

    export const FirebaseProvider = (props) => {

    const [user,setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user) => {
            if(user) setUser(user);
            else setUser(null);
        });
    },[]);

    const signUpUserWithEmailAndPassword = (email,password) => 
        createUserWithEmailAndPassword(firebaseAuth,email,password);

    const signInUserWithEmailAndPassword = (email,password) =>
        signInWithEmailAndPassword(firebaseAuth,email,password);   
        
    const signInWithGoogle = () => signInWithPopup(firebaseAuth,googleProvider);    

    const handleCreateNewListing = async(name,isbn,price,coverPic) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadResult = await uploadBytes(imageRef,coverPic);
        return await addDoc(collection(firestore,"books"),{
            name,
            isbn,
            price, 
            imageURL : uploadResult.ref.fullPath,
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL,
        })

    };

    const listAllBooks = () => {
        return getDocs(collection(firestore,"books"));
    }

    const getBookById = async(id) => {
        const docRef = doc(firestore, 'books',id);
        const result = await getDoc(docRef);
        return result;
    }

    const getImageUrl = (path) => {
        return getDownloadURL(ref(storage,path));
    }

    const placeOrder = async(bookId,qty) => {
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await addDoc(collectionRef, {
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL,   
            qty : Number(qty),          
        });
        return result;
    };

    const fetchMyBooks = async(userId) => {
        const collectionRef = collection(firestore,"books");
        // console.log(user);
        // console.log(isLoggedIn);
        const q = query(collectionRef,where("userID","==",userId));
        const result = await getDocs(q);
        return result;
    };

    const getOrders = async(bookId) => {
        const collectionRef = collection(firestore,'books',bookId,'orders');
        const result = await getDocs(collectionRef);
        return result;
    }

    const isLoggedIn = user?true:false; 

    return (
        <FirebaseContext.Provider value={{signUpUserWithEmailAndPassword,signInUserWithEmailAndPassword,signInWithGoogle,isLoggedIn,handleCreateNewListing,listAllBooks,getImageUrl,getBookById,placeOrder,fetchMyBooks,user,getOrders}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}; 