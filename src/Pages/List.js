import React, { useContext } from 'react'
import { UserContext } from '../App'

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../Firebase';

import {
    useHistory
} from "react-router-dom";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const List = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();

    const signout = () => {
        firebase.auth().signOut()
            .then(res => {
                const outUser = {

                    isSignedIn: false,
                    name: '',
                    mail: '',
                    password: '',
                    img: '',
                    success: false

                }
                setLoggedInUser(outUser);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>This is Profile</h1>
            <>
                <h2>Your Name is : {loggedInUser.name}</h2>
                <p>Your Email address is : {loggedInUser.mail}</p>
                <p>Account Created : {loggedInUser.createDate}</p>
                <br />
                <button onClick={() => { history.push('/dashboard') }}>Go to Dashboard</button>

                <button onClick={signout}>Sign Out</button>
            </>
        </div>
    )
}

export default List
