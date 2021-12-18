import 'firebase/auth';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './../../Firebase';


export const logFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const GoogleSignIn = () => {

    const provider = new firebase.auth.GoogleAuthProvider();


    return firebase.auth().signInWithPopup(provider)
        .then((res) => {

            const { displayName, photoURL, email } = res.user;
            const signedUser = {
                isSignedIn: true,
                name: displayName,
                mail: email,
                password: '',
                img: photoURL,
                success: true,
                createDate: res.user.metadata.creationTime,
            }
            return signedUser;

        })
        .catch(err => {
            console.log(err);
        })



}

export const handleSubmit = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateUserName(name);

            const newUser = {
                isSignedIn: true,
                name: name,
                mail: res.user.email,
                password: '',
                success: true,
                createDate: res.user.metadata.creationTime,
            }

            return newUser;
        })
        .catch((error) => {
            const newUserInfo = {};
            const errMsg = error.message;
            newUserInfo.success = false;
            newUserInfo.isSignedIn = false;
            console.log(newUserInfo, errMsg);
        });
}

export const handleSignIn = (mail, password) => {
    return firebase.auth().signInWithEmailAndPassword(mail, password)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const loggedUser =
            {
                isSignedIn: true,
                name: displayName,
                mail: email,
                password: '',
                img: photoURL,
                success: true,
                createDate: res.user.metadata.creationTime,
            }

            return loggedUser;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.isSignedIn = false;
            newUserInfo.success = false;
            console.log(error);
            return newUserInfo;
        })
}



export const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(() => {
        })
        .catch((err) => {
            console.log(err);
        })
}