import { useContext } from 'react';
import { UserContext } from '../../App';


import {
    Route,
    Redirect
} from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    loggedInUser.isSignedIn ? (children) : (
                        <Redirect
                            to={{
                                pathname: '/signup',
                                state: { from: location }
                            }}
                        />
                    ))
            }
        />
    );
}

export default PrivateRoute;