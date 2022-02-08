import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { InputField, ProductTable, TotalCard } from '../../Components';
import { removeResetValidation, VerifyInputs } from '../../Components/Common/validation';
import { INITIAL_CUSTOMER, INITIAL_ORDER, INITIAL_ORDER_PRODUCT, INITIAL_ORDER_PRODUCT_LIST, INITIAL_PRODUCT } from '../../Components/Order/Constant';


function PlaceOrder() {
  const [isRateFixed, setIsRateFixed]= useState(false);
  const latestRate = useSelector(state => state.latestRateReducer.data);
  const [order, setOrder] = useState(INITIAL_ORDER);
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [orderProduct, setOrderProduct] = useState(INITIAL_ORDER_PRODUCT);
  const [orderProductList, setOrderProductList] = useState(INITIAL_ORDER_PRODUCT_LIST);
  

  const inputChangeHandler= ({target}) =>{
    let value = target.value;
    let inputName = target.name;
    console.log(inputName);
    if(product.hasOwnProperty(inputName)){

        setProduct((prevState) => ({ ...prevState, [inputName]: value }));
    }
    else if(orderProduct.hasOwnProperty(inputName)){

      setOrderProduct((prevState) => ({ ...prevState, [inputName]: value }));
    }
    else if(customer.hasOwnProperty(inputName)){

        setCustomer((prevState) => ({ ...prevState, [inputName]: value }));
    }
    else if(order.hasOwnProperty(inputName)){
        order[inputName] = value;

        setOrder({...order});
    }
  } 

  const buttonClickHandler = (e)=>{
    e.preventDefault();
    let buttonName = e.target.name;
    console.log(buttonName);
    if(buttonName === 'Add'){
      alert("add");
      addButtonHandler();
    }
    else if(buttonName === 'Save'){
      alert("Save");
      saveButtonHandler();
    }
    else if(buttonName === 'Clear'){
      alert("Clear");
      clearButtonHandler();
    }
    else if(buttonName === 'Reset'){
      alert("Reset");
      resetButtonHandler();
    }
    
  }

  const addButtonHandler=()=>{
    orderProduct.product = product;
    setOrderProductList([...orderProductList, orderProduct]);

    clearButtonHandler();
    removeResetValidation();
  }

  const saveButtonHandler = ()=>{
    order.orderProduct = orderProductList;
    customer.orders = [order];

    console.log(customer);
  }

  const resetButtonHandler=()=>{  
  
    INITIAL_ORDER['rate'] = latestRate.hallmarkRate;

    setOrder({...INITIAL_ORDER});
    setProduct({...INITIAL_PRODUCT});
    setCustomer({...INITIAL_CUSTOMER});
    setOrderProduct({...INITIAL_ORDER_PRODUCT});
    setOrderProductList([...INITIAL_ORDER_PRODUCT_LIST]);

    removeResetValidation();
  }

  const clearButtonHandler=()=>{
    setOrderProduct({...INITIAL_ORDER_PRODUCT});
    setProduct({...INITIAL_PRODUCT});

    removeResetValidation();
  }

  const convertIntoTwoDArray =(object)=>{
    let twoDArray = [];
    for(let i=0; i<Object.keys(object).length-2; i++){
        if(Object.keys(object)[i] !== 'customerId'){
            twoDArray.push(
                [ Object.keys(object)[i], Object.keys(object)[i+2] ]
             )
        }
        
    }

    //[['customerName', 'Phpne'],['address','email']]
    return twoDArray;
  }

  const rateFixHandler = ()=>{
    setIsRateFixed(!isRateFixed);
  }

  useEffect(()=>{
    if(latestRate !== undefined){
      order['rate'] = latestRate.hallmarkRate;

      setOrder({...order});
    }
  },[latestRate]);

  /* verify inputs */
  useEffect(()=>{
    VerifyInputs();
  },[]);

  return(
    <div className="card generate-bill" id='generate-bill'>

      <div className="card-body fs-5 mt-3">
        <span className='d-flex mx-auto justify-content-between'>
          <h5 className="card-title fs-5 ps-1">
            Order No:
            <span className='fs-5 ps-2'>23</span>
          </h5>

          <select name="type" id="rate" className="dropdown-toggle rate-choose-btn" value={order.type} onChange={inputChangeHandler}>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </span>

        <form className="row g-4 pt-3 needs-validation" noValidate onSubmit={buttonClickHandler}>
            <section className='col mb-2'>
                <div className="col-md-5 d-flex gap-3">
                    <label htmlFor="validationTooltip01">Rate: </label>
                    <span >{order.rate} <i style={{cursor:'pointer'}} onClick={rateFixHandler}>{(isRateFixed)?<AiFillLike/>:<AiOutlineLike/>}</i></span>
                </div>
            </section>

            {   /***converted into 2D array to  make two element in a row */
                convertIntoTwoDArray(customer).map((row,index)=>{
                    return(
                        <section className='row  justify-content-between' key={`custDetailRow${index}`}>
                        {
                            row.map((key,index)=>{
                                if (key !== 'customerId'){
                                    return(
                                        <InputField key={`custDetailInput${index}`}
                                            name ={key}
                                            value={customer[key]}
                                            changehandler={(e)=>inputChangeHandler(e)}
                                            isReadonly = {false}
                                            type={(key==='email') ? "email" : (key==='phone')? "number":"text"}
                                        />
                                    )
                                }
                            })
                        }
                        </section>
                    )
                })
            }

            <div className='scroll--table bill-product-table'>
                <ProductTable
                    productsList={orderProductList}
                    // editAddedProductHandler={editAddedProductHandler}
                    // deleteAddedProductHandler={deleteAddedProductHandler}
                />
            </div>

            <button className="ri-add-circle-fill add-btn" name='Add'></button>

            <section className='generate-bill-product-detail'>
                <div className="card">
                    <div className='card-body col  justify-content-around d-flex product--input-card'>
                    {
                        [['productName', 'quantity', 'size', 'design'], [  'netWeight', 'totalWeight', 'gemsName']].map((row, index)=>{

                            return(
                                <div className='aside-inputs ' key={index+'bP'}>
                                {
                                    row.map((input, index)=>{
                                        return(
                                            <InputField key={index+'bPR'}
                                                min= {1}
                                                name={ input }
                                                changehandler={(e)=>inputChangeHandler(e)}
                                                type={(!['productName', 'gemsName'].includes(input))? (input === 'design')? 'file':"number": 'text'}
                                                value={(orderProduct.hasOwnProperty(input)) ? orderProduct[input] : product[input]}

                                            />
                                        )
                                    })
                                }
                                </div>
                            );
                        })
                    }
                    </div>

                    <div className='generate-bill--button'>
                    {
                        [{name:'Save', color:'#4caf50', icon:'folder'}, {name:'Clear', color:'#ffc107', icon:'exclamation-triangle'}, {name:'Reset', color:'#f44336', icon:'exclamation-octagon'}].map((button, index)=>{
                            return(
                                <button className={`btn d-flex gap-1`} key={`${index}GBBG`}
                                    name={button.name}
                                    onClick={buttonClickHandler}
                                    style={{backgroundColor:button.color, color:'white'}}
                                    type={(button.name === 'Save')
                                        ? 'submit'
                                        : (button.name === 'Clear')
                                            ? 'reset' : 'submit'
                                }
                                >
                                    <i className={`bi bi-${button.icon}`}></i>
                                    {button.name}
                                </button>
                            )
                        })
                    }
                    </div>
                </div>

                <TotalCard
                  data={order}
                  inputHandler={inputChangeHandler}
                />

            </section>
        </form>
      </div>

    </div>
  )
}

export default PlaceOrder;
