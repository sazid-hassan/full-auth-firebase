import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';

import {
    logFramework,
    GoogleSignIn,
    handleSubmit,
    handleSignIn
} from './SignManager/SignManage';

import { useContext, useState } from 'react';
import { UserContext } from '../App';

import {
    useHistory,
    useLocation
} from "react-router-dom";

function SignIn_Up() {

    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState([
        {
            isSignedIn: false,
            name: '',
            mail: '',
            password: '',
            img: '',
            success: false,
            createDate: '',

        }
    ]);
    var [errorMsg, setErrorMsg] = useState('');
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    logFramework();

    let { from } = location.state || { from: { pathname: "/dashboard" } }

    const handleBlur = (e) => {
        const newUserReq = { ...user };

        newUserReq[e.target.name] = e.target.value;
        setUser(newUserReq);
    }

    const hSubmit = (e) => {
        if (newUser && user.name && user.mail && user.password) {
            e.preventDefault();
            handleSubmit(user.name, user.mail, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.push(from);
                })
                .catch(error => {
                    setErrorMsg(error.message);
                });
        }
        if (!newUser && user.mail && user.password) {
            e.preventDefault();
            handleSignIn(user.mail, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.push(from);
                })
                .catch(error => {
                    setErrorMsg(error.message);
                });
        }
    }

    const gSign = () => {
        GoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.push(from);

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div style={{

            textAlign: 'center'
        }}>
            {
                !user.isSignedIn &&
                <>
                    <br />
                    <br />
                    <br />
                    <form onSubmit={hSubmit}>
                        {
                            newUser &&
                            <TextField
                                type='text'
                                placeholder='Name'
                                name='name'
                                onBlur={handleBlur}
                                variant="standard"
                                required
                            />
                        }
                        <br />
                        <br />
                        <TextField
                            type="email"
                            placeholder="Email"
                            name='mail'
                            onBlur={handleBlur}
                            variant="standard"
                            required
                        />
                        <br />
                        <br />
                        <TextField
                            type="password"
                            placeholder="Password"
                            name='password'
                            onBlur={handleBlur}
                            variant="standard"
                            required
                        />
                        <br />
                        <br />
                        <TextField type="submit" placeholder="Submit" />
                        <br />
                        <br />

                    </form>

                    {
                        errorMsg &&
                        <p style={{
                            color: 'red'
                        }}>{errorMsg}</p>
                    }

                    {
                        newUser &&

                        <Button
                            onClick={gSign}
                            variant="contained"
                            color="success"
                        >
                            <GoogleIcon />
                            Sign Up With Google
                        </Button>
                    }

                    {
                        !newUser &&

                        <Button
                            onClick={gSign}
                            variant="contained"
                        >
                            <GoogleIcon />

                            Sign In With Google
                        </Button>
                    }
                    <p>Or </p>
                    {
                        newUser &&
                        <Button
                            variant='contained'
                            onClick={() => setNewUser(!newUser)}
                        >
                            Sign In
                        </Button>
                    }
                    {
                        !newUser &&
                        <Button
                            variant='contained'
                            color="success"
                            onClick={() => setNewUser(!newUser)}
                        >
                            Sign Up
                        </Button>
                    }
                </>
            }
        </div>
    );
}

export default SignIn_Up;