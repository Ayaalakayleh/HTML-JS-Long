class PatientListScreen{
    constructor(){ }
        
    init=()=>{
        this.renderTable();
        $(".add-btn").click(this.onAddButtonClick);
        $(".edit").click(this.onEditButtonClick);
        $(".confirm-btn").click(this.onConfirmDeleteBtnClick);

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
    onEditButtonClick = (e)=>{
        var IdRowTarget =  $(e.target).parents("tr").data("id");
        $('.patient-id').html(IdRowTarget);
        patientEditScreen.open(IdRowTarget);
    }
    onAddButtonClick = ()=>{
        patientEditScreen.open();    
    }
    onConfirmDeleteBtnClick = () =>{
        $(".modal").modal("hide");
        DataService.Delete(this.patientID);  
        patientEditScreen.resetControls();
        this.renderTable(); 
        toastr.success('Delete Data Successfuly');
    }
}
let patientListScreen = new PatientListScreen();
patientListScreen.init();