
const calculatePerProductAmount = (billProduct,rate)=>{
    let { product, lossWeight, makingCharge, totalWeight } = billProduct;
    let{ netWeight, gemsPrice } = product;

    billProduct.totalWeight = parseFloat(netWeight) + parseFloat(lossWeight);

    totalWeight = billProduct.totalWeight;

    gemsPrice = (gemsPrice == null)? 0: gemsPrice;
    billProduct.totalAmountPerProduct = (parseFloat(totalWeight) * parseFloat(calculateRatePerLal(rate))) + parseFloat(makingCharge) + parseFloat(gemsPrice);

    return billProduct;
}

const calculateFinalWeightAndAmount = (billProductList)=>{
    let finalWeight = 0;
    let finalAmount = 0;

    billProductList.map((item)=>{
        finalWeight += (item.totalWeight == null)? 0 : item.totalWeight;
        finalAmount += (item.totalAmountPerProduct == null)? 0 : item.totalAmountPerProduct;
    });

    return { "finalWeight": parseFloat(finalWeight), "finalAmount":parseFloat(finalAmount)};
}

const calculateRatePerLal=(rate)=>{
    return rate/100;
}

const calculateGrandTotalAmount=({totalAmount, customerProductAmount, discount})=>{
    discount = (discount == null)? 0 : discount;
    totalAmount = (totalAmount == null) ? 0 : totalAmount;
    customerProductAmount = (customerProductAmount == null)? 0 : customerProductAmount;

    return (totalAmount-customerProductAmount)-discount;
}

const calculateRemaingAmount=({grandTotalAmount, payedAmount, advanceAmount})=>{
    payedAmount = (payedAmount == null)? 0 : payedAmount;
    advanceAmount = (advanceAmount == null)? 0 : advanceAmount;
    grandTotalAmount = (grandTotalAmount == null)? 0 : grandTotalAmount;

    return (grandTotalAmount - payedAmount - advanceAmount);
}


export { calculatePerProductAmount, calculateFinalWeightAndAmount, calculateRatePerLal, calculateGrandTotalAmount, calculateRemaingAmount }