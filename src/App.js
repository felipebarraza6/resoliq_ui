import "./assets/App.css";
import { Layout } from "antd";
import {
  Routes,
  Route,
  Outlet,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route index path="/home" element={<Home />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
