import { useAuth } from './hooks/useAuth.js';

function TopLevelNav() {
	const {auth, login, signOut} = useAuth();

	return (
		<div className="navigation">
			{!auth?.user ?
				<button
					className="button"
					onClick={login}
				>
					<span>Log in with GitHub</span>
				</button> :
				<button className="button" onClick={signOut}>Sign out</button>
			}
		</div>
	)
}

export default TopLevelNav
