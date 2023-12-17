import React, { useEffect } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { orderListMy } from '../actions/OrderAction'
import { useDispatch, useSelector } from 'react-redux'

const UserOrderListScreen = () => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderList;

    useEffect(()=>{
        dispatch(orderListMy());
    },[dispatch])
  return (
    <Row>
        <Col md={12}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default UserOrderListScreen