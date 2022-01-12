/*Validate chagne rate input */
const ShowInvalidnMessage = () =>{
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (eventt) {
                if (!form.checkValidity()) {
                    eventt.preventDefault()
                    eventt.stopPropagation()
                }
                
                form.classList.add('was-validated')
            }, false)
        })

}

export  {ShowInvalidnMessage}