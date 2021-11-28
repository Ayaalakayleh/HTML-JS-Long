class ValidationEngine{
    constructor(){}
    init=()=>{}

    ValidateForm=()=>{
        var isValid =true;
        var str ="";
        let elements = $("[data-validation]");
        for(let i=0; i<elements.length; i++){
            
            let element = elements[i];
            let target = $(element).data("validation");
    
            switch(target){
                case "required":
                    if( !this.validateRequireField($(element)) ){
                        isValid = false;
                        this.errorAlert($(element));
                        str +=" field is required -";
                    }
                    break;
                case "email":
                    if( !this.vallidateEmailField($(element)) ){
                        isValid = false;
                        this.errorAlert($(element));
                        str +=" Email is invalid -";
                    }
                    break;
                case "positiveNumber" :
                    if( !this.validatePositiveNumberField($(element)) ){
                        isValid = false;
                        this.errorAlert($(element));
                        str += " Age number is invalid -";
                    } 
                    break;  
                case "gender" :
                    if( !this.validateGenderField() ){
                        isValid = false;
                        str += " gender is required -";
                    } 
                break;
            }
            this.showBoxAlert(str);
        }
        
        return isValid; 
    }
    errorAlert=(element)=>{
        element.parent('.form-group').addClass("has-error");
        element.siblings("span").html("invalid").show();
    }
    showBoxAlert=(str)=>{
        $(".action-alert").addClass("alert-danger");
        $(".action-alert").html(str).fadeIn();   
    }
    successAlert=()=>{
        $(".action-alert").hide();
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
        if( pattern.test(element.val())){
            return true;   
        }
        else{
            return false;
        }
    }
    validateGenderField=()=>{
        if($(".maleRadio1").is(':checked') || $(".femaleRadio2").is(':checked')){
            return true;
        }
        else{
            return false;
        }
    }
}
let validationEngine = new ValidationEngine();
