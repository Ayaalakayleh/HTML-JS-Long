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
   let checkValidation =  validationEngine.ValidateForm();

   if(checkValidation){
        var currentPatientData = GetControlsData (patientID);
        if(formMode == "Edit"){
            DataService.edit(currentPatientData);
        }     
        else{
            DataService.add(currentPatientData);     
        } 
        setTimeout(function(){
            routerEngine.onActionLinkClick(e);
        },1500)
    }
    else{
        return;
    }
    renderTable(); 
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