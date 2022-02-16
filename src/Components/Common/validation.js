/**Validate inputs */
const VerifyInputs = () =>{
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    console.log("CAlled ->")
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (eventt) {
                
                if (!form.checkValidity()) {
                    form.getElementsByTagName('input')[9].required = true;
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


export  {VerifyInputs, removeResetValidation}