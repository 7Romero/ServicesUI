import * as React from "react";
import Routes from "../shared/routes/Routes";
import Header from "../components/Header"
import Footer from "../components/Footer";

import "./App.scss"

function App() {

    return (
        <div className="wrapper ">
            <header>
                <Header/>
            </header>

            <main className="main">
                <Routes />
            </main>

            <footer className="footer">
                <Footer />
            </footer>
        </div>

    );
}

export default App;