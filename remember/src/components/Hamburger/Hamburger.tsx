import hamburger from './images/hamburger.png';
import cross from './images/cross.png';
import './Hamburger.css'

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
};

export const Hamburger = (props: Props) => (
    <div className='hamburger' onClick={() => props.setOpen(!props.open)}>
        <p>menu</p>
        <img src={!props.open ? hamburger : cross} alt='menu' />


    </div>

);