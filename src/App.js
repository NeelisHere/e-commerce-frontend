import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
	{ path: '/', element: <Home />, errorElement: <ErrorPage/>},
	{ path: '/login', element: <LoginPage />},
	{ path: '/sign-up', element: <SingupPage />}
])

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
