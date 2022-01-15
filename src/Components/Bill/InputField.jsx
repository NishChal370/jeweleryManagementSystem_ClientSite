import React from 'react'

function InputField({name, type, changehandler, value, min, flex}) {
    return (
        <div className={`col-md-5 position-relative   pe-0 ${flex}`}>
            <label htmlFor="validationTooltip01" className="form-label">
                { ( name.charAt(0).toUpperCase()+name.slice(1) ).replace(/([a-z])([A-Z])/g, '$1 $2') }
            </label>
            <input className="form-control" id="validationTooltip01" required
                min={min}
                type={type}
                name={name}
                value={value} 
                onChange={(e)=>changehandler(e)}   
            />
            <div className="valid-tooltip">
                Looks good!
            </div>
        </div>
    )
}

export default InputField
