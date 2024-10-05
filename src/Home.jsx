// src/App.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './Home.css';

function App() {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
    });
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState('')



    // Fetch users from the API when the component mounts
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // Handle input changes in the form
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // Open modal for adding or editing user
    const handleOpenModal = (user = null) => {
        if (user) {
            setNewUser({
                name: user.name,
                email: user.email,
                phone: user.phone,
                website: user.website,
            });
            setEditingUserId(user.id);
        } else {
            setNewUser({
                name: "",
                email: "",
                phone: "",
                website: "",
            });
            setEditingUserId(null);
        }
        setShowModal(true);
    };

    // Handle form submission to add or update a user
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Validate form inputs
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            if (editingUserId) {
                // Perform PUT request to update user
                fetch(`https://jsonplaceholder.typicode.com/users/${editingUserId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((response) => response.json())
                    .then((updatedUser) => {
                        // Update the user list with the updated user data
                        setUsers(users.map((user) => (user.id === editingUserId ? updatedUser : user)));
                        setShowModal(false);
                    })
                    .catch((error) => console.error("Error updating user:", error));
            } else {
                // Perform POST request to simulate adding a new user
                fetch("https://jsonplaceholder.typicode.com/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Add the new user to the list
                        setUsers([...users, data]);
                        setShowModal(false);
                    })
                    .catch((error) => console.error("Error adding user:", error));
            }
        }

        setValidated(true);
    };

    // Open delete confirmation modal
    const handleDeleteClick = (userId) => {
        setDeleteUserId(userId);
        setShowDeleteModal(true);
    };

    // Perform DELETE request to delete the user
    const handleDeleteUser = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${deleteUserId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    // Remove user from UI
                    setUsers(users.filter((user) => user.id !== deleteUserId));
                    setShowDeleteModal(false);
                }
            })
            .catch((error) => console.error("Error deleting user:", error));
    };
    // Search filter
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter users by name
        const filtered = users.filter((user) =>{ return(

            user.name.toLowerCase().includes(query)
        )
         
        }
          
        );
        if(filtered){
            setUsers(filtered);
        }
      
        
    


        
    

}

return (
    <div className="App">
        <h1>User List</h1>

        {/* Button to open the modal for adding new user */}
        <Button onClick={() => handleOpenModal()}>Add New User</Button>

        {/* Modal for adding or editing a user */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingUserId ? "Edit User" : "Add New User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newUser.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={newUser.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a phone number.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            name="website"
                            value={newUser.website}
                            onChange={handleChange}
                            placeholder="Enter website"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a website.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editingUserId ? "Update User" : "Add User"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteUser}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <br /><br />
        <input type="text" value={searchQuery} placeholder="Search " onChange={handleSearch} />

        {/* Display the list of users in a table */}
        {users.length > 0 ? (
            <table className="table-striped" border="1" style={{ width: "100%", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className="dis-none">Email</th>
                        <th className="dis-none">Phone</th>
                        <th className="dis-none" >Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td className="dis-none">{user.email}</td>
                            <td className="dis-none">{user.phone}</td>
                            <td className="dis-none">{user.website}</td>
                            <td>
                                <Link to={`/user/${user.id}`}>
                                    <Button variant="info" className="myButton">View Details</Button>
                                </Link>
                            </td>
                            <td>
                                {/* Edit button */}

                                <Button

                                    variant="warning"
                                    onClick={() => handleOpenModal(user)}
                                    style={{ marginRight: "10px " }}
                                    className="myButton"
                                >
                                    Edit
                                </Button>
                                {/* Delete button */}
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteClick(user.id)}
                                    className="myButton"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>Loading users...</p>
        )}
    </div>
);
}

export default App;
