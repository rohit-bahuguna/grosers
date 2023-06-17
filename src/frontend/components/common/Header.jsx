import './css/Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuthData } from '../../contexts/auth-context';
// import { useData } from '../../contexts/data-context';
// import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect, useState, useRef } from 'react';
import { CiLocationOn } from "react-icons/ci"
// import { searchFilter } from '../../utils/utils';
// import { useOutsideClickHandler } from '../../Hooks/outsideClickHandler';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useCartData } from "../../contexts/cartContext/cartContext"
import { useAuthData } from '../../contexts/AuthContext/authContext';
import { useProductData } from '../../contexts/productContext/productContext';
import { ACTION_TYPE } from '../../utils';
import { useWishlistData } from '../../contexts/wishlistContext';
export const Header = () => {
  const location = useLocation();
  const { cart } = useCartData()
  const { wishlist } = useWishlistData()
  const { dispatchProductData } = useProductData()
  console.log("wishlist", wishlist.length);
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const { user, dispatchAuthData, addresses } = useAuthData()
  const navigate = useNavigate();
  const [showSearchOutputModal, setShowOutputModal] = useState(false);
  console.log(addresses[0])


  return (
    <nav className="navigation">
      <div className='nav-logo-container'>
        <Link to="/" >
          <h1 className="hero-logo">Grosers</h1>
        </Link>
        <p>Grosery at your door step</p>
      </div>
      <div className='nav-address'>
        <p> {addresses.length > 0 ? "Delivering to" : "Deliver to"}</p>


        {
          addresses.length > 0 ? <p> <CiLocationOn className='nav-location' /> {addresses[0]?.street} ,  {addresses[0]?.city} </p> : <p> <CiLocationOn className='nav-location' /> Select your address</p>
        }

      </div>
      <div className='nav-search'>


        <input type="text" className='nav-search-input' placeholder='Search Here' onChange={(e) => {
          setInput(e.target.value);
          setShowOutputModal(true);
        }} />
        {showSearchOutputModal ? (
          <div className='nav-search-output-container'>
            {searchData.length === 0 ? (
              <p className='text-align-center'>No item to show</p>
            ) : (
              searchData.map((el) => {
                return (
                  <div
                    onClick={() => navigate(`product/${el._id}`)}
                    className='nav-search-output-item'
                  >
                    <img
                      className='nav-output-smaller-img'
                      src={el.image}
                      alt='nav search img'
                    />
                    <div className='nav-search-output-item-details'>
                      <div className='nav-search-output-item-upper nav-search-output-item-upper-smaller'>
                        <p className='text-lg font-wt-semibold'>{el.title}</p>

                        <p className='font-wt-md'>₹ {el.price}</p>
                      </div>
                      <div className='nav-search-output-item-desc'></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>
      <div className='nav-user'>
        {user.status && <p>WELCOME {user?.name.toUpperCase()}</p>}
        {/* <BiChevronDown className='nav-down-logo' /> */}
        <div className='nav-right-container'>
          {user.status ? <button className='nav-login' onClick={() => {
            dispatchProductData({
              type: ACTION_TYPE.LOG_OUT
            })

            dispatchAuthData({
              type: ACTION_TYPE.LOG_OUT
            })

          }}>Logout</button> : <Link to="/login"><button className='nav-login'>Login</button></Link>}

          <div>
            <Link to="/wishlist">
              <AiOutlineHeart className='nav-heart' />
            </Link>
            {
              wishlist.length > 0 && <div className='total-heart'>{wishlist.length}</div>
            }
          </div>
          <div>
            <Link to="/cart">
              <AiOutlineShoppingCart className='nav-cart' />
            </Link>
            {
              cart.length > 0 && <div className='total-cart'>{cart.length}</div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
