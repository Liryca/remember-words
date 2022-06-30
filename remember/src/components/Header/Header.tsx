import React from 'react';
import Menu from '../HeaderMenu/HeaderMenu';

import './Header.css';

const Header: React.FC = () => {

    return (

        <header className='header'>
            <Menu />
            <div className='logo'>
                <p>Remember</p>
            </div>


        </header>
    );
};

export default Header;