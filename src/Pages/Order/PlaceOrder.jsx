import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUnlockAlt, FaLock } from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom';
import { Post_Order, Post_Order_Update } from '../../API/UserServer';
import { InputField, ProductTable, TotalCard } from '../../Components';
import { removeResetValidation, VerifyInputs } from '../../Components/Common/validation';
import { INITIAL_CUSTOMER, INITIAL_ORDER, INITIAL_ORDER_PRODUCT, INITIAL_ORDER_PRODUCT_LIST, INITIAL_PRODUCT } from '../../Components/Order/Constant';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: false,
});


function PlaceOrder() {
  const history = useHistory();
  let searchedOrder = useLocation().state;
  const [isRateFixed, setIsRateFixed]= useState(false);
  const latestRate = useSelector(state => state.latestRateReducer.data);
  const [order, setOrder] = useState(INITIAL_ORDER);
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [orderProduct, setOrderProduct] = useState(INITIAL_ORDER_PRODUCT);
  const [orderProductList, setOrderProductList] = useState(INITIAL_ORDER_PRODUCT_LIST);
  const [editingBillProductIndex, setEditingBillProductIndex] = useState();

  const inputChangeHandler= ({target}) =>{
    let value = target.value;
    let inputName = target.name;
  
    if(product.hasOwnProperty(inputName)){
      if(['netWeight', 'size'].includes(inputName)){
        if(value === ''){
          value = null;
        }
      }

      setProduct((prevState) => ({ ...prevState, [inputName]: value }));
    }
    else if(orderProduct.hasOwnProperty(inputName)){
      
      if(inputName === 'design'){
        console.log(target.files[0]);
        // for image not working
        // setOrderProduct((prevState) => ({ ...prevState, [inputName]: target.files[0] }));
      }
      else{
        if(['totalWeight', 'quantity'].includes(inputName)){
          if(value === ''){
            value = null;
          }
        }

        setOrderProduct((prevState) => ({ ...prevState, [inputName]: value }));
      }
      
    }
    else if(customer.hasOwnProperty(inputName)){

      setCustomer((prevState) => ({ ...prevState, [inputName]: value }));
    }
    else if(order.hasOwnProperty(inputName)){
      document.getElementsByName("submittionDate")[0].style.borderColor ='black';

      order[inputName] = value;
      if(inputName === 'type'){
        let rate = (order['type'] === 'gold')? latestRate.hallmarkRate : latestRate.silverRate;
        order['rate'] = rate;
      }

      if(['advanceAmount', 'customerProductWeight'].includes(inputName)){
        if(value === ''){
          value = null;
        }
      }

      setOrder({...order});
    }
  }

  const buttonClickHandler = (e)=>{
    e.preventDefault();
    let buttonName = e.target.name;

    if(buttonName === 'Save'){

      saveButtonHandler();
    }
    else if(buttonName === 'Add' || e.type === 'submit'){

      VerifyInputs();
      addButtonHandler();
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
    
    if(editingBillProductIndex === undefined){

      setOrderProductList([...orderProductList, orderProduct]);
    }
    else{ // edit added product detail

      orderProductList.splice(editingBillProductIndex, 1, orderProduct);

      setOrderProductList([...orderProductList]);

      setEditingBillProductIndex(undefined);
    }

    Toast.fire({
      icon: 'info',
      title: 'Product Added'
    });

    clearButtonHandler();
    removeResetValidation();
  }

  const deleteAddedProductHandler=(index)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed){
        Toast.fire({
          icon: 'success',
          title: 'Deleted!'
        });

        orderProductList.splice(index,1);

        setOrderProductList([...orderProductList]);
      }
    });
  }

  
  
  const saveButtonHandler = ()=>{
    if(orderProductList.length > 0){
      if(order.submittionDate === null || order.submittionDate === ''){
        document.getElementsByName("submittionDate")[0].style.borderColor ='red';
        Toast.fire({
          icon: 'error',
          title: 'Submittion date missing'
        });
      }
      else{
        order.orderProducts = orderProductList;
        (!isRateFixed)&&(order.rate = null);
        customer.orders = [order];

        (searchedOrder === undefined)
          ? PostOrder(customer)
          : PostOrderUpdate(customer); //old
          
        clearButtonHandler();
        resetButtonHandler();
      }
      
    }
    else{
      Toast.fire({
        icon: 'error',
        title: 'Product missing '
      });
    }
    
  }

  const editAddedProductHandler=(index, orderProduct)=>{
    let{product} = orderProduct;

    setEditingBillProductIndex(index);

    setProduct(product);

    setOrderProduct(orderProduct);
  }

  const _ = require("lodash"); 
  const resetButtonHandler=()=>{
    INITIAL_ORDER['rate'] = latestRate.hallmarkRate;

    // removing order from customer without mutation . id order exists
    let initial_Customer = _.omit(INITIAL_CUSTOMER, ['orders']);
    setIsRateFixed(false);
    setOrder({...INITIAL_ORDER});
    setProduct({...INITIAL_PRODUCT});
    setCustomer({...initial_Customer});
    setOrderProduct({...INITIAL_ORDER_PRODUCT});
    setOrderProductList([...INITIAL_ORDER_PRODUCT_LIST]);

    clearHistory();
    removeResetValidation();
  }

  const clearHistory =()=>{
    let oldHistory = history.location
    delete oldHistory.state
    history.replace({ ...oldHistory });
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

  const PostOrder = (newOrder)=>{
    Post_Order(newOrder)
      .then(function (response) {
          // handle success
          Swal.fire('Saved !', '', 'success'); 
      })
      .catch(function (error) {
          // handle error
          console.log(error);
          Swal.fire("Error occur in Post order !", 'error')
      });
  }

  const PostOrderUpdate = (editedOrder)=>{
    Post_Order_Update(editedOrder)
      .then(function (response) {
        // handle success
        console.log("Updated")
        console.log(response.data);
        Swal.fire('Saved !', '', 'success'); 
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire("Error occur in Post order !", 'error')
      });
  }

  const setEditingOrder =()=>{
    let oldCustomer = searchedOrder;
    let oldOrder = searchedOrder['orders'];
    let oldOrderProductList = oldOrder['orderProducts'];

    delete searchedOrder['orders'];
    delete oldOrder['orderProducts'];

    if(oldOrder.rate !== null){setIsRateFixed(true)}
    
    setCustomer({...oldCustomer});
    setOrder({...oldOrder});
    setOrderProductList([...oldOrderProductList]);
  }


  /* verify inputs */
  useEffect(()=>{
    // console.log("called1");
    if(searchedOrder !== undefined){
      setEditingOrder();
    }
    else{
      delete customer.orders
    }
    
    VerifyInputs();
  },[]);

  const [initial, setInitial] = useState(true);
  const setRate = ()=>{ 
    if(latestRate !== undefined){
      //for new order
      if(searchedOrder === undefined){
        if(initial){
          let rate = (order.type === 'gold') ? latestRate.hallmarkRate : latestRate.silverRate;
      
          setOrder((prevState) => ({ ...prevState, 'rate': rate}));
          setInitial(false)
        }
        
      }
      else{
        //set latest rate if the edint order or search order dont have rate
        if(order.orderId !== null){
          if(order.rate === null){
            let rate = (order.type === 'gold') ? latestRate.hallmarkRate : latestRate.silverRate;
      
            setOrder((prevState) => ({ ...prevState, 'rate': rate}));
          }
        }
      }
    }
  }


  useEffect(()=>{
    setRate();
  },[latestRate, order]);


  return(
    <div className="card generate-bill" id='generate-bill'>
      <div className="card-body fs-5 mt-3">
        <span className='d-flex mx-auto justify-content-between'>
          <h5 className="card-title fs-5 ps-1">
            Order No:
            <span className='fs-5 ps-2'>{order.orderId}</span>
          </h5>

          <select name="type" id="rate" className="dropdown-toggle rate-choose-btn" value={order.type} onChange={inputChangeHandler}  disabled={(orderProductList.length<=0 && !isRateFixed)? false: true} >
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </span>

        <form className="row g-4 pt-3 needs-validation" noValidate onSubmit={buttonClickHandler}>
          <section className='col mb-2'>
            <div className="col-md-5 d-flex gap-3">
              <label htmlFor="validationTooltip01">Rate: </label>
              <span >{order.rate} <i style={{cursor:'pointer'}} onClick={rateFixHandler}>{(isRateFixed)?<FaLock/>:<FaUnlockAlt/>}</i></span>
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
              editAddedProductHandler={editAddedProductHandler}
              deleteAddedProductHandler={deleteAddedProductHandler}
            />
          </div>

          {/* <button className="ri-add-circle-fill add-btn" name='Add'></button> */}
          <button className="ri-add-circle-fill add-btn" name='Add' ></button>
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



// console.log("latestRate ", latestRate);
    // console.log("HAve ",!haveRate);
    // if(latestRate !== undefined){
    //   console.log("in");
    //   if(searchedOrder !== undefined){
    //     if(!haveRate){
    //       console.log(order);
    //       console.log('dont have rate');
    //       let rate = (order.type === 'gold') ? latestRate.hallmarkRate : latestRate.silverRate;
          
    //       setOrder((prevState) => ({ ...prevState, 'rate': rate}));
    //       setHaveRate(false);
    //     }
    //   }
      
    // }
