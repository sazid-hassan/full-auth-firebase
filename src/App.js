import { createContext, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import Nav from './Components/Navbar/Nav';
import Home from './Home';
import SignInUp from './Pages/SignIn_Up';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import './App.css';


import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from './Pages/List';


export const UserContext = createContext();

function App() {

	const [billAmount, setBillAmount] = useState(0);
	const [loggedInUser, setLoggedInUser] = useState({});


	return (
		<UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
			<Router>
				<Nav />
				<Container>
					<Box>
						<Fab
							variant="extended"
							size="medium"
							color="success"
							aria-label="add"
							style={{
								float: 'right',

							}}
						>
							{billAmount}৳
						</Fab>

					</Box>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/signup">
							<SignInUp />
						</Route>
						<PrivateRoute exact path="/dashboard">
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute exact path="/profile">
							<List />
						</PrivateRoute>
					</Switch>
				</Container>
			</Router>

		</UserContext.Provider>
	);
}

export default App;
