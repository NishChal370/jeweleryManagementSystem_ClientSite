import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'

import { calculateFinalWeightAndAmount, calculateGrandTotalAmount, calculatePerProductAmount, calculateRatePerLal, calculateRemaingAmount } from '../../Assets/js/billCalculation';

import { InputField, TotalCard } from '../../Components';

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
    lossWeight: 0.0,
    totalWeight: 0.0,
    rate: '',
    makingCharge: 0.0,
    totalAmountPerProduct: 0.0,
};

const initialProduct =  {
    productName: '',
    netWeight: 0.0,
    size: 0.0,
    gemsName: '',
    gemsPrice: 0.0,
};

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

        bill.billProduct = billProductList;

        bill.rate = latestRate.hallmarkRate;
        customer.bills = [bill];

        console.log(customer);
    };


    const addButtonHandler=()=>{
        console.log("ADD BUTTON CLICK");

        billProduct.product = product;
        billProduct.rate = latestRate.hallmarkRate;

        calculatePerProductAmount(billProduct, latestRate);

        setBillProduct({...billProduct});

        if(editingBillProductIndex === undefined){
            setBillProductList([...billProductList, billProduct]);
        }
        else{

            billProductList.splice(editingBillProductIndex, 1, billProduct);

            setBillProductList([...billProductList]);
            
            setEditingBillProductIndex(undefined);
        }
        
        
        clearFields();
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
        else if (buttonName === 'Add'){
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
               [ Object.keys(object)[i], Object.keys(object)[i+2]]
            )
        }

        return twoDArray;
    };


    const deleteAddedProduct=(index)=>{
        billProductList.splice(index);

        setBillProductList([...billProductList]);
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

        bill['totalAmount'] = finalAmount;

        bill.grandTotalAmount = calculateGrandTotalAmount(bill);

        setBill({...bill});
    }, [billProductList]);


    return (
        <div className="card generate-bill">

            <div className="card-body fs-5">
                <h5 className="card-title fs-5 ps-1">
                    Bill No: 
                    <span className='fs-5 ps-2'>234</span> 
                </h5>

                <form className="row g-4 pt-3 needs-validation" noValidate>
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

                    <div className='scroll--table'>
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
                                            <i class="ri-edit-2-fill curser--on-hover" onClick={()=> editAddedProduct(index, billProduct)}></i> &emsp;
                                            <i class="ri-delete-bin-7-fill curser--on-hover"  onClick={()=>deleteAddedProduct(index)}></i>
                                        </td>
                                    </tr>
                                    </>
                                    
                                )
                            })
                        }                           
                        </tbody>
                    </table>   
                    </div>

                    <section className='d-flex generate-bill-product-detail'>
                        <div className="card">
                            <div className='card-body col  justify-content-around d-flex product--input-card'>
                            {
                                [['productName', 'quantity', 'netWeight', 'lossWeight'], ['makingCharge', 'gemsName', 'gemsPrice']].map((row, index)=>{
                                    
                                    return(
                                        <div className='aside-inputs' key={index+'bP'}>
                                        {
                                            row.map((input, index)=>{
                                                return(
                                                    <InputField key={index+'bPR'}
                                                        min= {1}
                                                        name={ input }
                                                        changehandler={(e)=>inputHandler(e)}
                                                        type={(input === 'quantity')? "number": "text"}
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
                                [{name:'Save', type:'primary'}, {name:'Draft', type:'secondary'}, {name:'Clear', type:'warning'}, {name:'Reset', type:'danger'}, {name:'Add', type:'dark'}].map((button, index)=>{
                                    return(
                                        <div className="col" key={`${index}GBB`}>
                                            <button className={`btn btn-${button.type}`} 
                                                name={button.name}
                                                onClick={buttonClickHandler}
                                                type={(button.name === 'Save' || button.name === 'Draft')
                                                    ? "submit" 
                                                    : (button.name === 'Clear')
                                                        ? "reset" : "submit"
                                                }
                                            >
                                                {button.name}
                                            </button>
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