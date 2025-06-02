import React from "react"; 

const BuildingsIcon = 
    (props) => (  
        <svg  xmlns="http://www.w3.org/2000/svg" 
              width={32} height={32} fill={"#000000"}  
              viewBox="0 0 32 32" {...props} 
              >{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
              <path
                d="M4 22h16c.55 0 1-.45 1-1V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v6H5c-1.1 0-2 .9-2 2v9c0 .55.45 1 1 1M9 4h10v16h-6v-8c0-1.1-.9-2-2-2H9zm-4 8h6v8H5z">
              </path>
              <path d="M11 6h2v2h-2zM15 6h2v2h-2zM15 10.03h2V12h-2zM15 14h2v2h-2zM7 14h2v2H7z"></path>
        </svg>);
              
export default BuildingsIcon;