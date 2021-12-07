import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    margin-top: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
`;
const Wrapper = styled.div`
    width: min(70vh, 400px);
    padding: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 500;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: min(40vh, 300px);
    margin: 20px 10px 0 0;
    padding: 3px;
`;

const Button = styled.button`
    border: none;
    padding: 15px 20px;
    margin-top: 10px;
    cursor: pointer;
`;

const ArchiveButton = styled.button`
    background-color: #00c400;
    border: none;
    padding: 15px 20px;
    margin-top: 10px;
    cursor: pointer;
    margin-bottom: 20px;
`;

const UnarchiveButton = styled.button`
    background-color: red;
    border: none;
    padding: 15px 20px;
    margin-top: 10px;
    cursor: pointer;
    margin-bottom: 20px;
`;

const UpdateProduct = () => {
    let location = useLocation();
    const id = location.pathname.split('/')[2];
    let token = localStorage.getItem('token');
    let categories;
    let sizes;
    let colors;
    let title;
    let desc;
    let img;
    let price;
    const [state, setState] = useState({});
    const [product, setProduct] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        console.log(state);
    };

    const toArray = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value.split(' '),
        }));
        console.log(state);
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/products/find/${id}`
                );
                setProduct(res.data);
            } catch {}
        };
        getProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        try {
            axios.put(
                `http://localhost:4000/api/products/${id}/update`,
                state,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`Product Edited`);
            window.location.reload();
        } catch (error) {}
    };

    const handleArchive = async (e) => {
        if (inStock) {
            try {
                axios.put(
                    `http://localhost:4000/api/products/${id}/update`,
                    { inStock: false },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert(`Product Archived`);
                window.location.reload();
            } catch (error) {}
        } else {
            try {
                axios.put(
                    `http://localhost:4000/api/products/${id}/update`,
                    { inStock: true },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert(`Product Unarchived`);
                window.location.reload();
            } catch (error) {}
        }
    };

    const inStock = product?.inStock;

    return (
        <div>
            <Container>
                <Wrapper>
                    {inStock && (
                        <ArchiveButton onClick={handleArchive}>
                            Archive Product
                        </ArchiveButton>
                    )}
                    {!inStock && (
                        <UnarchiveButton onClick={handleArchive}>
                            Unarchive Product
                        </UnarchiveButton>
                    )}
                    <Title>Edit Product</Title>
                    <Form>
                        <Input
                            type="string"
                            placeholder="Title"
                            id="title"
                            onInput={handleChange}
                            value={title}
                        />
                        <Input
                            type="string"
                            placeholder="Description"
                            id="desc"
                            onChange={handleChange}
                            value={desc}
                        />
                        <Input
                            type="string"
                            placeholder="Image Link"
                            id="img"
                            onChange={handleChange}
                            value={img}
                        />
                        <Input
                            type="string"
                            placeholder="Categories"
                            id="categories"
                            onChange={toArray}
                            value={categories}
                        />
                        <Input
                            type="string"
                            placeholder="Sizes"
                            id="size"
                            onChange={toArray}
                            value={sizes}
                        />
                        <Input
                            type="string"
                            placeholder="Colors"
                            id="color"
                            onChange={toArray}
                            value={colors}
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            id="price"
                            onChange={handleChange}
                            value={price}
                        />
                        <Button onClick={handleSubmit}>Edit Product</Button>
                    </Form>
                </Wrapper>
            </Container>
        </div>
    );
};

export default UpdateProduct;
