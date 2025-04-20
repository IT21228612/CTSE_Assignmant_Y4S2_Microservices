// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Header from "./inventory/Header";
import Footer from "./inventory/Footer";

// User - Item Display, Order
import UserItems from "./inventory/Items";

import UserItemsReport from "./inventory/ItemsReport";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-grow p-4">
                    <Routes>
                        {/* User - Viewing Items */}
                        <Route path="/inventory" element={<UserItems />} />
                        <Route path="/inventoryReport" element={<UserItemsReport />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
