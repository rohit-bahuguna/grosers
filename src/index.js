import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './frontend/contexts/productContext/productContext';

// Call make Server
makeServer();

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<ProductProvider>
				<App />
			</ProductProvider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root')
);
