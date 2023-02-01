import { useState } from "react";
import { useEffect } from "react";

const AdminSite = () => {
    const [userList, setUserList] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let abortController = new AbortController();
        setLoading(true);
        const fetchUsers = async () => {
            const response = await fetch('/api/users', { signal: abortController.signal });
            const json = await response.json();
            setLoading(false);
            setUserList(json);
        }

        fetchUsers();
        return () => {
            abortController.abort();
        }
    }, [])

    return (
        <div className="admin">
            <h1>Admin Site</h1>
            {loading && <p> Loading... </p>}
            {userList && <table>
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Username</th>
                        <th>Verified</th>
                        <th>Admin?</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.isVerified ? "true" : "false"}</td>
                                <td>{user.isAdmin ? "true" : "false"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>}
        </div>
    );
}

export default AdminSite;