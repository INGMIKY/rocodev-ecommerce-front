import Cart from './Cart'
import AuthButtons from './AuthButtons'
import UserDropDown from './UserDropDown'
import { Link } from 'react-router'

const Navbar = () => {
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
                    <a href="" className="btn btn-primary">
                        Dashboard
                    </a>
                    <Cart />
                    <UserDropDown />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
