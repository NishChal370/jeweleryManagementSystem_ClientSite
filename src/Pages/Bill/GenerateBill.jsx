import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

import { calculateFinalWeightAndAmount, calculateGrandTotalAmount, calculatePerProductAmount, calculateRatePerLal, calculateRemaingAmount } from '../../Assets/js/billCalculation';

import { InputField, TotalCard } from '../../Components';
import { removeResetValidation, VerifyInputs } from '../../Assets/js/validation';


const initialCustomer = {
    name: '',
    address: '',
    phone: '',
    email: '',
};

const initialBill = {
    orderId: '',
    date: '',
    rate: '',
    customerProductWeight: 0.0,
    customerProductAmount: '',
    totalAmount: '',
    discount: '',
    grandTotalAmount: '',
    advanceAmount: '',
    payedAmount: '',
    remainingAmount: '',
    status: '',
};

const initialBillProduct = {
    lossWeight: '',
    totalWeight: '',
    rate: '',
    makingCharge: '',
    totalAmountPerProduct: 0.0,
};

const initialProduct =  {
    productName: '',
    netWeight: '',
    size: 0.0,
    gemsName: '',
    gemsPrice: '',
};


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function GenerateBill() {

    const latestRate = useSelector(state => state.latestRateReducer.data);

    const [bill, setBill] = useState({...initialBill});
    const [product, setProduct] = useState({...initialProduct});
    const [customer, setCustomer] = useState({...initialCustomer});
    const [billProduct, setBillProduct] = useState({...initialBillProduct});

    /**store all the billProduct  */
    const [billProductList, setBillProductList] = useState([]);

    const [finalWeight, setFinalWeight] = useState(0);
    const [grandTotalWeight, setGrandTotalWeight] = useState(0);

    const [editingBillProductIndex, setEditingBillProductIndex] = useState();


    const inputHandler=(e)=>{
        let value = e.target.value;
        let inputName = e.target.name;

        if(product.hasOwnProperty(inputName)){
            product[inputName] = value;

            setProduct({...product});
        }
        else if(billProduct.hasOwnProperty(inputName)){
            billProduct[inputName] = value;

            setBillProduct({...billProduct});
        }
        else if(customer.hasOwnProperty(inputName)){
            customer[inputName] = value;

            setCustomer({...customer});
        }
        else if(bill.hasOwnProperty(inputName)){
            bill[inputName] = value;

            if( inputName === 'customerProductWeight'){
                setGrandTotalWeight(finalWeight-bill['customerProductWeight']);

                bill['customerProductAmount'] = value * (calculateRatePerLal(latestRate.tajabiRate));
            }

            bill.grandTotalAmount = calculateGrandTotalAmount(bill);

            bill.remainingAmount = calculateRemaingAmount(bill);

            setBill({...bill});
        }

    };

    const saveButtonHandler=()=>{
        console.log("SAVE BUTTON CLICK");
        alert("SAVED");
        bill.billProduct = billProductList;

        bill.rate = latestRate.hallmarkRate;
        customer.bills = [bill];

        console.log(customer);
    };

    const addButtonHandler=()=>{
        billProduct.product = product;
        billProduct.rate = latestRate.hallmarkRate;

        calculatePerProductAmount(billProduct, latestRate);

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
        setBill({...initialBill});
        setProduct({...initialProduct});
        setBillProduct({...initialBillProduct});
    }

    const buttonClickHandler=(e)=>{
        e.preventDefault();
        
        let buttonName = e.target.name;

        if(buttonName === 'Save'){

            saveButtonHandler();
        }
        else if (buttonName === 'Add' || e.type == 'submit'){

            VerifyInputs();

            addButtonHandler();
        }
        else if(buttonName === 'Draft'){

            setBillProductList([...billProductList]);
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


    const deleteAddedProduct=(index)=>{
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

    const editAddedProduct=(index, billProduct)=>{
        let{product} = billProduct;

        setEditingBillProductIndex(index);

        setProduct(product);

        setBillProduct(billProduct);
    }

    
    /**used when user add product in Bill */
    useEffect(() => {

        let{finalWeight, finalAmount} = calculateFinalWeightAndAmount(billProductList);

        setFinalWeight(finalWeight);

        setGrandTotalWeight(finalWeight-bill['customerProductWeight']);

        bill['totalAmount'] = finalAmount;

        bill.grandTotalAmount = calculateGrandTotalAmount(bill);

        bill.remainingAmount = calculateRemaingAmount(bill);

        setBill({...bill});
    }, [billProductList]);


    return (
        <div className="card generate-bill">
            <div className="card-body fs-5">
                <h5 className="card-title fs-5 ps-1">
                    Bill No:
                    <span className='fs-5 ps-2'>234</span>
                </h5>

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
                    <table>
                        <thead>
                            <tr>
                            {
                                ['#', 'Product name', 'Net Weight', 'loss Weight', 'Total Weight', 'M. Charge', 'Gems Name', 'Gems Price', 'Total Amount', 'Action'].map((title,index)=>{
                                    return <th key={`${index}GBTH`}>{title}</th>
                                })
                            }
                            </tr>
                        </thead>

                        <tbody>
                        {
                            billProductList.map((billProduct, index)=>{
                                return(
                                    <>
                                    <tr>
                                        <th scope="row" key={`${index}GBTR`}>{index+1}</th>
                                        <td>{billProduct.product.productName}</td>
                                        <td>{billProduct.product.netWeight}</td>
                                        <td>{billProduct.lossWeight}</td>
                                        <td>{billProduct.totalWeight}</td>
                                        <td>{billProduct.makingCharge}</td>
                                        <td>{billProduct.product.gemsName}</td>
                                        <td>{billProduct.product.gemsPrice}</td>
                                        <td>{billProduct.totalAmountPerProduct}</td>
                                        <td>
                                            <i className="ri-edit-2-fill curser--on-hover text-primary" onClick={()=> editAddedProduct(index, billProduct)}></i> &emsp;
                                            <i className="ri-delete-bin-7-fill curser--on-hover text-danger"  onClick={()=>deleteAddedProduct(index)}></i>
                                        </td>
                                    </tr>
                                    </>

                                )
                            })
                        }
                        </tbody>

                    </table>
                    </div>

                    <button className="ri-add-circle-fill add-btn" name='Add' ></button>

                    <section className='d-flex generate-bill-product-detail'>
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
                                [{name:'Save', color:'#4caf50'}, {name:'Draft', color:'gray'}, {name:'Clear', color:'#ffc107'}, {name:'Reset', color:'#f44336'}].map((button, index)=>{
                                    return(
                                        <div className="col" key={`${index}GBB`}>
                                            {
                                                <button className={`btn `}
                                                    name={button.name}
                                                    onClick={buttonClickHandler}
                                                    style={{backgroundColor:button.color, color:'white'}}
                                                    type={(button.name === 'Save' || button.name === 'Draft')
                                                        ? 'submit'
                                                        : (button.name === 'Clear')
                                                            ? 'reset' : 'submit'
                                                }
                                                >
                                                    {button.name}
                                                </button>
                                            }
                                        </div>

                                    )
                                })
                            }
                            </div>
                        </div>

                        <TotalCard
                            bill={bill}
                            finalWeight={finalWeight}
                            grandTotalWeight={grandTotalWeight}
                            inputHandler={inputHandler}
                        />

                    </section>
                </form>

            </div>
        </div>
    )
}


export default GenerateBill