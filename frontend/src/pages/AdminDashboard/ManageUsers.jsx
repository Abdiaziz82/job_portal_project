import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Using React Icons for the delete icon

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users', {
                credentials: 'include', // Include cookies
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            // Sort users alphabetically by first name
            const sortedUsers = data.sort((a, b) =>
                a.first_name.localeCompare(b.first_name)
            );
            setUsers(sortedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = (userId) => {
        console.log("Deleting user with ID:", userId); // Debugging

        if (!userId) {
            alert("Invalid user ID. Try refreshing the page.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this user?")) return;

        fetch(`http://127.0.0.1:5000/delete-user/${userId}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || "Failed to delete user");
                    });
                }
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                setUsers(users.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                alert("Error: " + error.message);
            });
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-100">
                    <table className="min-w-full">
                        <thead className="bg-green-600">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Mobile Number
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold">
                                                        {user.first_name[0]}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {user.email_address}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {user.mobile_number}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900 transition-colors"
                                        >
                                            <FaTrash className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;