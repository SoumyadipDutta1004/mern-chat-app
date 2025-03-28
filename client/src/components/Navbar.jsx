import { BiLogOut, BiMessageSquare, BiUser } from "react-icons/bi";
import { Link } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { CiSettings } from "react-icons/ci";




export default function Navbar() {

  const { authUser, logout } = useAuthStore();

  return (
    <header className="w-full px-4 h-16 bg-gray-900">
      <nav className="container mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <BiMessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">

            {authUser && (
              <>
                <Link to={"/settings"} className='btn btn-sm gap-2 transition-colors cursor-pointer'>
                  <CiSettings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <Link to={"/profile"} className='btn btn-sm gap-2 cursor-pointer'>
                  <BiUser className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                  <BiLogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
      </nav>
    </header>
  );
}
