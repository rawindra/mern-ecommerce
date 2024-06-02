import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CategoryList, CategoryCreate, CategoryEdit } from "./pages/Category";
import { ProductCreate, ProductEdit, ProductList } from "./pages/Product";
import {
  AttributeCreate,
  AttributeEdit,
  AttributeList,
} from "./pages/Attribute";
import {
  AttributeOptionCreate,
  AttributeOptionEdit,
  AttributeOptionList,
} from "./pages/AttributeOption";
import AttributeOptionAssign from "./pages/Attribute/AttributeOptionAssign";
import ProductVariantAssign from "./pages/Product/ProductVariantAssign";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import CategoryVariantAssign from "./pages/Category/CategoryVariantAssign";

const Router = () => (
  <Routes>
    <Route path="/login" Component={Login}></Route>
    <Route element={<ProtectedRoute />}>
      <Route path="/admin/dashboard" Component={Dashboard}></Route>
      <Route path="/admin/categories" Component={CategoryList}></Route>
      <Route path="/admin/categories/create" Component={CategoryCreate}></Route>
      <Route path="/admin/categories/edit/:id" Component={CategoryEdit}></Route>
      <Route path="/admin/attributes" Component={AttributeList}></Route>
      <Route path="/admin/attributes/create" Component={AttributeCreate}></Route>
      <Route path="/admin/attributes/edit/:id" Component={AttributeEdit}></Route>
      <Route path="/admin/attribute/options/assign/:id" Component={AttributeOptionAssign}></Route>
      <Route path="/admin/attribute-options" Component={AttributeOptionList}></Route>
      <Route
        path="/admin/attribute-options/create"
        Component={AttributeOptionCreate}
      ></Route>
      <Route
        path="/admin/attribute-options/edit/:id"
        Component={AttributeOptionEdit}
      ></Route>
      <Route path="/admin/products" Component={ProductList}></Route>
      <Route path="/admin/products/create" Component={ProductCreate}></Route>
      <Route path="/admin/products/edit/:id" Component={ProductEdit}></Route>
      <Route path="/admin/product/variant/assign/:id" Component={ProductVariantAssign}></Route>
      <Route path="/admin/category/variant/assign/:id" Component={CategoryVariantAssign}></Route>
    </Route>
  </Routes>
);

export default Router;
