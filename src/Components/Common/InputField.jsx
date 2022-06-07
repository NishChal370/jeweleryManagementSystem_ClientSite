import React from 'react'

/**
 * used in generate bill and place order page
 */
function InputField({name, type, changehandler, value, min, flex, isReadonly}) {


    return (
        <div className={`col-md-5 position-relative scroll-off   pe-0 ${flex}`}>
            <label htmlFor="" className="form-label">
                { ( name.charAt(0).toUpperCase()+name.slice(1) ).replace(/([a-z])([A-Z])/g, '$1 $2') }
            </label>

            {
                (name === 'design')
                ?(
                    <input className="form-control" id="validationTooltip01" 
                        min={min}
                        type={type}
                        name={name}
                        onChange={(e)=>changehandler(e)}   
                        readOnly={isReadonly}
                    />
                )
                :(
                        <input className="form-control" id="validationTooltip01"
                            type={type}
                            name={name}
                            value={(value == null)? '': value} 
                            onChange={(e)=>changehandler(e)} 
                            readOnly={isReadonly}  
                        />
                    )
            }

            <div id='invalid-tooltip' className={`${name}-tooltip`} hidden={true}>
                 <p>You missed me !</p> 
            </div>
        </div>
    )
}


export default InputField
