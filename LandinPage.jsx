import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// Components for Admin and User pages
const Admin = () => <div><h2>Admin Page</h2></div>;
const User = () => <div><h2>User Page</h2></div>;

// Header component
const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.logo}>MyLogo</div>
            <button style={{ ...styles.loginButton, marginLeft: '20px' }}>Login</button>
        </header>
    );
};

// Main component
const App = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate('/admin')}>Admin</button>
                <button style={styles.button} onClick={() => navigate('/user')}>User</button>
            </div>
        </div>
    );
};

// App wrapper with Router
const MainApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </Router>
    );
};

// Inline styles for simplicity
const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f4f4f4',
        borderBottom: '1px solid #ccc',
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    loginButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
    },
    button: {
        padding: '15px 30px',
        margin: '0 10px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

// Export MainApp for use in App.js
export default MainApp;
