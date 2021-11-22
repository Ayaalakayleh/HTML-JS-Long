class ValidationEngine{
    constructor(){}
    init=()=>{}

    errorAlert=(element)=>{
        element.parent('.form-group').addClass("has-error");
        element.siblings("span").html("invalid");
    }
    showBoxAlert=(status,str)=>{
        //success alert
       if(status === 'success'){
            $(".action-alert").removeClass("alert-danger");
            $(".action-alert").addClass("alert-success");
       }
       // error alert
       else if(status === 'error'){
            $(".action-alert").removeClass("alert-success");
            $(".action-alert").addClass("alert-danger");
       }
        $(".action-alert").html(str).fadeIn();   
    }
    successAlert=()=>{
        $("input").parent('.form-group').removeClass("has-error");
        $("input").siblings("span").hide();
    }
    validateRequireField=(element)=>{
        if(element.val() !== ''){
            return true;   
        }
        else{
            return false;
        }
    }
    validatePositiveNumberField=(element)=>{
        let pattern = /^[1-9]\d*/g ;
        if( pattern.test(element.val()) && element.val()!==''){
            return true;   
        }
        else{
            return false;
        }
    }
    vallidateEmailField=(element)=>{
        let pattern =  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if( pattern.test(element.val()) && element.val()!=='' ){
            return true;   
        }
        else{
            return false;
        }
    }
    ValidateForm=()=>{
        var isValid =true;
        let elements = $("[data-validation]");
        for(let i=0; i<elements.length; i++){
            
            let element = elements[i];
            let target = $(element).data("validation");
    
            switch(target){
                case "required":
                    if( !this.validateRequireField($(element)) ){
                        isValid = false;
                        this.errorAlert($(element));
                        this.showBoxAlert("error","name is invalid");
                    }
                    break;
                case "email":
                    if( !this.vallidateEmailField($(element)) ){
                        isValid = false;
                        this.errorAlert($(element));
                        this.showBoxAlert("error","Email is invalid");
                    }
                    break;
                case "positiveNumber" :
                    if( !this.validatePositiveNumberField($(element)) ){
                        isValid = false;
                        this.errorAlert($(element));
                        this.showBoxAlert("error","Age number is invalid");
                    } 
                break;   
            }
        }
    
        if(!isValid){
            return false;
        }
        else{
            this.successAlert();
            this.showBoxAlert("success","Data Saved successfully");
            return true;
        }   
    }
}
let validationEngine = new ValidationEngine();
