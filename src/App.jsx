import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import AllServices from "./components/services/AllServices";
import CategoryDetail from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-[var(--lr-background)] min-h-screen">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Header />
            <div className="mx-auto bg-[var(--lr-background-alt)]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<AllServices />} />
                <Route path="/search" element={<SearchResult />} />
                <Route
                  path="/category/:categoryId"
                  element={<CategoryDetail />}
                />
              </Routes>
            </div>
            {/* <Footer /> */}
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
