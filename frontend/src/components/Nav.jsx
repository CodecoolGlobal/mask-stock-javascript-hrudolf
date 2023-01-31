import { Link } from 'react-router-dom'

const Nav = ({ loggedIn, setLoggedIn, loggedUser, setLoggedUser }) => {

    return (
        <nav>
            <Link to='/'>Home</Link>
            {!loggedIn &&
                <>
                    <Link to='/register'>Sign up</Link>
                    <Link to='/login'>Log in</Link>
                </>}
            {loggedIn &&
                <>
                    <span>
                        {`${'loggedUser.username'}`}
                    </span>
                    <button onClick={() => {
                        setLoggedIn(false);
                        setLoggedUser({});
                        localStorage.removeItem('user');
                    }}>Log out</button>
                </>
            }
        </nav>
    );
}

export default Nav;