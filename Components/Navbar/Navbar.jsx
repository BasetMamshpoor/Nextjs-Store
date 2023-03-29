import React from 'react';
import MiddleNavbar from './MiddleNavbar';
import NavbarLinks from './NavbarLinks';
import TopBar from './Topbar';

const Navbar = () => {
    let styles = {
        position: "fixed",
        width: "100vw",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "999",
    }

    return (
        <>
            <header style={{ overflow: 'hidden',padding:'5.5rem 0' }}>
                <div style={styles}>
                    <TopBar />
                    <MiddleNavbar />
                    <NavbarLinks />
                </div>
            </header >
        </>
    );
};

export default React.memo(Navbar);