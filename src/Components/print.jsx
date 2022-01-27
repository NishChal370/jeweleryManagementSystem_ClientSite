import React from 'react';

function PrintMe({isHidden}) {

  return <div id='print-me'  className= "card bill-pdf"  hidden={isHidden}>
      <header className= "text-center" style={{backgroundColor:'#002366', textAlign:'center'}}>
        <h1 style={{ color:'red' }}>Gitanjali Jewellers</h1>
        <address>Bisal Bazar; Kathmandu</address>
        <phone>985634563456</phone>
      </header>
      <main>
        <h5 className="card-title fs-5 ps-1">
            Bill No:
            <span className='fs-5 ps-2'>234</span>
        </h5>
      </main>
      

  </div>;
}

export default PrintMe;
