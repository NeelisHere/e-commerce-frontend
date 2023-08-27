import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import Checkout from './pages/Checkout'
import ProductDetailsPage from "./pages/ProductDetailsPage";

const router = createBrowserRouter([
	{ path: '/', element: <Home />, errorElement: <ErrorPage/>},
	{ path: '/login', element: <LoginPage />},
	{ path: '/sign-up', element: <SingupPage />},
	{ path: '/cart', element: <CartPage />},
	{ path: '/checkout', element: <Checkout />},
	{ path: '/product-details', element: <ProductDetailsPage />},
])

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
