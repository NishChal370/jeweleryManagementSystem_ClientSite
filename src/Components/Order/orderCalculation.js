
const calculateTotalWeight = (finalWeight, customerProductAmount)=>{
    finalWeight = (finalWeight === null)? 0: finalWeight;
    customerProductAmount = (customerProductAmount === null) ?0 :customerProductAmount;

    return (finalWeight - customerProductAmount)

}

export {calculateTotalWeight}