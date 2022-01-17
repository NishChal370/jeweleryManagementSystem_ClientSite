const INITIAL_CUSTOMER = {
    name: '',
    address: '',
    phone: '',
    email: '',
};

const INITIAL_BILL = {
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

const INITIAL_BILL_PRODUCT = {
    lossWeight: '',
    totalWeight: '',
    rate: '',
    makingCharge: '',
    totalAmountPerProduct: 0.0,
};

const INITIAL_PRODUCT =  {
    productName: '',
    netWeight: '',
    size: 0.0,
    gemsName: '',
    gemsPrice: '',
};

const INITIAL_BILL_PRODUCT_LIST = [];


export {INITIAL_CUSTOMER, INITIAL_BILL, INITIAL_BILL_PRODUCT, INITIAL_PRODUCT, INITIAL_BILL_PRODUCT_LIST}