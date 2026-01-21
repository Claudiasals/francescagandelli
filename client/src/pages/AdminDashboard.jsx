const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Se non c’è token, rimanda al login
    window.location.href = "/login";
    return null; // evita di renderizzare la dashboard
  }

  return (
    <div>
      <h2>Dashboard Admin</h2>
    </div>
  );
};

export default AdminDashboard;
