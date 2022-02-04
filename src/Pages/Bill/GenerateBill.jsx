import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Post_Bill } from '../../API/UserServer';
import { InputField, InvoicePdf, ProductTable, TotalCard } from '../../Components';
import { removeResetValidation, VerifyInputs } from '../../Assets/js/validation';
import { INITIAL_BILL, INITIAL_BILL_PRODUCT, INITIAL_BILL_PRODUCT_LIST, INITIAL_CUSTOMER, INITIAL_PRODUCT  } from '../../Components/Bill/Constant';
import { calculateFinalWeightAndAmount, calculateGrandTotalAmount, calculatePerProductAmount, calculateRatePerLal, calculateRemaingAmount } from '../../Assets/js/billCalculation';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function GenerateBill() {
    const componentRef = useRef();
    const latestRate = useSelector(state => state.latestRateReducer.data);

    const [bill, setBill] = useState(INITIAL_BILL);
    const [product, setProduct] = useState(INITIAL_PRODUCT);
    const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
    const [billProduct, setBillProduct] = useState(INITIAL_BILL_PRODUCT);

    /**store all the billProduct  */
    const [billProductList, setBillProductList] = useState(INITIAL_BILL_PRODUCT_LIST);

    const [editingBillProductIndex, setEditingBillProductIndex] = useState();


    const inputHandler=(e)=>{
        let value = e.target.value;
        let inputName = e.target.name;

        if(product.hasOwnProperty(inputName)){

            setProduct((prevState) => ({ ...prevState, [inputName]: value }));
        }
        else if(billProduct.hasOwnProperty(inputName)){

            setBillProduct((prevState) => ({ ...prevState, [inputName]: value }));
        }
        else if(customer.hasOwnProperty(inputName)){

            setCustomer((prevState) => ({ ...prevState, [inputName]: value }));
        }
        else if(bill.hasOwnProperty(inputName)){
            bill[inputName] = value;

            if(inputName === 'billType'){
                let rate = (bill['billType'] === 'gold')? latestRate.hallmarkRate : latestRate.silverRate;
                bill['rate'] = rate;
            }

            if( inputName === 'customerProductWeight'){

                bill['grandTotalWeight'] = bill['finalWeight']-bill['customerProductWeight'];

                let rate = (bill['billType'] === 'gold')? latestRate.tajabiRate : latestRate.silverRate;

                bill['customerProductAmount'] = value * (calculateRatePerLal(rate));
            }

            bill.grandTotalAmount = calculateGrandTotalAmount(bill);

            bill.remainingAmount = calculateRemaingAmount(bill);

            setBill({...bill});
        }

    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Invoice file",
        onAfterPrint:() => {
            resetHandler(); 
            Swal.fire('Saved!', '', 'success');
        },
    });

    const PostBill=(newBill)=>{
        Post_Bill(newBill)
            .then(function (response) {
                // handle success
                handlePrint();
            })
            .catch(function (error) {
                // handle error
                Swal.fire(error, 'error')
            });
    }

    const save = (saveAs)=>{
        bill.billProduct = billProductList;

        (saveAs === 'Draft')&& (bill.status ='draft')

        customer.bills = [bill];

        PostBill(customer);
    }

    const saveButtonHandler=(saveAs)=>{

        if(billProductList.length>0){
            Swal.fire({
                title: `Do you want to save the bill${(saveAs==='Draft')?(" as draft "):''}?`,
                text:'Make sure you are confirm',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,

            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    save(saveAs);

                } else if (result.isDenied) {

                    Swal.fire('Bill is not saved', '', 'info')
                }
            });

        }
        else{
            Toast.fire({
                icon: 'error',
                title: 'Bill is empty !!',
                text: 'click add to add first'
            })
        }
    };

    const addButtonHandler=()=>{
        billProduct.product = product;

        let rate = (bill['billType'] === 'gold')? latestRate.hallmarkRate : latestRate.silverRate;

        billProduct.rate = rate;

        calculatePerProductAmount(billProduct, rate);

        setBillProduct({...billProduct});

        if(editingBillProductIndex === undefined){

            setBillProductList([...billProductList, billProduct]);
        }
        else{ // edit added product detail

            billProductList.splice(editingBillProductIndex, 1, billProduct);

            setBillProductList([...billProductList]);

            setEditingBillProductIndex(undefined);
        }

        Toast.fire({
            icon: 'info',
            title: 'Product Added'
        });
        
        clearFields();
        removeResetValidation();
    }

    const clearFields = ()=>{
        setProduct({...INITIAL_PRODUCT});
        setBillProduct({...INITIAL_BILL_PRODUCT});
    }

    const clearButtonHandler=()=>{

        billProduct.lossWeight = '';
        billProduct.makingCharge = '';

        setProduct({...INITIAL_PRODUCT});
        setBillProduct(billProduct);

        removeResetValidation();
    }

    const resetHandler=()=>{        
        INITIAL_BILL['rate'] = latestRate.hallmarkRate;

        setBill({...INITIAL_BILL});
        setProduct({...INITIAL_PRODUCT});
        setCustomer({...INITIAL_CUSTOMER});
        setBillProduct({...INITIAL_BILL_PRODUCT});
        setBillProductList([...INITIAL_BILL_PRODUCT_LIST]);

        removeResetValidation();
    }

    const buttonClickHandler=(e)=>{
        e.preventDefault();

        let buttonName = e.target.name;

        if(buttonName === 'Save'){

            saveButtonHandler(buttonName);
        }
        else if (buttonName === 'Add' || e.type === 'submit'){

            VerifyInputs();

            addButtonHandler();
        }
        else if(buttonName === 'Draft'){

            saveButtonHandler(buttonName);
        }
        else if(buttonName === 'Clear'){

            clearButtonHandler();
        }
        else if(buttonName === 'Reset'){

            resetHandler();
        }

    };

    const convertIntoTwoDArray =(object)=>{
        let twoDArray = [];
        for(let i=0; i<Object.keys(object).length-2; i++){
            twoDArray.push(
               [ Object.keys(object)[i], Object.keys(object)[i+2] ]
            )
        }

        return twoDArray;
    };


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

                billProductList.splice(index,1);

                setBillProductList([...billProductList]);
            }
        });


    }

    const editAddedProductHandler=(index, billProduct)=>{
        let{product} = billProduct;

        setEditingBillProductIndex(index);

        setProduct(product);

        setBillProduct(billProduct);
    }

    const getDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }


    /**used when user add product in Bill */
    useEffect(() => {

        let{finalWeight, finalAmount} = calculateFinalWeightAndAmount(billProductList);

        bill['date'] = getDate();

        bill['finalWeight'] = finalWeight;

        bill['grandTotalWeight'] = bill['finalWeight']-bill['customerProductWeight'];

        bill['totalAmount'] = finalAmount;

        bill.grandTotalAmount = calculateGrandTotalAmount(bill);

        bill.remainingAmount = calculateRemaingAmount(bill);

        setBill({...bill});
    }, [billProductList]);

    /* verify inputs */
    useEffect(()=>{
        VerifyInputs();
    },[]);

    useEffect(()=>{
        if(latestRate !== undefined){
            bill['rate'] = latestRate.hallmarkRate;

            setBill({...bill});
        }
    },[latestRate]);

    return (
        <div className="card generate-bill" id='generate-bill'>
            <div hidden>
                <InvoicePdf ref={componentRef} bill={bill} billProductList={billProductList} customer={customer}/>
            </div>

            <div className="card-body fs-5">
                <span className='d-flex mx-auto justify-content-between'>
                    <h5 className="card-title fs-5 ps-1">
                        Bill No:
                        <span className='fs-5 ps-2'>234</span>
                    </h5>

                    <select name="billType" id="rate" className="dropdown-toggle rate-choose-btn" disabled={(billProductList.length<=0)? false: true} value={bill.billType} onChange={(e)=>inputHandler(e)} >
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                    </select>
                </span>



                <form className="row g-4 pt-3 needs-validation" noValidate onSubmit={buttonClickHandler}>
                    <section className='row mb-2'>
                        <div className="col-md-5 d-flex bill--order">
                            <label htmlFor="validationTooltip01" className="form-label">Order No: </label>
                            <input type="text"/>
                        </div>
                    </section>

                    {   /***converted into 2D array to  make two element in a row */
                        convertIntoTwoDArray(customer).map((row,index)=>{
                            return(
                                <section className='row  justify-content-between' key={`custDetailRow${index}`}>
                                {
                                    row.map((key,index)=>{
                                        return(
                                            <InputField key={`custDetailInput${index}`}
                                                name ={key}
                                                value={customer[key]}
                                                changehandler={(e)=>inputHandler(e)}
                                                isReadonly = {false}
                                                type={(key==='email') ? "email" : (key==='phone')? "number":"text"}
                                            />
                                        )
                                    })
                                }
                                </section>
                            )
                        })
                    }

                    <div className='scroll--table bill-product-table'>
                        <ProductTable
                            calledBy = 'bill'
                            billProductList={billProductList}
                            editAddedProductHandler={editAddedProductHandler}
                            deleteAddedProductHandler={deleteAddedProductHandler}
                        />
                    </div>

                    <button className="ri-add-circle-fill add-btn" name='Add' ></button>

                    <section className='generate-bill-product-detail'>
                        <div className="card">
                            <div className='card-body col  justify-content-around d-flex product--input-card'>
                            {
                                [['productName', 'quantity', 'netWeight', 'lossWeight'], ['makingCharge', 'gemsName', 'gemsPrice']].map((row, index)=>{

                                    return(
                                        <div className='aside-inputs ' key={index+'bP'}>
                                        {
                                            row.map((input, index)=>{
                                                return(
                                                    <InputField key={index+'bPR'}
                                                        min= {1}
                                                        name={ input }
                                                        changehandler={(e)=>inputHandler(e)}
                                                        type={(!['productName', 'gemsName'].includes(input))? "number": "text"}
                                                        value={(billProduct.hasOwnProperty(input)) ? billProduct[input] : product[input]}
                                                        
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
                                [{name:'Save', color:'#4caf50', icon:'folder'}, {name:'Draft', color:'gray', icon:'folder-plus'}, {name:'Clear', color:'#ffc107', icon:'exclamation-triangle'}, {name:'Reset', color:'#f44336', icon:'exclamation-octagon'}].map((button, index)=>{
                                    return(
                                        <button className={`btn d-flex gap-1`} key={`${index}GBBG`}
                                            name={button.name}
                                            onClick={buttonClickHandler}
                                            style={{backgroundColor:button.color, color:'white'}}
                                            type={(button.name === 'Save' || button.name === 'Draft')
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
                            bill={bill}
                            inputHandler={inputHandler}
                        />

                    </section>
                </form>

            </div>
        </div>
    )
}


export default GenerateBill