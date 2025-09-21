import React, { useState } from "react";

function UserTable({ API_URL, users, setEditingUser, setReload }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      setReload((prev) => !prev);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Filter users
  const filtered = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  // Sort users
  const sorted = [...filtered].sort((a, b) => {
    const aField = (a[sortField] || "").toLowerCase();
    const bField = (b[sortField] || "").toLowerCase();
    return sortOrder === "asc" ? aField.localeCompare(bField) : bField.localeCompare(aField);
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / limit);
  const displayed = sorted.slice((page - 1) * limit, page * limit);

  return (
    <div className="table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="department">Department</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((u, idx) => (
            <tr key={u._id}>
              <td>{(page - 1) * limit + idx + 1}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.department}</td>
              <td>
                <button onClick={() => setEditingUser(u)}>✏</button>
                <button onClick={() => handleDelete(u._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {page} / {totalPages || 1}
        </span>
        <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UserTable;
