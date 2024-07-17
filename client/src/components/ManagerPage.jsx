import React from 'react';
import Header from './Header';
import Footer from './Footer';

function ManagerPage() {
    return (
        <div>
            <Header />
            <div className="content">
                <h1>Welcome, Manager</h1>
                <p>This is the manager's page.</p>
            </div>
            <Footer />
        </div>
    );
}

export default ManagerPage;