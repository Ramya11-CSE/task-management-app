import { useEffect, useState } from "react"
import API from "../services/api"
import { toast } from "react-toastify"

function Dashboard() {

  // TASKS
  const [tasks, setTasks] = useState([])

  // SEARCH
  const [search, setSearch] = useState("")

  // FILTER
  const [filter, setFilter] = useState("All")

  // DARK MODE
  const [darkMode, setDarkMode] = useState(false)

  // EDIT STATES
  const [editId, setEditId] = useState(null)

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  })

  // FORM DATA
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  })

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token")

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTasks(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  // ADD TASK
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      await API.post(
        "/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Task Added Successfully")

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      })

      fetchTasks()

    } catch (error) {

      console.log(error)

    }
  }

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token")

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.error("Task Deleted")

      fetchTasks()

    } catch (error) {

      console.log(error)

    }
  }

  // UPDATE TASK STATUS
  const updateTask = async (id) => {

    try {

      const token = localStorage.getItem("token")

      await API.put(
        `/tasks/${id}`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Task Completed")

      fetchTasks()

    } catch (error) {

      console.log(error)

    }
  }

  // SAVE EDITED TASK
  const saveEditTask = async () => {

    try {

      const token = localStorage.getItem("token")

      await API.put(
        `/tasks/${editId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Task Updated")

      setEditId(null)

      fetchTasks()

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className={
      darkMode
        ? "min-h-screen bg-gray-900 text-white p-6"
        : "min-h-screen bg-gray-100 p-6"
    }>

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Task Dashboard
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-black text-white px-5 py-2 rounded-xl"
          >
            Toggle Dark Mode
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className={
            darkMode
              ? "bg-gray-800 p-6 rounded-2xl shadow-lg mb-10"
              : "bg-white p-6 rounded-2xl shadow-lg mb-10"
          }
        >

          <div className="grid md:grid-cols-3 gap-5">

            {/* TITLE */}
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-black"
            />

            {/* DESCRIPTION */}
            <input
              type="text"
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-black"
            />

            {/* STATUS */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-black"
            >

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
            Add Task
          </button>

        </form>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-5 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-black"
        />

        {/* FILTER */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-8 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-black"
        >

          <option value="All">
            All
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

        {/* EDIT POPUP */}
        {editId && (

          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-2xl w-96">

              <h2 className="text-2xl font-bold mb-4 text-black">
                Edit Task
              </h2>

              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mb-4 text-black"
              />

              <input
                type="text"
                value={editData.description}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    description: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mb-4 text-black"
              />

              <div className="flex gap-4">

                <button
                  onClick={saveEditTask}
                  className="bg-green-500 text-white px-5 py-2 rounded-xl"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}

        {/* TASKS */}
        <div className="grid md:grid-cols-3 gap-6">

          {tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((task) =>
              filter === "All"
                ? true
                : task.status === filter
            )
            .map((task) => (

              <div
                key={task._id}
                className={
                  darkMode
                    ? "bg-gray-800 p-6 rounded-2xl shadow-lg"
                    : "bg-white p-6 rounded-2xl shadow-lg"
                }
              >

                <h2 className="text-2xl font-bold mb-3">
                  {task.title}
                </h2>

                <p className="mb-4">
                  {task.description}
                </p>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                  {task.status}
                </span>

                {/* DELETE */}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="block mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  Delete
                </button>

                {/* COMPLETE */}
                <button
                  onClick={() => updateTask(task._id)}
                  className="block mt-3 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl"
                >
                  Mark Completed
                </button>

                {/* EDIT */}
                <button
                  onClick={() => {

                    setEditId(task._id)

                    setEditData({
                      title: task.title,
                      description: task.description,
                    })

                  }}
                  className="block mt-3 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  Edit
                </button>

              </div>

            ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard