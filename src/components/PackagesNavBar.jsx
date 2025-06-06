    import React from 'react';
    import './Styles/PackagesNavBar.css';

    const LeftBar = ({ robot, paquete, onSelectItem }) => {
    return (

        <div className='container'>
            <aside className="sidebar">
                <div className='packages-status'>
                    <div className="sidebar-title">
                        <div className="title-icon">
                        <i className='bx bx-package bx-sm'></i>
                        </div>
                        <h3>Paquetes</h3>
                    </div>
                    <ul className="package-list">
                        {paquete.map(item => (
                        <li key={`p-${item.id}`} className="side-link">
                            <button
                            className="side-ref"
                            onClick={() => onSelectItem(item)}
                            >
                            <div className="item-icon">
                                <i className='bx bx-box'></i>
                            </div>
                            <div className="package-name">{item.nombre}</div>
                            </button>
                        </li>
                        ))} 
                    </ul>
                </div>
                <div className='robots-status'>
                    <div className="sidebar-title">
                        <div className="title-icon">
                        <i className='bx bx-car bx-sm'></i>
                        </div>
                        <h3>Paquetes Rastreables</h3>
                    </div>
                    <ul className="package-list">
                        {robot.map(item => (
                        <li key={`r-${item.id}`} className="side-link">
                            <button
                            className="side-ref"
                            onClick={() => onSelectItem(item)}
                            >
                            <div className="item-icon">
                                <i className='bx bx-bug bx'></i>
                            </div>
                            <div className="package-name">{item.nombre}</div>
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
