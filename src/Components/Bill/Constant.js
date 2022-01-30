let INITIAL_CUSTOMER = {
    name: '',
    address: '',
    phone: null,
    email: '',
};

let INITIAL_BILL = {
    billId: null,
    orderId: null,
    date: null,
    rate: null,
    billType: 'gold',
    customerProductWeight: 0.0,
    customerProductAmount: 0.0,
    finalWeight: 0.0,
    grandTotalWeight: 0.0,
    totalAmount: '',
    discount: null,
    grandTotalAmount: null,
    advanceAmount: null,
    payedAmount: null,
    remainingAmount: null,
    status: 'submitted',
};

let INITIAL_BILL_PRODUCT = {
    lossWeight: null,
    totalWeight: null,
    rate: null,
    quantity: 1,
    makingCharge: null,
    totalAmountPerProduct: 0.0,
};

let INITIAL_PRODUCT =  {
    productName: '',
    netWeight: null,
    size: 0.0,
    gemsName: '',
    gemsPrice: null,
};

let INITIAL_BILL_PRODUCT_LIST = [];


export {INITIAL_CUSTOMER, INITIAL_BILL, INITIAL_BILL_PRODUCT, INITIAL_PRODUCT, INITIAL_BILL_PRODUCT_LIST, }