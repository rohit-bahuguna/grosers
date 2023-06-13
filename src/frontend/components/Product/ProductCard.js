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
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useCartData } from '../../contexts/cartContext/cartContext';
import { useAuthData } from '../../contexts/AuthContext/authContext';
import { useWishlistData } from '../../contexts/wishlistContext';

export function ProductCard({ product }) {
	const { cart, addProductToCart } = useCartData();
	const { wishlist, addProductToWishlist, removeProductFromWishlist } = useWishlistData()
	const [btnDisabled, setBtnDisabled] = useState(false);
	const { token } = useAuthData();
	const navigate = useNavigate();
	console.log(wishlist);
	const {
		id,
		_id,
		title,
		price,
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

	const wishlistHandler = () => {
		token
			? isInWishlist
				? removeProductFromWishlist(_id, token)
				: addProductToWishlist(product, token)
			: navigate('/login');
	};
	//console.log("isInWishlist", wishlist);
	return (
		<div key={id} className="product-card">
			{isInWishlist ? <AiFillHeart className=' inWishlist-icon' onClick={wishlistHandler} /> : <AiOutlineHeart className="wishlist-icon " onClick={wishlistHandler} />}

			<img
				className="card-img"
				src={image}
				alt={title}
				onClick={() => navigate(`/product-details/${id}`)}
			/>


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
					<p className="actual-price">₹{product.originalPrice}</p>
					<p className="off-percentage">{product.percentageOff}% OFF</p>
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
