import { useState } from "react";
import { useEffect } from "react";

const MyOrders = ({ user }) => {
    const [orders, setOrders] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let abortController = new AbortController();
        const fetchOrders = async () => {
            const URL = user.isAdmin ? `/api/order` : `/api/order?user=${user._id}`;
            const response = await fetch(URL, { signal: abortController.signal });
            const json = await response.json();
            if (!response.ok) {
                setLoading(false);
                setError(json.error)
            } else {
                setLoading(false);
                setOrders(json);
            }
        }
        fetchOrders();

        return () => {
            abortController.abort();
        }
    }, [])

    return (
        <div>
            <h1>My orders</h1>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {orders &&
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Hospital Name</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td>{order.user.name}</td>
                                    <td>{order.hospital.name}</td>
                                    <td>{order.date.slice(0, 10)}</td>
                                    <td>{order.goods.map(good => {
                                        return (
                                            <p key={good._id}>{good.item.item}, {good.quantity} pieces, {good.price} HUF/pcs</p>
                                        )
                                    })}</td>
                                    <td>{order.goods.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)} HUF</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            }

        </div>
    );
}

export default MyOrders;