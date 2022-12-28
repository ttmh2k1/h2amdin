import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import LoginPage from "./pages/login/LoginPage"
import User from "./pages/user/UserPage"
import ViewUser from "./pages/user/view/ViewUserPage"
import Role from "./pages/role/RolePage"
import Logs from "./pages/logs/LogsPage"
import Order from "./pages/order/OrderPage"
import ViewOrder from "./pages/order/view/ViewOrderPage"
import ApproveOrder from "./pages/order/approve/ApproveOrderPage"
import ProductGroup from "./pages/productGroup/ProductGroupPage"
import ViewProductGroup from "./pages/productGroup/view/ViewProductGroupPage"
import UpdateProductGroup from "./pages/productGroup/update/UpdateProductGroupPage"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="user">
              <Route index element={<User />} />
              <Route path=":userId" element={<ViewUser />} />
            </Route>
            <Route path="role">
              <Route index element={<Role />} />
            </Route>
          </Route>
          <Route path="logs">
            <Route index element={<Logs />} />
          </Route>
          <Route path="order">
            <Route index element={<Order />} />
            <Route path="view">
              <Route path=":orderId" element={<ViewOrder />} />
            </Route>
            <Route path="approve">
              <Route path=":orderId" element={<ApproveOrder />} />
            </Route>
          </Route>
          <Route path="productGroup">
            <Route index element={<ProductGroup />} />
            <Route path="view">
              <Route path=":productGroupId" element={<ViewProductGroup />} />
            </Route>
            <Route path="update">
              <Route path=":productGroupId" element={<UpdateProductGroup />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
