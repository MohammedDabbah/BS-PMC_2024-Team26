import React from 'react';
import Header from './Header';
import Footer from './Footer';

function DeveloperPage() {
    return (
        <div>
            <Header />
            <div className="content">
                <h1>Welcome, Developer</h1>
                <p>This is the developer's page.</p>
            </div>
            <Footer />
        </div>
    );
}

export default DeveloperPage;