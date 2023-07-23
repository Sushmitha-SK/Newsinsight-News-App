import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchNewsData } from './../redux/actions/newsActions';
import { useState, useEffect } from 'react';
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'
import { fetchCategory } from '../redux/slice/newsSlice';
import { RotatingTriangles } from 'react-loader-spinner';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleClick = () => setClick(!click);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCategoryClick = async (category) => {
        setLoading(true);
        await dispatch(fetchCategory(category))
        await dispatch(fetchNewsData(category));
        setLoading(false);
    };

    const handleNavigation = () => {
        dispatch(fetchCategory('business'))
        navigate('/')
    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <div className='logo'>
                        <Link className="navbar-brand logo" onClick={handleNavigation}>Newsinsight</Link>
                    </div>

                    {/* mobile menu icon */}
                    <div className='menu-icon' onClick={handleClick}>
                        {click ? (
                            <img src={close} alt='close icon' />
                        ) : (
                            <img src={hamburger} alt='hamburger icon' />
                        )}
                    </div>

                    <ul className={click ? 'navbar-nav nav-menu active' : 'navbar-nav nav-menu'}>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('business')}>Business</Link>

                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('entertainment')}>Entertainment</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('general')}>General</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('health')}>Health</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('science')}>Science</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('sports')}>Sports</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('technology')}>Technology</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {loading && (
                <div className="loader-container">
                    <RotatingTriangles
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="rotating-triangels-loading"
                        wrapperStyle={{}}
                        wrapperClass="rotating-triangels-wrapper"
                        colors={['#0c8f96', '#15B9C3', '#15B9C3']}
                    />
                </div>
            )}
        </>
    );
};

export default Navbar;
