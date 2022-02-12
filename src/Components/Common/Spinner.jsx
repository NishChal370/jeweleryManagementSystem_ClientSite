import React from 'react';

/**
 * used in searchOrderTable SearchBillTable dashboard and rateOverview
 */
const Spinner=()=>{
  return (
    <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
}

export default Spinner;
