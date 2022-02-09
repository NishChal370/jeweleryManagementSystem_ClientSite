let INITIAL_CUSTOMER = {
    name: '',
    address: '',
    phone: null,
    email: '',
};

let INITIAL_ORDER = {
    orderId : null,
    date: new Date().toJSON().slice(0,10),
    rate: null,
    type: 'gold',
    advanceAmount : null,
    submittionDate : null,
    submittedDate : null,
    // finalWeight: null,
    customerProductWeight : null,
    // customerProductAmount : null,
    // grandTotalWeight : null,
    status : 'pending',
    remark : '',
}

let INITIAL_ORDER_PRODUCT = {
    quantity : 1,
    design: '',
    totalWeight : null,
    status : 'pending'
}

let INITIAL_PRODUCT =  {
    productName: '',
    netWeight: null,
    size: null,
    gemsName: '',
    gemsPrice: null,
};

let INITIAL_ORDER_PRODUCT_LIST = [];

export { INITIAL_CUSTOMER, INITIAL_ORDER, INITIAL_ORDER_PRODUCT, INITIAL_PRODUCT, INITIAL_ORDER_PRODUCT_LIST }