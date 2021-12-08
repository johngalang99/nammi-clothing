import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    cursor: pointer;
    border: ${(props) => props.type === 'filled' && 'none'};
    background-color: ${(props) =>
        props.type === 'filled' ? 'black' : 'transparent'};
    color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
    display: flex;
`;

const TopText = styled.p`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const ProductDetails = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 150px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.p``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductPrice = styled.div`
    font-style: 30px;
    margin: 5px;
`;

const Hr = styled.hr`
    background-color: #ebebeb;
    border: none;
    height: 2px;
    margin: 5px 0;
`;

const OrderContainer = styled.div`
    margin: 30px 0;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
`;

const Order = () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let location = useLocation();
    const id = location.pathname.split('/')[2];
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/order/${id}`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                setOrders(res.data);
                setLoading(false);
            } catch {}
        };
        getOrder();
    }, [id, token]);

    const orderHandler = async (order) => {
        const { isDelivered, _id } = order;
        if (!isDelivered) {
            try {
                axios.put(
                    `http://localhost:4000/api/order/${_id}/update`,
                    { isDelivered: true },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert(`Order Received!`);
                console.log(order);
                window.location.reload();
            } catch (error) {}
        } else {
            try {
                axios.delete(`http://localhost:4000/api/order/${_id}/delete`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                alert(`Order Deleted`);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (loading) {
        return `loading...`;
    } else {
        return (
            <Container>
                <Navbar />
                <Wrapper>
                    <Title>Your Orders</Title>
                    <Top>
                        <TopButton>
                            <Link
                                to="/products"
                                style={{ textDecoration: 'none' }}
                            >
                                Continue Shopping
                            </Link>
                        </TopButton>
                        <TopTexts>
                            <Link to={`/cart/${userId}`}>
                                <TopText>Shopping Bag</TopText>
                            </Link>
                            <Link to={`/order/${userId}`}>
                                <TopText>Your Orders</TopText>
                            </Link>
                        </TopTexts>
                        <TopButton>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                Back to Home
                            </Link>
                        </TopButton>
                    </Top>
                    <Bottom>
                        <Info>
                            {orders.length === 0 && (
                                <Title>You have no orders yet.</Title>
                            )}
                            {orders?.map((order) => (
                                <OrderContainer key={order._id}>
                                    {order?.products?.map((product) => (
                                        <Product key={product._id}>
                                            <ProductDetails>
                                                <Image src={product?.img} />
                                                <Details>
                                                    <ProductName>
                                                        <b>Product:</b>{' '}
                                                        {product?.title}
                                                    </ProductName>
                                                    <ProductId>
                                                        <b>ID:</b>{' '}
                                                        {product?._id}
                                                    </ProductId>
                                                    <ProductColor
                                                        color={product.color}
                                                    />
                                                    <ProductSize>
                                                        <b>Size:</b>{' '}
                                                        {product?.size}
                                                    </ProductSize>
                                                    <ProductSize>
                                                        <b>Status:</b>{' '}
                                                        {order?.isDelivered
                                                            ? `Delivered`
                                                            : `Pending`}
                                                    </ProductSize>
                                                </Details>
                                            </ProductDetails>
                                            <PriceDetail>
                                                <ProductPrice>
                                                    Php {product?.price}
                                                </ProductPrice>
                                                {order?.isDelivered ? (
                                                    <button
                                                        onClick={() =>
                                                            orderHandler(order)
                                                        }
                                                    >
                                                        Delete Order
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            orderHandler(order)
                                                        }
                                                    >
                                                        Order Received
                                                    </button>
                                                )}
                                            </PriceDetail>
                                        </Product>
                                    ))}
                                </OrderContainer>
                            ))}
                            <Hr />
                        </Info>
                    </Bottom>
                </Wrapper>
                <Footer />
            </Container>
        );
    }
};

export default Order;
