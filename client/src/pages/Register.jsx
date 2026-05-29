import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      alert("Registration Successful")

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
            Join Us
          </h1>

          <p className="text-lg text-center leading-8">
            Create your account and start managing your tasks smarter.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/4202/4202843.png"
            alt="register"
            className="w-72 mt-8"
          />

        </div>

        {/* RIGHT */}
        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Register
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-gray-600 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

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
                placeholder="Create password"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition">
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Register