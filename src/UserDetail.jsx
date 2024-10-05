import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserDetail.css';
function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <>
    <div className="card">
      <h1>User Details</h1>
      <h2>{user.name}</h2>
     <div className="inside-card">
     <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>Website:</strong> {user.website}</p>
     </div>
    </div>
    <div className="card2"></div>
    </>
  );
}

export default UserDetail;
