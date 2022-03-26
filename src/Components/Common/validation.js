import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


const ERROR_COLOR = 'red';
const NAME_REGEX = new RegExp('^[a-zA-Z\\s]*$');
const ADDRESS_REGEX = new RegExp('^[a-zA-Z]*$');
const PHONE_REGEX = new RegExp('^$|^[9][0-9]{9}$');
const NUMBER_REGEX = new RegExp('null|^\\d*\\.?\\d+$');
const DECIMAL_REGEX = new RegExp('^\\d+\.?\\d*$');
// const NUMBER_REGEX = new RegExp('null|^[0-9][0-9]*$');
const EMAIL_REGEX = new RegExp('^$|^(([^<>()[\\]\\.,;:\s@"]+(\.[^<>()[\\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');




/**Validate inputs */
const VerifyInputs = () =>{
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (eventt) {

                if (!form.checkValidity()) {
                    console.log("IN")
                    // total weight

                    form.getElementsByTagName('input')[9].required = true;
                    // net weight
                    form.getElementsByTagName('input')[8].required = true;
                    if(form.getElementsByTagName('input')[8].value >0){

                        form.getElementsByTagName('input')[9].required = false;
                    }
                    else if(form.getElementsByTagName('input')[9].value >0){

                        form.getElementsByTagName('input')[8].required = false;
                    }
                    eventt.preventDefault();

                    eventt.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);

        })
}


/**Reset validation for new data */
const removeResetValidation=()=>{
    'use strict'

    var forms = document.getElementsByTagName("form");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.classList.remove('was-validated');
        })

}


const invalidMessage =({emptyFieldName, errorMessage, location})=>{
    const pathname = (location === undefined)? '': location['pathname'];
    const inputField = (!['customerProductWeight', 'discount', 'advanceAmount', 'payedAmount'].includes(emptyFieldName))
        ? document.getElementsByName(emptyFieldName)[0]
        : (pathname !== '/bill')?document.getElementsByName(emptyFieldName)[0]: document.getElementsByName(emptyFieldName)[1];

    inputField.focus();
    inputField.style.color = ERROR_COLOR;
    inputField.style.borderColor = ERROR_COLOR;
    document.getElementsByClassName(`${emptyFieldName}-tooltip`)[0].hidden = false;
    document.getElementsByClassName(`${emptyFieldName}-tooltip`)[0].innerHTML  = (errorMessage === 'empty') ?'Should not be empty!' :errorMessage;

    return false;
}

/**
 * BILL Validaiion section
 */
const clearErrorMessage=(inputName, location)=>{
    const pathname = (location === undefined)? '': location['pathname'];
    if(!['customerProductWeight', 'discount', 'advanceAmount', 'payedAmount'].includes(inputName)){
        document.getElementsByName(inputName)[0].style.color ='black';
        document.getElementsByClassName(`${inputName}-tooltip`)[0].hidden = true;
        document.getElementsByName(inputName)[0].style.borderColor ='rgb(206, 212, 218)';
    }
    else{
        const index = (pathname === '/bill') ?1 :0
        document.getElementsByName(inputName)[index].style.color ='black';
        document.getElementsByName(inputName)[index].style.borderColor ='black';
    }

}



const isBillProductAddValid=(product, billProduct)=>{
    if(product.productName === '' || product.productName === null || product.productName === undefined){
        return invalidMessage({emptyFieldName: 'productName', errorMessage: 'empty'})
    }
    else if(product.netWeight === '' || product.netWeight === null || product.netWeight === undefined){
        return invalidMessage({emptyFieldName: 'netWeight', errorMessage: 'empty'})
    }
    else if(billProduct.lossWeight === '' || billProduct.lossWeight === null || billProduct.lossWeight === undefined){
        return invalidMessage({emptyFieldName: 'lossWeight', errorMessage: 'empty'})
    }
    else if(billProduct.makingCharge === '' || billProduct.makingCharge === null || billProduct.makingCharge === undefined){
        return invalidMessage({emptyFieldName: 'makingCharge', errorMessage: 'empty'})
    }
    else if( (product.gemsPrice !== '' && product.gemsPrice !== undefined && product.gemsPrice !== null) && (!NUMBER_REGEX.test(product.gemsPrice))  ){
        return invalidMessage({emptyFieldName: 'gemsPrice', errorMessage: 'Invalid ! should not be negative or alphabet'})
    }
    else if((product.gemsPrice !== '' && product.gemsPrice !== undefined && product.gemsPrice !== null) && (product.gemsName === '' || product.gemsName === undefined || product.gemsName === null)){
        return invalidMessage({emptyFieldName: 'gemsName', errorMessage: 'empty'})
    }

    return true;
}

const isNewBillValid=(customer, bill, billProductList, location)=>{
    if(billProductList.length <=0){
        Toast.fire({
            icon: 'error',
            title: 'Product missing'
        });

        return false;
    }
    else{
        if( customer.name === '' || customer.name === undefined ){

            return invalidMessage({emptyFieldName: 'name', errorMessage: 'empty'});
        }
        else if(!NAME_REGEX.test(customer.name)){

            return invalidMessage({emptyFieldName: 'name', errorMessage: 'Invalid !! Should alphabet only'});
        }

        else if( customer.address === '' || customer.address === undefined ){

            return  invalidMessage({emptyFieldName: 'address', errorMessage: 'empty'});
        }
        else if(!ADDRESS_REGEX.test(customer.address)){

            return invalidMessage({emptyFieldName: 'address', errorMessage: 'Invalid !! Should alphabet only'});
        }

        else if((customer.phone !== '' || customer.phone !== undefined || customer.phone !== null) && (!PHONE_REGEX.test(customer.phone)) ){

            return invalidMessage({emptyFieldName: 'phone', errorMessage: 'Invalid !!'});
        }

        else if((customer.email !== '' || customer.email !== undefined || customer.email !== null) && (!EMAIL_REGEX.test(customer.email)) ){

            return invalidMessage({emptyFieldName: 'email', errorMessage: 'Invalid !! check email format'});
        }

        else if((bill.customerProductWeight !== '' || bill.customerProductWeight !== undefined || bill.customerProductWeight !== null) && (!NUMBER_REGEX.test(bill.customerProductWeight)) ){

            return invalidMessage({emptyFieldName: 'customerProductWeight', errorMessage: 'Invalid !!', location});
        }

        else if( (bill.discount !== '' || bill.discount !== undefined || bill.discount !== null) && (!NUMBER_REGEX.test(bill.discount)) ){

            return  invalidMessage({emptyFieldName: 'discount', errorMessage: 'Invalid ! should not be negative or alphabet', location});
        }
        else if( (bill.advanceAmount !== '' || bill.advanceAmount !== undefined || bill.advanceAmount !== null) && (!NUMBER_REGEX.test(bill.advanceAmount)) ){

            return  invalidMessage({emptyFieldName: 'advanceAmount', errorMessage: 'Invalid ! should not be negative or alphabet', location});
        }
        else if( (bill.payedAmount !== '' || bill.payedAmount !== undefined || bill.payedAmount !== null) && (!NUMBER_REGEX.test(bill.payedAmount)) ){

            return  invalidMessage({emptyFieldName: 'payedAmount', errorMessage: 'Invalid ! should not be negative or alphabet', location});
        }
    }

    return true;
}

const removeResetBillValidation=()=>{
    ['name', 'address', 'phone', 'email', 'productName', 'netWeight', 'lossWeight', 'makingCharge', 'gemsName', 'gemsPrice', 'customerProductWeight', 'discount', 'advanceAmount', 'payedAmount']
        .forEach((fieldName)=>{

            if(!['customerProductWeight', 'discount', 'advanceAmount', 'payedAmount'].includes(fieldName)){

                document.getElementsByName(fieldName)[0].style.color ='black';
                document.getElementsByClassName(`${fieldName}-tooltip`)[0].hidden = true;
                document.getElementsByName(fieldName)[0].style.borderColor ='rgb(206, 212, 218)';
            }
            else{

                document.getElementsByName(fieldName)[1].style.color ='black';
                document.getElementsByName(fieldName)[1].style.borderColor ='black';
            }

        })
}




/**
 * ORDER Validaiion section
 */
// For Order
const removeResetOrderValidation=()=>{
    ['name', 'address', 'phone', 'email', 'productName', 'netWeight', 'totalWeight', 'customerProductWeight', 'advanceAmount', 'submittionDate']
        .forEach((fieldName)=>{
            document.getElementsByName(fieldName)[0].style.color ='black';

            if(!['customerProductWeight', 'advanceAmount', 'submittionDate'].includes(fieldName)){
                document.getElementsByClassName(`${fieldName}-tooltip`)[0].hidden = true;
                document.getElementsByName(fieldName)[0].style.borderColor ='rgb(206, 212, 218)';
            }
            else{
                document.getElementsByName(fieldName)[0].style.borderColor ='black';
            }

        })
}



// For Order
const isNewOrderValid=(customer, order, orderProductList)=>{
    if(orderProductList.length <=0){
        Toast.fire({
            icon: 'error',
            title: 'Product missing'
        });

        return false;
    }
    else{

        if( customer.name === '' || customer.name === undefined ){

            return invalidMessage({emptyFieldName: 'name', errorMessage: 'empty'});
        }
        else if(!NAME_REGEX.test(customer.name)){

            return invalidMessage({emptyFieldName: 'name', errorMessage: 'Invalid !! Should alphabet only'});
        }

        else if( customer.address === '' || customer.address === undefined ){

            return  invalidMessage({emptyFieldName: 'address', errorMessage: 'empty'});
        }
        else if(!ADDRESS_REGEX.test(customer.address)){

            return invalidMessage({emptyFieldName: 'address', errorMessage: 'Invalid !! Should alphabet only'});
        }

        else if((customer.phone !== '' || customer.phone !== undefined || customer.phone !== null) && (!PHONE_REGEX.test(customer.phone)) ){

            return invalidMessage({emptyFieldName: 'phone', errorMessage: 'Invalid !!'});
        }

        else if((customer.email !== '' || customer.email !== undefined || customer.email !== null) && (!EMAIL_REGEX.test(customer.email)) ){

            return invalidMessage({emptyFieldName: 'email', errorMessage: 'Invalid !! check email format'});
        }

        else if((order.customerProductWeight !== '' || order.customerProductWeight !== undefined || order.customerProductWeight !== null) && (!NUMBER_REGEX.test(order.customerProductWeight)) ){

            return invalidMessage({emptyFieldName: 'customerProductWeight', errorMessage: 'Invalid !!'});
        }

        else if((order.advanceAmount !== '' || order.advanceAmount !== undefined || order.advanceAmount !== null) && (!NUMBER_REGEX.test(order.advanceAmount)) ){

            return invalidMessage({emptyFieldName: 'advanceAmount', errorMessage: 'Invalid !!'});
        }

        else if( order.submittionDate === '' || order.submittionDate === undefined || order.submittionDate === null){

            return invalidMessage({emptyFieldName: 'submittionDate', errorMessage: 'empty'});
        }

    }

    return true;
}



//For Order
const isOrderProductAddValid=(product, orderProduct)=>{

    if(product['productName'] === '' || product['productName'] === undefined){

        return invalidMessage({emptyFieldName: 'productName', errorMessage: 'empty'});
    }
    else{
        let emptyfield = []

        if(product['netWeight'] === '' || product['netWeight'] === undefined|| product['netWeight'] === null){
            emptyfield.push('netWeight');
        }

        if(orderProduct['totalWeight'] === '' || orderProduct['totalWeight'] === undefined|| orderProduct['totalWeight'] === null){
            emptyfield.push('totalWeight');
        }

        emptyfield = (emptyfield.length<2) ?[] :emptyfield;
        for(const index in emptyfield){

            return invalidMessage({emptyFieldName: emptyfield[index], errorMessage: 'empty'});
        }

        if(!NUMBER_REGEX.test(product['netWeight'])){

            return invalidMessage({emptyFieldName: 'netWeight', errorMessage: 'Invalid ! should be number  gereater than 0'});
        }

        if( (orderProduct.totalWeight !== '' || orderProduct.totalWeight !== undefined || orderProduct.totalWeight !== null) && (!NUMBER_REGEX.test(orderProduct.totalWeight)) ){ // pick from here->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            return invalidMessage({emptyFieldName: 'totalWeight', errorMessage: 'Invalid ! should not be negative'});
        }
        else if( (product.size !== '' || product.size !== undefined || product.size !== null) && (!NUMBER_REGEX.test(product.size)) ){

            return  invalidMessage({emptyFieldName: 'size', errorMessage: 'Invalid ! should not be negative'});
        }

    }

    return true;
}



/**
 * Rate section
 */


const isRateValid=(currentRate)=>{
    const {hallmarkRate, tajabiRate, silverRate} = currentRate;

    if(hallmarkRate === ''){
        return invalidMessage({emptyFieldName: 'hallmarkRate', errorMessage: 'empty'});
    }
    else if( (hallmarkRate<=0) || (!DECIMAL_REGEX.test(hallmarkRate)) ){
        return invalidMessage({emptyFieldName: 'hallmarkRate', errorMessage: 'Invalid ! should be number greater than 0'});
    }
    else if(tajabiRate === ''){
        return invalidMessage({emptyFieldName: 'tajabiRate', errorMessage: 'empty'});
    }
    else if( (tajabiRate<=0) || (!DECIMAL_REGEX.test(tajabiRate)) ){
        return invalidMessage({emptyFieldName: 'tajabiRate', errorMessage: 'Invalid ! should be number greater than 0'});
    }
    else if(silverRate === ''){
        return invalidMessage({emptyFieldName: 'silverRate', errorMessage: 'empty'});
    }
    else if( (tajabiRate<=0) || (!DECIMAL_REGEX.test(silverRate)) ){
        return invalidMessage({emptyFieldName: 'silverRate', errorMessage: 'Invalid ! should be number greater than 0'});
    }

    return true;
}

const removeResetRateValidation=()=>{
    ['hallmarkRate', 'tajabiRate', 'silverRate']
        .forEach((fieldName)=>{
            document.getElementsByName(fieldName)[0].style.color ='black';
            document.getElementsByClassName(`${fieldName}-tooltip`)[0].hidden = true;
            document.getElementsByName(fieldName)[0].style.borderColor ='rgb(206, 212, 218)';
        })
}



/**
 * STAFF ASSIGN WORK section
 * 
 */

const isAssignWorkValid=(workDetail, selectedOrderProductDetail, btnId)=>{
    const {staff, givenWeight, KDMWeight, submittionDate, finalProductWeight, submittedWeight, lossWeight} = workDetail;

    if(selectedOrderProductDetail === null || selectedOrderProductDetail === '' || selectedOrderProductDetail === undefined){
        Toast.fire({
            icon: 'error',
            title: 'Order products\' missing'
        });

        let orderId = document.getElementById('orderId');
        console.log(orderId)
        orderId.focus();
        orderId.style.color = 'red';
        orderId.style.borderColor = 'red';

        return false;
    }
    else if (staff === null || staff === undefined || staff === ''){
        Toast.fire({
            icon: 'error',
            title: 'Staff not selected !'
        });

        let staffInput = document.getElementsByName('staff');
        staffInput.style.color = 'red';
        staffInput.style.borderColor = 'red';

        return false;
    }
    else{
        if(givenWeight === '' || givenWeight === null || givenWeight === undefined){
            return invalidMessage({emptyFieldName: 'givenWeight', errorMessage: 'empty'});
        }
        else if( (givenWeight<=0) || (!DECIMAL_REGEX.test(givenWeight)) ){
            return invalidMessage({emptyFieldName: 'givenWeight', errorMessage: 'Invalid ! should be number greater than 0'});
        }
        else if(KDMWeight === '' || KDMWeight === null || KDMWeight === undefined){
            return invalidMessage({emptyFieldName: 'KDMWeight', errorMessage: 'empty'});
        }
        else if( (KDMWeight<=0) || (!DECIMAL_REGEX.test(KDMWeight)) ){
            return invalidMessage({emptyFieldName: 'KDMWeight', errorMessage: 'Invalid ! should be number greater than 0'});
        }
        else if(submittionDate === '' || submittionDate === null || submittionDate === undefined){
            return invalidMessage({emptyFieldName: 'submittionDate', errorMessage: 'empty'});
        }    
        else if(submittionDate === '' || submittionDate === null || submittionDate === undefined){
            return invalidMessage({emptyFieldName: 'submittionDate', errorMessage: 'empty'});
        }
        else if(btnId === 'submit-work'){
            if(finalProductWeight === '' || finalProductWeight === null || finalProductWeight === undefined || finalProductWeight === NaN){
                return invalidMessage({emptyFieldName: 'finalProductWeight', errorMessage: 'empty'});
            }
            else if( (finalProductWeight<=0) || (!DECIMAL_REGEX.test(finalProductWeight)) ){
                return invalidMessage({emptyFieldName: 'finalProductWeight', errorMessage: 'Invalid ! should be number greater than 0'});
            }
            else if(submittedWeight === '' || submittedWeight === null || submittedWeight === NaN || submittedWeight === undefined  ){
                return invalidMessage({emptyFieldName: 'submittedWeight', errorMessage: 'empty'});
            }
            else if( (submittedWeight<=0) || (!DECIMAL_REGEX.test(submittedWeight)) ){
                return invalidMessage({emptyFieldName: 'submittedWeight', errorMessage: 'Invalid ! should be number greater than 0'});
            }
            else if(lossWeight === '' || lossWeight === null || lossWeight === NaN || lossWeight === undefined  ){
                return invalidMessage({emptyFieldName: 'lossWeight', errorMessage: 'empty'});
            }
            else if( (lossWeight<0) || (!DECIMAL_REGEX.test(lossWeight)) ){
                return invalidMessage({emptyFieldName: 'lossWeight', errorMessage: 'Invalid ! should be number greater than 0'});
            }
        }
        
    }
    
    return true;
}

const removeResetAssignWorkValidation=()=>{
    ['givenWeight', 'KDMWeight', 'submittionDate', 'finalProductWeight', 'submittedWeight', 'lossWeight', 'submittedDate']
        .forEach((fieldName)=>{
            document.getElementsByName(fieldName)[0].style.color ='black';
            document.getElementsByClassName(`${fieldName}-tooltip`)[0].hidden = true;
            document.getElementsByName(fieldName)[0].style.borderColor ='rgb(206, 212, 218)';
        })
    
    let orderId = document.getElementById('orderId');
    orderId.style.color = 'black';
    orderId.style.borderColor = 'black';

    let staffInput = document.getElementsByName('staff')[0];
    staffInput.style.color = 'black';
    staffInput.style.borderColor = 'black';

}

const clearAssignWorkErrorMessage=(inputName)=>{
    if(!['orderId', 'staff'].includes(inputName)){
        document.getElementsByName(inputName)[0].style.color ='black';
        document.getElementsByClassName(`${inputName}-tooltip`)[0].hidden = true;
        document.getElementsByName(inputName)[0].style.borderColor ='rgb(206, 212, 218)';
    }
    else{
        let input = document.getElementsByName(inputName)[0];
        input.style.color = 'black';
        input.style.borderColor = 'black';
    }
}


/**
 * Register Staff section
 */

const isRegisterStaffValid=(newStaffDetail)=>{
    const { staffName, phone, address, email } = newStaffDetail;
    console.log(newStaffDetail)
    if(staffName === '' || staffName === undefined){
        return invalidMessage({emptyFieldName: 'staffName', errorMessage: 'empty'});
    }
    else if(!NAME_REGEX.test(staffName)){
        return invalidMessage({emptyFieldName: 'staffName', errorMessage: 'Invalid ! Should be alphabet only'});
    }

    else if(address === '' || address === undefined){
        return invalidMessage({emptyFieldName: 'address', errorMessage: 'empty'});
    }
    else if(!NAME_REGEX.test(address)){
        return invalidMessage({emptyFieldName: 'address', errorMessage: 'Invalid ! Should be alphabet only'});
    }

    else if(phone === '' || phone === undefined){
        return invalidMessage({emptyFieldName: 'phone', errorMessage: 'empty'});
    }
    else if(!PHONE_REGEX.test(phone)){
        return invalidMessage({emptyFieldName: 'phone', errorMessage: 'Invalid ! phone number format'});
    }

    else if(email !== '' && email !== undefined && email !== null){
        if((!EMAIL_REGEX.test(email)) ){
            return invalidMessage({emptyFieldName: 'email', errorMessage: 'Invalid !! check email format'});
        } 
    }


    return true;
}   


const resetRegisterStaffValidation=()=>{
    ['staffName', 'phone', 'address', 'email']
        .forEach((fieldName)=>{
            document.getElementsByName(fieldName)[0].style.color ='black';
            document.getElementsByClassName(`${fieldName}-tooltip`)[0].hidden = true;
            document.getElementsByName(fieldName)[0].style.borderColor ='rgb(206, 212, 218)';
        })
}


const clearRegisterStaffErrorMessage=(inputName)=>{
    document.getElementsByName(inputName)[0].style.color ='black';
    document.getElementsByClassName(`${inputName}-tooltip`)[0].hidden = true;
    document.getElementsByName(inputName)[0].style.borderColor ='rgb(206, 212, 218)';
}


/**
 * FOR LOGIN PAGE [CHANGE PASSWORD]
 */

const validateChangePasswordEmail=(email)=>{
    let isValid = true;

    if(email === '' || email === undefined || email === null){
        isValid = false;
    }
    else if(!EMAIL_REGEX.test(email)){
        isValid = false;
    }

    document.getElementsByName('email')[0].style.borderColor =(isValid) ?'#012970' :'red';

    return isValid;
}



/**
 * ADMIN
 */

const validateAdminDetail=(adminDetail)=>{
    console.log(adminDetail)
    const {name, firstName, lastName, phone, email, panNumber, registrationDate} = adminDetail;

    if( name ==='' || name === undefined || name === null){
        return invalidMessage({emptyFieldName: 'name', errorMessage: 'empty'});
    }
    else if(!NAME_REGEX.test(name)){
        return invalidMessage({emptyFieldName: 'name', errorMessage: 'Invalid !! Should be only alphabet'});
    }

    else if( firstName ==='' || firstName === undefined || firstName === null){
        return invalidMessage({emptyFieldName: 'firstName', errorMessage: 'empty'});
    }
    else if(!NAME_REGEX.test(firstName)){
        return invalidMessage({emptyFieldName: 'firstName', errorMessage: 'Invalid !! Should be only alphabet'});
    }

    else if( lastName ==='' || lastName === undefined || lastName === null){
        return invalidMessage({emptyFieldName: 'lastName', errorMessage: 'empty'});
    }
    else if(!NAME_REGEX.test(lastName)){
        return invalidMessage({emptyFieldName: 'lastName', errorMessage: 'Invalid !! Should be only alphabet'});
    }

    else if(!PHONE_REGEX.test(phone)){
        return invalidMessage({emptyFieldName: 'phone', errorMessage: 'Invalid !! check phone no. format'});
    }

    else if( email ==='' || email === undefined || email === null){
        return invalidMessage({emptyFieldName: 'email', errorMessage: 'empty'});
    }
    else if(!EMAIL_REGEX.test(email)){
        return invalidMessage({emptyFieldName: 'email', errorMessage: 'Invalid !! Check email format'});
    }
    
    else if( panNumber ==='' || panNumber === undefined || panNumber === null){
        console.log(panNumber)
        return invalidMessage({emptyFieldName: 'panNumber', errorMessage: 'empty'});
    }
    else if(!NUMBER_REGEX.test(panNumber)){
        return invalidMessage({emptyFieldName: 'panNumber', errorMessage: 'Invalid !! Should be only number'});
    }

    else if( registrationDate ==='' || registrationDate === undefined || registrationDate === null){
        return invalidMessage({emptyFieldName: 'registrationDate', errorMessage: 'empty'});
    }

    return true;
}

const clearRegisterAdminErrorMessage=(inputName)=>{
    document.getElementsByName(inputName)[0].style.color ='black';
    document.getElementsByClassName(`${inputName}-tooltip`)[0].hidden = true;
    document.getElementsByName(inputName)[0].style.borderColor ='rgb(206, 212, 218)';
}


const validateChangePassword=(passwordDetail)=>{
    let {oldPassword, newPassword1, newPassword2} = passwordDetail;
    let isValid = true;

    if(oldPassword === '' || oldPassword === undefined || oldPassword === null){
        isValid = false;
    }
    else if(newPassword1 === '' || newPassword1 === undefined || newPassword1 === null){
        isValid = false;
    }
    else if(newPassword2 === '' || newPassword2 === undefined || newPassword2 === null){
        isValid = false;
    }
    else if (newPassword1 !== newPassword2){
        isValid = false;
    }

    if(!isValid){
        ['oldPassword', 'newPassword1', 'newPassword2'].forEach((name)=>{
            document.getElementsByName(name)[0].style.color ='red';
            document.getElementsByName(name)[0].style.borderColor ='red';
        });
        
        Toast.fire({
            icon: 'error',
            title: 'Invalid Detail !!'
        });
    }

    return isValid
}

const clearChangePasswordError=(passwordDetail)=>{
    ['oldPassword', 'newPassword1', 'newPassword2'].forEach((name)=>{
        document.getElementsByName(name)[0].style.color ='black';
        document.getElementsByName(name)[0].style.borderColor ='rgb(206, 212, 218)';
    });
}

export  {VerifyInputs, removeResetValidation, isNewOrderValid, isOrderProductAddValid, removeResetOrderValidation,
            isBillProductAddValid, isNewBillValid,  removeResetBillValidation, clearErrorMessage,
            isRateValid,removeResetRateValidation,
            isAssignWorkValid, removeResetAssignWorkValidation, clearAssignWorkErrorMessage,
            isRegisterStaffValid, resetRegisterStaffValidation, clearRegisterStaffErrorMessage,
            validateChangePasswordEmail,
            validateAdminDetail, clearRegisterAdminErrorMessage,
            validateChangePassword, clearChangePasswordError,
        }
