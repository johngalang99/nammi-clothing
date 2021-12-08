import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
    let admin = localStorage.getItem('isAdmin');
    const [products, setProducts] = useState([]);
    // const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    JSON.parse(admin)
                        ? `http://localhost:4000/api/products/`
                        : 'http://localhost:4000/api/products/stocked'
                );
                setProducts(res.data);
            } catch (err) {}
        };
        getProducts();
    });

    // useEffect(() => {
    //   cat &&
    //     setFilteredProducts(
    //       products.filter((item) =>
    //         Object.entries(filters).every(([key, value]) =>
    //           item[key].includes(value)
    //         )
    //       )
    //     );
    // }, [products, cat, filters]);

    return (
        <Container>
            {products.map((item) => (
                <Product item={item} key={item._id} />
            ))}
        </Container>
    );
};

export default Products;
