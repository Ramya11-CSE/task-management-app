import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-800">
            Organize Your Tasks <br />

            <span className="text-blue-600">
              Efficiently
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Manage daily tasks, track progress, and boost productivity
            with our modern task management application.
          </p>

          <div className="mt-8 flex gap-4">

            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
                Login
              </button>
            </Link>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/9068/9068670.png"
            alt="task"
            className="w-[400px] drop-shadow-2xl"
          />

        </div>

      </div>

    </div>
  )
}

export default Home