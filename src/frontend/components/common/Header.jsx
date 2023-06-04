import './css/Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/auth-context';
// import { useData } from '../../contexts/data-context';
// import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect, useState, useRef } from 'react';
import { CiLocationOn } from "react-icons/ci"
// import { searchFilter } from '../../utils/utils';
// import { useOutsideClickHandler } from '../../Hooks/outsideClickHandler';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

export const Header = () => {
  const location = useLocation();

  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState([]);

  const navigate = useNavigate();
  const [showSearchOutputModal, setShowOutputModal] = useState(false);

  if (location.pathname === '/404') {
    return null;
  }
  return (
    <nav className="navigation">
      <div className='nav-logo-container'>
        <Link to="/" >
          <h1 className="hero-logo">Grosers</h1>
        </Link>
        <p>Grosery at your door step</p>
      </div>
      <div className='nav-address'>
        <p>Deliver to</p>

        <p> <CiLocationOn className='nav-location' /> Select your address</p>
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
      <div className='nav-right-container'>
        <Link to="/login"><button className='nav-login'>Login</button></Link>

        <AiOutlineHeart className='nav-heart' />
        <AiOutlineShoppingCart className='nav-cart' />
      </div>
    </nav>
  );
};

export default Header;

// < nav className = 'navigation' >
//     <div className='nav-mobile-up'>
//       <div className='nav-left productlist-nav-left'>
//         <div className='nav-logo-container'>
//           <div onClick={() => navigate('/')} className='nav-logo-link'>

//             <small className='hero-logo' >Grosers</small>
//           </div>
//         </div>
//       </div>
//       <div className='nav-mid nav-desktop'>
//         <div className='nav-search'>
//           <input
//             placeholder='search'
//             value={input}
//             onChange={(e) => {
//               setInput(e.target.value);
//               setShowOutputModal(true);
//             }}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {

//               }
//             }}
//             className='nav-search-input nav-text-input'
//             type='search'
//           />
//           {showSearchOutputModal ? (
//             <div className='nav-search-output-container'>
//               {searchData.length === 0 ? (
//                 <p className='text-align-center'>No item to show</p>
//               ) : (
//                 searchData.map((el) => {
//                   return (
//                     <div
//                       onClick={() => navigate(`product/${el._id}`)}
//                       className='nav-search-output-item'
//                     >
//                       <img
//                         className='nav-search-output-item-image'
//                         src={el.image}
//                         alt='nav search img'
//                       />
//                       <div className='nav-search-output-item-details'>
//                         <div className='nav-search-output-item-upper'>
//                           <p className='text-lg font-wt-semibold'>
//                             {el.title}
//                           </p>
//                           <div className='nav-search-output-price-details'>
//                             <p className='font-wt-semibold'>₹ {el.price}</p>
//                           </div>
//                         </div>
//                         <div className='nav-search-output-item-desc'>
//                           <p className='text-md'>{el.description}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className='nav-right'>
//         <ul className='nav-links'>
//           <li className='nav-link-item nav-link-item-btn'>
//             <button
//               onClick={() => navigate('/login')}
//               className='btn btn-secondary outlined-primary'
//             >
//               Login
//             </button>
//           </li>

//           {/* {token && (
//             <li
//               className='nav-link-item'
//               onClick={() => navigate('/profile/details')}
//               title='profile'
//             >
//               <div className='badge-icon nav-badge-icon'>
//                 <span className='material-icons-outlined'>
//                   account_circle
//                 </span>
//               </div>
//             </li>
//           )} */}
//           <li className='nav-link-item'>
//             <div
//               className='badge-container'
//               onClick={() => navigate('/wishlist')}
//               title={'wishlist'}
//             >
//               <div className='badge-icon nav-badge-icon'>
//                 <AiOutlineHeart />
//               </div>
//               {/* {token && state.wishlist.length > 0 && (
//                 <div className='badge-number background-online'>
//                   {state.products.reduce(
//                     (acc, curr) => (curr.wished ? acc + 1 : acc),
//                     0
//                   )}
//                 </div>
//               )} */}
//             </div>
//           </li>
//           <li className='nav-link-item'>
//             <div
//               className='badge-container'
//               onClick={() => navigate('/cartlist')}
//               title='cartlist'
//             >
//               <div className='badge-icon nav-badge-icon'>
//                 <AiOutlineShoppingCart />
//               </div>
//               {/* {token && state.cartlist.length > 0 && (
//                 <div className='badge-number background-online'>
//                   {state.products.reduce(
//                     (acc, curr) => (curr.carted ? acc + 1 : acc),
//                     0
//                   )}
//                 </div>
//               )} */}
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//     <div className='nav-mobile-down nav-mobile'>
//       <div className='nav-search'>
//         <input
//           placeholder='search'
//           className='brd-rd-semi-sq nav-text-input nav-search-input'
//           type='search'
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             setShowOutputModal(true);
//           }}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {

//             }
//           }}
//         />
//         {showSearchOutputModal ? (
//           <div className='nav-search-output-container'>
//             {searchData.length === 0 ? (
//               <p className='text-align-center'>No item to show</p>
//             ) : (
//               searchData.map((el) => {
//                 return (
//                   <div
//                     onClick={() => navigate(`product/${el._id}`)}
//                     className='nav-search-output-item'
//                   >
//                     <img
//                       className='nav-output-smaller-img'
//                       src={el.image}
//                       alt='nav search img'
//                     />
//                     <div className='nav-search-output-item-details'>
//                       <div className='nav-search-output-item-upper nav-search-output-item-upper-smaller'>
//                         <p className='text-lg font-wt-semibold'>{el.title}</p>

//                         <p className='font-wt-md'>₹ {el.price}</p>
//                       </div>
//                       <div className='nav-search-output-item-desc'></div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         ) : null}
//       </div>
//     </div>
//   </nav >
