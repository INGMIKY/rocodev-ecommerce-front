import Cart from './Cart'
import AuthButtons from './AuthButtons'
import UserDropDown from './UserDropDown'
import { Link } from 'react-router'
import { useUser } from '../../hooks/useUser'

const Navbar = () => {
    const { loading, userInfo } = useUser()

    // console.log(userInfo)
    // console.log(loading)
    return (
        <header>
            <AuthButtons />
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost text-xl">
                        E-commerce
                    </Link>
                </div>
                <div className="navbar-end gap-3">
                    {userInfo?.isAdmin && (
                        <a href="" className="btn btn-primary">
                            Dashboard
                        </a>
                    )}
                    <Cart />
                    {!loading && userInfo?.username && <UserDropDown />}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
