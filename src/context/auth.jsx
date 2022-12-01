import React, { useEffect } from 'react';
import supabaseClient, { signInWithGithub } from '../supabaseClient.js';

const AuthContext = React.createContext(undefined);

const AuthProvider = (props) => {
	const [auth, setAuth] = React.useState(null);

	useEffect(() => {
		supabaseClient.auth.onAuthStateChange((event, session) => {
			setAuth(session);
		});

		if(!auth) {
			supabaseClient.auth.getSession().then(response => {
				if(!response.data.session) return;

				setAuth(response.data.session);
			});
		}
	}, []);

	const login = async () => {
		try {
			await signInWithGithub();
		} catch (e) {
			console.error(e);
		}
	};

	const signOut = async () => {
		try {
			await supabaseClient.auth.signOut();
		} catch (e) {
			console.error(e);
		}
	};

	const value = { auth, login, signOut }

	return <AuthContext.Provider value={value} {...props} />
}

export { AuthContext, AuthProvider }
