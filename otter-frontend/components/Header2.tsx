import Image from "next/image";
import React from 'react';
import OTTERLand from "./otterst1.png";

function Header() {
  return (
    <div>
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: 'black', 
          textTransform: 'uppercase',
          letterSpacing: '-1px',
          lineHeight: '1.2',    
          padding: '0.2rem 0',  
          display: 'inline-block',  
        }}>
          OTTERLAND
        </h1>
      </div>
    </div>
  );
}

export default Header;





