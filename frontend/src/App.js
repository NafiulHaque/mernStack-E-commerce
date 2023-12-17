import Footers from "./Components/Footers";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderScreens from "./Screens/HeaderScreens";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShipingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import Dashboard from "./Components/Dashboard";
import ProductCreateScreen from "./Screens/ProductCreateScreen";
import UserDashboardScreen from "./Screens/UserDashboardScreen";
import ProfileEditScreen from "./Screens/ProfileEditScreen";
import UserOrderListScreen from "./Screens/UserOrderListScreen";
import WishListScreen from "./Screens/WishListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="my-2">
        <Routes>
          <Route path="/dashboard/" Component={DashboardScreen}>
            <Route index element={<Dashboard />} />
            <Route path="productlist" element={<ProductListScreen />} />
            <Route path="userlist" Component={UserListScreen} />
            <Route path="user/:id/edit" element={<UserEditScreen />} />

            <Route path="product/:id/edit" element={<ProductEditScreen />} />
            <Route path="orderlist" element={<OrderListScreen />} />
            <Route path="product/create" element={<ProductCreateScreen />} />
          </Route>
        </Routes>
        <Container>
          <Routes>
            <Route path="/" element={<HeaderScreens />} exact />

            <Route path="/signup" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="user/dashboard/" element={<UserDashboardScreen />}>
              <Route index element={<ProfileScreen />} />
              <Route path="editprofile" element={<ProfileEditScreen />} />
              <Route path="userorder" element={<UserOrderListScreen />} />
              <Route path="wishlist" element={<WishListScreen />} />
            </Route>

            <Route path="/shipping" element={<ShipingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeOrder" element={<PlaceOrderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/search/:keyword" element={<HeaderScreens />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footers />
    </Router>
  );
}

export default App;
