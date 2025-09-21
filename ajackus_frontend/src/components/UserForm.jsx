import React, { useState, useEffect } from "react";

function UserForm({ API_URL, editingUser, setEditingUser, setReload }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  // Populate form when editing a user
  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setEmail(editingUser.email);
      setDepartment(editingUser.department);
    }
  }, [editingUser]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!firstName || !lastName || !email || !department) {
      alert("All fields are required!");
      return;
    }

    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `${API_URL}/${editingUser._id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, department }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save user");
      }

      resetForm();
      setReload((prev) => !prev);
    } catch (err) {
      console.error("Error saving user:", err);
      alert(err.message);
    }
  };

  return (
    <div className="user-form">
      <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
        {editingUser && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
    </div>
  );
}

export default UserForm;
