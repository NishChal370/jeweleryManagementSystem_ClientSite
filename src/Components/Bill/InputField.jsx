import React from 'react'

function InputField({name, type, changehandler, value, min, flex, isReadonly}) {


    return (
        <div className={`col-md-5 position-relative scroll-off   pe-0 ${flex}`}>
            <label htmlFor="" className="form-label">
                { ( name.charAt(0).toUpperCase()+name.slice(1) ).replace(/([a-z])([A-Z])/g, '$1 $2') }
            </label>
            {console.log(name)}
            {
                ['email', 'phone', 'gemsName', 'gemsPrice', 'size', 'design'].includes(name)
                    ?(
                        <input className="form-control" id="validationTooltip01" 
                            min={min}
                            type={type}
                            name={name}
                            value={(value == null)? '': value} 
                            onChange={(e)=>changehandler(e)}   
                            readOnly={isReadonly}
                        />
                    )
                    : (
                        <input className="form-control" id="validationTooltip01" required
                            min={min}
                            type={type}
                            name={name}
                            value={(value == null)? '': value} 
                            onChange={(e)=>changehandler(e)} 
                            readOnly={isReadonly}  
                        />
                    )
            }
            <div className="invalid-tooltip">
                Empty!
            </div>
        </div>
    )
}


export default InputField
