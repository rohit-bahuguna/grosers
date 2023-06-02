import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
	GetAllCategories,
	GetAllProducts
} from '../../services/API/Product/product_API';

const productContext = createContext(null);

const useProductData = () => useContext(productContext);

const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const { data: { products } } = await GetAllProducts();
				setProducts([...products]);
			} catch (e) {
				console.error(e.message);
			}
		})();

		(async () => {
			try {
				const { data: { categories } } = await GetAllCategories();

				setCategories([...categories]);
			} catch (e) {
				console.error(e.message);
			}
		})();
	}, []);
	return (
		<productContext.Provider value={{ categories, products }}>
			{children}
		</productContext.Provider>
	);
};

export { useProductData, ProductProvider };
