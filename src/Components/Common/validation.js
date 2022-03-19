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


const invalidMessage =({emptyFieldName, errorMessage})=>{
    const inputField = document.getElementsByName(emptyFieldName)[0];

    inputField.focus();
    inputField.style.color = ERROR_COLOR;
    inputField.style.borderColor = ERROR_COLOR;
    document.getElementsByClassName(`${emptyFieldName}-tooltip`)[0].hidden = false;
    document.getElementsByClassName(`${emptyFieldName}-tooltip`)[0].innerHTML  = (errorMessage === 'empty') ?'You missed me !' :errorMessage;

    return false;
}



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

            return invalidMessage({emptyFieldName: 'size', errorMessage: 'Invalid ! hould not be negative'});
        }

    }

    return true;
}


export  {VerifyInputs, removeResetValidation, isNewOrderValid, isOrderProductAddValid, removeResetOrderValidation}
