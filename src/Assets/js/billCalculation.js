
const calculatePerProductAmount = (billProduct,latestRate)=>{
    let {hallmarkRate} = latestRate;
    let { product, lossWeight, makingCharge, totalWeight } = billProduct;
    let{ netWeight, gemsPrice } = product;

    billProduct.totalWeight = parseFloat(netWeight) + parseFloat(lossWeight);

    totalWeight = billProduct.totalWeight;

    gemsPrice = (gemsPrice == '')? 0: gemsPrice;
    billProduct.totalAmountPerProduct = (parseFloat(totalWeight) * parseFloat(calculateRatePerLal(hallmarkRate))) + parseFloat(makingCharge) + parseFloat(gemsPrice);

    return billProduct;
}

const calculateFinalWeightAndAmount = (billProductList)=>{
    let finalWeight = 0;
    let finalAmount = 0;

    billProductList.map((item)=>{
        finalWeight += item.totalWeight;
        finalAmount += item.totalAmountPerProduct;
    });

    return { "finalWeight": parseFloat(finalWeight), "finalAmount":parseFloat(finalAmount)};
}

const calculateRatePerLal=(rate)=>{
    return rate/100;
}

const calculateGrandTotalAmount=({totalAmount, customerProductAmount, discount})=>{
    return (totalAmount-customerProductAmount)-discount;
}

const calculateRemaingAmount=({grandTotalAmount, payedAmount, advanceAmount})=>{
    return (grandTotalAmount - payedAmount - advanceAmount);
}


export { calculatePerProductAmount, calculateFinalWeightAndAmount, calculateRatePerLal, calculateGrandTotalAmount, calculateRemaingAmount }