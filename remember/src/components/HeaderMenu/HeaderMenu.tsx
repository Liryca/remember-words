import React from 'react';
import './HeaderMenu.css';
import { useState } from 'react';
import { Hamburger } from '../Hamburger/Hamburger';
import { Link } from 'react-router-dom';

const Menu:React.FC = () => {

    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
        <div >
            <Hamburger open={open} setOpen={setOpen} />
            <div className='wrapper-menu'>
                <div className={open ? 'nav-bar-hidden' : 'nav-bar'}>
                    {open && <Hamburger open={open} setOpen={setOpen} />}
                    <div className='menu'>
                        <ul>
                            <li> <Link onClick={() => close()} to={'/'}>Add Word</Link> </li>
                            <li> <Link onClick={() => close()} to={'/learnWords'}>Learn Words</Link></li>
                            <li> <Link onClick={() => close()} to={'./repeatWords'}>Repeat Words</Link></li>

                        </ul>
                    </div>

                </div>
            </div>
        </div>



    );
};

export default Menu;