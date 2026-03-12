import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";

interface Employee {
  id: number;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

interface Attendance {
  id: number
  employee: number
  employee_name: string
  date: string
  status: string
}

export default function Employees() {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([])

  // Attendance states
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");

  const [showEmployeeForm,setShowEmployeeForm] = useState(false)

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees()
    fetchAttendance()
  }, [])

  const handleAddOrUpdate = async (data: any) => {

    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
    } else {
      await addEmployee(data);
    }

    setEditingEmployee(null);
    setShowEmployeeForm(false);

    fetchEmployees();
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  console.log({
    employee: selectedEmployee?.id,
    date: date,
    status: status
  })

  // Mark attendance API
  const markAttendance = async () => {

    // validation
    if (!selectedEmployee) {
      alert("Employee not selected");
      return;
    }

    if (!date) {
      alert("Please select date");
      return;
    }

    try {

      const payload = {
        employee: selectedEmployee.id,
        date: date,
        status: status.toLowerCase()
      };

      console.log("Sending payload:", payload);

      const res = await fetch("https://hrms-lite-backend-4m9y.onrender.com/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("Attendance API response:", data);

      if (res.ok) {

        alert("Attendance marked successfully");

        setShowModal(false);
        setDate("");
        setStatus("present");

        fetchAttendance();

      } else {

        alert(JSON.stringify(data));

      }

    } catch (error) {

      console.error("Attendance error:", error);
      alert("Error marking attendance");

    }

  };

  const fetchAttendance = async () => {

    try {

      const res = await fetch("https://hrms-lite-backend-4m9y.onrender.com/api/attendance/all")

      const data = await res.json()

      setAttendanceRecords(data)

    } catch (error) {

      console.error("Error fetching attendance", error)

    }

  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        HR Management System
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold">{employees.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500">Attendance Records</p>
          <p className="text-2xl font-bold">{attendanceRecords.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500">Present Today</p>
          <p className="text-2xl font-bold">
            {attendanceRecords.filter(a => a.status === "present").length}
          </p>
        </div>

      </div>

      <button
        onClick={() => {
          setShowEmployeeForm(true);
          setEditingEmployee(null);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Employee
      </button>

      {showEmployeeForm || editingEmployee ? (

        <EmployeeForm
          onSubmit={handleAddOrUpdate}
          editingEmployee={editingEmployee}
        />

      ) : null}

      <table className="w-full border rounded-lg overflow-hidden shadow">

        <thead className="bg-gray-100">
          <tr className="hover:bg-gray-50">
            <th className="p-2 border">Employee ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-500">
                No employees added yet
              </td>
            </tr>

          ) : (

            employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">

                <td className="border p-2">{emp.employee_id}</td>
                <td className="border p-2">{emp.full_name}</td>
                <td className="border p-2">{emp.email}</td>
                <td className="border p-2">{emp.department}</td>

                <td className="border p-2 space-x-2">

                  <button
                    onClick={() => {
                      setEditingEmployee(emp);
                      setShowEmployeeForm(true);
                    }}
                    className="bg-yellow-400 px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setShowModal(true);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Mark
                  </button>

                </td>
              </tr>
            ))

          )}

        </tbody>
      </table>


      {/* Attendance Modal */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-xl font-bold mb-4">
              Mark Attendance
            </h2>

            <p className="mb-3">
              Employee: {selectedEmployee?.full_name}
            </p>

            <input
              type="date"
              className="border p-2 w-full mb-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              className="border p-2 w-full mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={markAttendance}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}


      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">Attendance Records</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendanceRecords.length === 0 ? (

              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-500">
                  No attendance records yet
                </td>
              </tr>

              ) : (

              attendanceRecords.map((record) => (

                <tr key={record.id}>

                  <td className="border p-2">
                    {record.employee_name}
                  </td>

                  <td className="border p-2">
                    {record.date}
                  </td>

                  <td className="border p-2">

                    {record.status === "present" ? (

                      <span className="text-green-600 font-semibold">
                        Present
                      </span>

                      ) : (

                      <span className="text-red-600 font-semibold">
                        Absent
                      </span>

                    )}

                  </td>

                </tr>

              ))

            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}