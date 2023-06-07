import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
	calcPercentage,
	isProductInCart,
	isProductInWishlist
} from '../../utils/cartUtils';
import './css/ProductCard.css';
import { toast } from 'react-toastify';
import { BsCartCheck } from "react-icons/bs"
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useCartData } from '../../contexts/cartContext/cartContext';
import { useAuth } from '../../contexts/AuthContext/authContext';

export function ProductCard({ product }) {
	const { cart, wishlist, addProductToCart } = useCartData();
	const [btnDisabled, setBtnDisabled] = useState(false);
	const { token } = useAuth();
	const navigate = useNavigate();

	const {
		id,
		category,
		subCategoryName,
		title,
		price,
		inStock,
		soldBy,
		description,
		Brand,
		Manufacturer,
		foodType,
		quantity,
		scale,
		image
	} = product;

	const isInCart = isProductInCart(cart, id);
	const isInWishlist = isProductInWishlist(wishlist, id);

	const addToCartHandler = () => {
		token
			? isInCart
				? navigate('/cart')
				: addProductToCart(product, token)
			: navigate('/login');
	};

	// const wishlistHandler = () => {
	// 	token
	// 		? isInWishlist
	// 			? removeFromWishlist(id, dataDispatch, token, toast)
	// 			: addToWishlist(dataDispatch, product, token, toast)
	// 		: navigate('/login');
	// };

	return (
		<div key={id} className="product-card">
			<AiOutlineHeart className="wishlist-icon" />
			<img
				className="card-img"
				src={image}
				alt={title}
				onClick={() => navigate(`/product-details/${id}`)}
			/>
			{/* {isBestSeller && <span className="card-badge">Best Seller</span>} */}
			{/* <span
				role="button"
				className={`wishlist-icon ${isInWishlist ? `wishlist-toggle` : ``}`}>
				{/* onClick={() => wishlistHandler()} 
				
			</span> */}

			<div className="card-info">
				<div className="">
					<div className="card-title">
						<h3 className="card-title-header" title={title}>
							{title} {quantity} {scale}
						</h3>
						<div className="card-star">
							<p>rating</p>
							<i className="fa fa-star" />
						</div>
					</div>
				</div>
				<div className="price">
					<p className="final-price">
						₹{price}
					</p>
					<p className="actual-price">₹100</p>
					<p className="off-percentage">45% OFF</p>
				</div>
			</div>
			<button
				className="add-to-cart"
				disabled={
					btnDisabled
				}
				onClick={() => addToCartHandler()}
			>

				{isInCart
					? <span className="cart-text">
						<BsCartCheck className="go-to-cart-icon" /> Go to Cart
					</span>
					: <span className="cart-text">
						<AiOutlineShoppingCart className="add-to-cart-icon" /> Add to Cart
					</span>}
			</button>
		</div>
	);
}
