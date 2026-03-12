import { useState, useEffect } from "react";

export default function EmployeeForm({ onSubmit, editingEmployee }: any) {

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        full_name: editingEmployee.full_name,
        email: editingEmployee.email,
        department: editingEmployee.department,
      });
    }
  }, [editingEmployee]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      full_name: "",
      email: "",
      department: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">

      <h2 className="text-lg font-bold mb-2">
        {editingEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>

    </form>
  );
}