import { Link, useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const logoutHandler = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (

    <nav className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

      <h1 className="text-4xl font-bold text-blue-600">
        Task Manager
      </h1>

      <div className="flex gap-8 text-xl font-semibold items-center">

        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar