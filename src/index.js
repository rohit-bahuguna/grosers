import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './frontend/contexts/productContext/productContext';
import { CartProvider } from './frontend/contexts/cartContext/cartContext';
import { AuthProvider } from './frontend/contexts/AuthContext/authContext';
import { OrderProvider } from './frontend/contexts/orderContext/orderContext';


// Call make Server
makeServer();

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<ProductProvider>
				<AuthProvider>
					<CartProvider>
						<OrderProvider>
							<App />
						</OrderProvider>
					</CartProvider>
				</AuthProvider>
			</ProductProvider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root')
);
