appInit = ()=>{
    renderTable();
    $(".action-link").click(onActionLinkClick); 
    $(".edit").click(onEditButtonClick);
    $(".save-btn").click(onSaveButtonClick);
    $(".add-btn").click(onAddButtonClick);
    $(".confirm-btn").click(onConfirmDeleteBtnClick);
}
hidePages = () => {
    $(".component").hide();
}
navigate = (targetScreen) =>{
    $(targetScreen).show();
}
onActionLinkClick = (e) => {
    var target = $(e.target).data("target");
    hidePages();
    navigate(target);
}
renderTable = ()=> {
    $(".patient-list-body").empty();
    var list = $(".patient-list-body"); 
    var str = $(".template").html(); // just Show id to user 

    for( let i=0; i<patientsData.length; i++){
        var templete = renderTemplete(str,patientsData[i]);
        list.append(templete);
    }
}
renderTemplete = (templateText, data) =>{   
    var myString = templateText; 
    for(let i=0; i<myString.length; i++){
        if(myString.includes("{{")){     
            var indexOpen = myString.indexOf("{")+2;
            var indexClose =  myString.indexOf("}");
            var key = myString.substring(indexOpen,indexClose);
            //=== replace
            myString = myString.replace("{{"+key+"}}", data[key]);
        } 
    }     
    return myString;
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
        var targetObject = GetPatientById(id);    
        LoadControlsData(targetObject); 
    }
}
onSaveButtonClick =()=>{
    var currentPatientData = GetControlsData (patientID);
    if(formMode == "Edit"){
        updateData(currentPatientData)
    } 
    else{
       AddPatientData(currentPatientData) 
    } 
    renderTable();     
}
LoadControlsData = (targetObject) =>{
    $("#FirstNameInput").val(targetObject.fname);
    $("#MiddleNameInput").val(targetObject.mname);
    $("#LastNameInput").val(targetObject.lname);
    $("#EmailInput").val(targetObject.email);
    $(".StatusValue").append($('<option>').html(targetObject.status))
    var birthDate = moment(targetObject.DOB).format('yyyy-MM-DD')
    $("#DateInput").val(birthDate)
           
    // Active
    if(targetObject.Active){
        $('.ActiveInput').prop('checked', true);
    }
    // Gender
    if(targetObject.gender == 1){
        $("#maleRadio1").prop('checked', true)
    }
    else{
        $("#femaleRadio2").prop('checked', true)
    }
    // Last check
    var checkDate = moment(targetObject.lastCheck).format('yyyy-MM-DD')
    $(".lastCheckInput").append($('<option>').html(checkDate));
}
GetControlsData = () =>{
    var fname   = $("#FirstNameInput").val();
    var mname   = $("#MiddleNameInput").val();
    var lname   = $("#LastNameInput").val();
    var email   = $("#EmailInput").val();
    var status  = $(".StatusValue").val();
    var DOB     = $("#DateInput").val();
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
GetPatientById=(id)=>{
    var result;
    for(let i=0; i<patientsData.length; i++){     
        if(id == patientsData[i].ID){
            result = patientsData[i];
        }
    }
    return result;
}
updateData = (currentPatientData) =>{
    var patient_Data = GetPatientById(patientID);
    patient_Data.fname     = currentPatientData.fname;
    patient_Data.mname     = currentPatientData.mname;
    patient_Data.lname     = currentPatientData.lname;
    patient_Data.email     = currentPatientData.email;
    patient_Data.status    = currentPatientData.status;
    patient_Data.DOB       = currentPatientData.DOB;
    patient_Data.lastCheck = currentPatientData.lastCheck;
    patient_Data.Active    = currentPatientData.Active;
    patient_Data.gender    = currentPatientData.gender; 

    return patient_Data;
}
AddPatientData = (currentPatientData)=>{
    let maxId = GetMaxId();
    currentPatientData.ID = maxId + 1;
    patientsData.push(currentPatientData);
}
GetMaxId = ()=>{
    let max = patientsData[0].ID;
    for(let i=0;i<patientsData.length; i++){
        if(patientsData[i].ID > max){
            max = patientsData[i].ID
        }
    }
    return max;
}
resetControls = () =>{
    $("input,select").val("").prop('checked', false);
    $('.patient-id').html("");
   
}
onConfirmDeleteBtnClick = () =>{
    $(".modal").modal("hide");
    DeleteData();  
    renderTable();  
}
DeleteData = ()=>{
    var targetObject = GetPatientById(patientID);    
    patientsData.splice(findIndexObject(targetObject),1)
    resetControls(); 
}
findIndexObject = (targetObject)=>{ 
    for(let i=0; i<patientsData.length; i++){
        if(patientsData[i] == targetObject){
            return IndexObj = i;
        }
    }
}
$(document).ready(appInit);