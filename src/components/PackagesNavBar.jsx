    import React from 'react';
    import './Styles/PackagesNavBar.css';

    const LeftBar = ({ items, onSelectItem }) => {
    return (

        <div className='container'>
            <aside className="sidebar">
                <div className='packages-status'>
                    <div className="sidebar-title">
                        <span className="title-icon">
                        <i className='bx bx-package bx-sm'></i>
                        </span>
                        <h3>Paquetes</h3>
                    </div>
                    <ul className="package-list">
                        {items.map(item => (
                        <li key={item.id} className="side-link">
                            <button
                            className="side-ref"
                            onClick={() => onSelectItem(item)}
                            >
                            <span className="item-icon">
                                <i className='bx bx-box'></i>
                            </span>
                            <span className="package-name">{item.nombre}</span>
                            </button>
                        </li>
                        ))} 
                    </ul>
                </div>
                <div className='robots-status'>
                    <div className="sidebar-title">
                        <span className="title-icon">
                        <i className='bx bx-car bx-sm'></i>
                        </span>
                        <h3>Robots</h3>
                    </div>
                    <ul className="package-list">
                        {items.map(item => (
                        <li key={item.id} className="side-link">
                            <button
                            className="side-ref"
                            onClick={() => onSelectItem(item)}
                            >
                            <span className="item-icon">
                                <i className='bx bx-box'></i>
                            </span>
                            <span className="package-name">{item.nombre}</span>
                            </button>
                        </li>
                        ))} 
                    </ul>
                </div>
             </aside>

        </div>
        
    );
    };

    export default LeftBar;
