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

const Dashboard = () => {

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
            <h1>This is Dashboard</h1>
            <>
                <h2>Welcome {loggedInUser.name}</h2>
                {
                    loggedInUser.photoURL &&
                    <img src={loggedInUser.img}
                        alt={loggedInUser.name}
                    />
                }
                <br />
                <button onClick={() => { history.push('/profile') }}>Go to Profile</button>
                <button onClick={signout}>Sign Out</button>
            </>
        </div >
    )
}

export default Dashboard
