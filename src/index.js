import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import NavComponent from "./components/nav-bar/NavBarIndex";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Error from "./pages/Error";
import GlobalStyle from "./utils/style/GlobalStyle";
import { CustomThemeProvider } from "./utils/context/ThemeContext";
import ProductDetail from "./pages/ProductDetail";
import { ProductProvider } from "./utils/context/ProductContext";
import { CartContextProvider } from "./utils/context/CartContext";
import Footer from "./components/footer/footerIndex";
import { Wrapper, Content } from "./components/wrapper/wrapperIndex";
import LoginForm from "./pages/loginIndex";
import { UserContextProvider } from "./utils/context/UserContext";
import UserProfile from "./pages/Profile";
import Pay from "./pages/Pay";
import ThankYou from "./pages/Thankyou";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CustomThemeProvider>
        <GlobalStyle />
        <ProductProvider>
          <UserContextProvider>
            <CartContextProvider>
              <Wrapper>
                <NavComponent />
                <Content>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/Categories" element={<Categories />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/payment" element={<Pay />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="*" element={<Error />} />
                  </Routes>
                </Content>
                <Footer />
              </Wrapper>
            </CartContextProvider>
          </UserContextProvider>
        </ProductProvider>
      </CustomThemeProvider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
