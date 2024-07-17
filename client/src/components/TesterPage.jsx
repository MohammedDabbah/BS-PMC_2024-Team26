import React from 'react';
import Header from './Header';
import Footer from './Footer';

function TesterPage() {
    return (
        <div>
            <Header />
            <div className="content">
                <h1>Welcome, Tester</h1>
                <p>This is the tester's page.</p>
            </div>
            <Footer />
        </div>
    );
}

export default TesterPage;