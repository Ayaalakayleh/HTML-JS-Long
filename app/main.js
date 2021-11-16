appInit = ()=>{
    renderTable();
    $(".action-link").click(routerEngine.onActionLinkClick); 
    $(".edit").click(onEditButtonClick);
    $(".save-btn").click(onSaveButtonClick);
    $(".add-btn").click(onAddButtonClick);
    $(".confirm-btn").click(onConfirmDeleteBtnClick);
}
renderTable = ()=> {
    $(".patient-list-body").empty();
    var list = $(".patient-list-body"); 
    var str = $(".template").html(); // just Show id to user 

    for( let i=0; i<patientsData.length; i++){
        var templete = templateEngine.renderTemplete(str,patientsData[i]);
        list.append(templete);
    }
}
var patientID;
var formMode ;
onEditButtonClick = (e)=>{
    var IdRowTarget =  $(e.target).data("id");
    $('.patient-id').html(IdRowTarget);
    open(IdRowTarget);
}
onAddButtonClick = ()=>{
    open();    
}
open=(id)=>{
    patientID = id ;
    if(!id){
        formMode ="New";      
        resetControls();
    }
    else{
        formMode = "Edit";
        var patientData = DataService.getById(id);    
        LoadControlsData(patientData); 
    }
}
onSaveButtonClick =(e)=>{ 
   let checkValidation =  ValidateForm();

   if(checkValidation){
        var currentPatientData = GetControlsData (patientID);
        if(formMode == "Edit"){
            DataService.edit(currentPatientData);
        }     
        else{
            DataService.add(currentPatientData);     
        } 
        routerEngine.onActionLinkClick(e);
    }
    else{
        return;
    }
    renderTable(); 
}
errorAlert=(element)=>{
    element.parent('.form-group').addClass("has-error");
    element.siblings("span").html("invalid");
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
                if( !validateRequireField($(element)) ){
                    isValid = false;
                    errorAlert($(element))
                }
                break;
            case "email":
                if( !vallidateEmailField($(element)) ){
                    isValid = false;
                    errorAlert($(element))
                }
                break;
            case "positiveNumber" :
                if( !validatePositiveNumberField($(element)) ){
                    isValid = false;
                    errorAlert($(element))
                } 
                break;   
        }
    }

    if(!isValid){
        return false;
    }
    else{
        successAlert();
       
        return true;
    }   
}
LoadControlsData = (patientData) =>{
    $("#FirstNameInput").val(patientData.fname);
    $("#MiddleNameInput").val(patientData.mname);
    $("#LastNameInput").val(patientData.lname);
    $("#EmailInput").val(patientData.email);
    $(".StatusValue").append($('<option>').html(patientData.status));
    var birthDate = moment(patientData.DOB).format('yyyy-MM-DD');
    let age = moment(birthDate).fromNow(true);  
    $("#DateInput").val(birthDate);  
    $("#AgeInput").val(age);

    // Active
    if(patientData.Active){
        $('.ActiveInput').prop('checked', true);
    }
    // Gender
    if(patientData.gender == 1){
        $("#maleRadio1").prop('checked', true)
    }
    else{
        $("#femaleRadio2").prop('checked', true)
    }
    // Last check
    var checkDate = moment(patientData.lastCheck).format('yyyy-MM-DD')
    $(".lastCheckInput").append($('<option>').html(checkDate));
}
GetControlsData = () =>{   
    var fname   = $("#FirstNameInput").val();
    var mname   = $("#MiddleNameInput").val();
    var lname   = $("#LastNameInput").val();
    var email   = $("#EmailInput").val();
    var status  = $(".StatusValue").val();
    var DOB     = new Date($("#DateInput").val());
    var lastCheck = $(".lastCheckInput").val();
    var active;
    var gender;

    if($('.ActiveInput').is(':checked')){
        active = true;
    }
    else{
      active = false ; 
    } 
    if($("#maleRadio1").is(':checked')){
        gender = 1;
    }
    else{
      gender = 2 ; 
    }
    let currentPatientData = {
        fname:fname,
        mname:mname,
        lname:lname,
        email:email,
        status:status,
        DOB:DOB,
        lastCheck:lastCheck,
        Active:active,
        gender:gender
    }   
    return currentPatientData; 
}
resetControls = () =>{
    $("input,select").val("").prop('checked', false);
    $('.patient-id').html("");  
}
onConfirmDeleteBtnClick = () =>{
    $(".modal").modal("hide");
    DataService.Delete(patientID);  
    resetControls();
    renderTable();  
}
$(document).ready(appInit);