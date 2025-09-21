import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import "./App.css";

// Use API URL from .env
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [reload, setReload] = useState(false);

  // Fetch all users
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch((err) => console.error("Error fetching users:", err));
  }, [reload]);

  return (
    <div className="dashboard">
      <header>
        <h1>User Management Dashboard</h1>
      </header>

      <div className="dashboard-body">
        <UserForm
          API_URL={API_URL}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          setReload={setReload}
        />

        <UserTable
          API_URL={API_URL}
          users={users}
          setEditingUser={setEditingUser}
          setReload={setReload}
        />
      </div>
    </div>
  );
}

export default App;
