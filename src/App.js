import React, { useContext, useState } from "react"
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
import Delivery from "./pages/delivery/DeliveryPage"
import ViewDelivery from "./pages/delivery/view/ViewDeliveryPage"
import ProductGroup from "./pages/productGroup/ProductGroupPage"
import ViewProductGroup from "./pages/productGroup/view/ViewProductGroupPage"
import UpdateProductGroup from "./pages/productGroup/update/UpdateProductGroupPage"
import Product from "./pages/product/ProductPage"
import CreateProduct from "./pages/product/create/CreateProductPage"
import ViewProduct from "./pages/product/view/ViewProductPage"
import UpdateProduct from "./pages/product/update/UpdateProductPage"
import CustomerGroup from "./pages/customerGroup/CustomerGroupPage"
import ViewCustomerGroup from "./pages/customerGroup/view/ViewCustomerGroupPage"
import UpdateCustomerGroup from "./pages/customerGroup/update/UpdateCustomerGroupPage"
import Customer from "./pages/customer/CustomerPage"
import ViewCustomer from "./pages/customer/view/ViewCustomerPage"
import UpdateCustomer from "./pages/customer/update/UpdateCustomerPage"
import Warehouse from "./pages/warehouse/WarehousePage"
import ImportWarehouse from "./pages/warehouse/import/ImportWarehousePage"
import BusinessReport from "./pages/businessReport/BusinessReportPage"
import SystemReport from "./pages/systemReport/SystemReportPage"
import Notification from './pages/notification'
import './styles/dark.scss'
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
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
          <Route path="delivery">
            <Route index element={<Delivery />} />
            <Route path="view">
              <Route path=":orderId" element={<ViewDelivery />} />
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
          <Route path="product">
            <Route index element={<Product />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="view">
              <Route path=":productId" element={<ViewProduct />} />
            </Route>
            <Route path="update">
              <Route path=":productId" element={<UpdateProduct />} />
            </Route>
          </Route>
          <Route path="customerGroup">
            <Route index element={<CustomerGroup />} />
            <Route path="view">
              <Route path=":customerGroupId" element={<ViewCustomerGroup />} />
            </Route>
            <Route path="update">
              <Route path=":customerGroupId" element={<UpdateCustomerGroup />} />
            </Route>
          </Route>
          <Route path="customer">
            <Route index element={<Customer />} />
            <Route path="view">
              <Route path=":customerId" element={<ViewCustomer />} />
            </Route>
            <Route path="update">
              <Route path=":customerId" element={<UpdateCustomer />} />
            </Route>
          </Route>
          <Route path="warehouse">
            <Route index element={<Warehouse />} />
            <Route path="import" element={<ImportWarehouse />} />
          </Route>
          <Route path="businessReport">
            <Route index element={<BusinessReport />} />
          </Route>
          <Route path="systemReport">
            <Route index element={<SystemReport />} />
          </Route>
          <Route path="notification">
            <Route index element={<Notification />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
