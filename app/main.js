appInit = ()=>{
    renderTable();
    $(".action-link").click(routerEngine.onActionLinkClick); 
    $(".edit").click(onEditButtonClick);
    $(".save-btn").click(onSaveButtonClick);
    $(".add-btn").click(onAddButtonClick);
    $(".confirm-btn").click(onConfirmDeleteBtnClick);
    ToastrAlert();
}
renderTable = ()=> {
    $(".patient-list-body").empty();
    var list = $(".patient-list-body"); 
    var str = $(".template").html();  

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
        patientEditScreen.resetControls();
    }
    else{
        formMode = "Edit";
        var patientData = DataService.getById(id);    
        patientEditScreen.LoadControlsData(patientData); 
    }
}
ToastrAlert=()=>{
    toastr.options = {
        "closeButton": true,  
        "progressBar": true,  //timer line
        "positionClass": "toast-bottom-left",       
        "timeOut": "3000",      
    }
}
onSaveButtonClick =(e)=>{ 
   let checkValidation =  validationEngine.ValidateForm();

   if(checkValidation){
        var currentPatientData = patientEditScreen.GetControlsData(patientID);
        if(formMode == "Edit"){
            DataService.edit(currentPatientData);
            toastr.success('Edit Data Successfuly');
        }     
        else{
            DataService.add(currentPatientData);
            toastr.success('Add Data Successfuly');     
        } 
        setTimeout(function(){
            routerEngine.onActionLinkClick(e); 
            toastr.success('Saved Data Successfuly');
        },1000)
    }
    else{
        toastr.error('failed saving');
        return;
    }
    renderTable(); 
}

onConfirmDeleteBtnClick = () =>{
    $(".modal").modal("hide");
    DataService.Delete(patientID);  
    patientEditScreen.resetControls();
    renderTable(); 
    toastr.success('Delete Data Successfuly');
}
$(document).ready(appInit);