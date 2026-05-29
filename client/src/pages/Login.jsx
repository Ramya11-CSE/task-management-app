import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/auth/login",
        formData
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      alert("Login Successful")

      navigate("/dashboard")

    } catch (error) {

      alert(error.response.data.message)

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* LEFT */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-10">

          <h1 className="text-5xl font-bold mb-6">
            Welcome Back
          </h1>

          <p className="text-lg text-center leading-8">
            Login to manage your tasks and stay productive every day.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="login"
            className="w-72 mt-8"
          />

        </div>

        {/* RIGHT */}
        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Login
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-gray-600 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-600 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login