import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri';

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
                            // min={min}
                            type={type}
                            name={name}
                            // pattern={(type==='text'&&name !=='productName')?("[a-zA-Z\\s]+"): undefined} // start from here
                            // // pattern={(type==='text')?'[a-zA-Z\s]+':""}
                            // step="0.00000001"
                            value={(value == null)? '': value} 
                            onChange={(e)=>changehandler(e)} 
                            readOnly={isReadonly}  
                        />
                    )
            }
            {/* <div className="invalid-tooltip"> */}
            <div id='invalid-tooltip' className={`${name}-tooltip`} hidden={true}>
                 <p>You missed me !</p> 
            </div>
        </div>
    )
}


export default InputField


/**:['email', 'phone', 'gemsName', 'gemsPrice', 'size', 'design'].includes(name)
                    ?(
                        <input className="form-control" id="validationTooltip01" 
                            min={min}
                            type={type}
                            name={name}
                            pattern={(name==='gemsName')?("[a-zA-Z\\s]+"):(name==='phone')?("[789][0-9]{9}"): undefined}
                            value={(value == null)? '': value} 
                            onChange={(e)=>changehandler(e)}   
                            readOnly={isReadonly}
                        />
                    )
                    : (
                        <input className="form-control" id="validationTooltip01"
                            min={min}
                            type={type}
                            name={name}
                            pattern={(type==='text'&&name !=='productName')?("[a-zA-Z\\s]+"): undefined}
                            // pattern={(type==='text')?'[a-zA-Z\s]+':""}
                            step="0.00000001"
                            value={(value == null)? '': value} 
                            onChange={(e)=>changehandler(e)} 
                            readOnly={isReadonly}  
                        />
                    ) */