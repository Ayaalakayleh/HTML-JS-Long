class PatientListScreen{
    constructor(){
        this.patientID;
        this.formMode ;
    }
    init=()=>{
        $(".add-btn").click(this.onAddButtonClick);
        $(".edit").click(this.onEditButtonClick);
    }
    onEditButtonClick = (e)=>{
        var IdRowTarget =  $(e.target).data("id");
        $('.patient-id').html(IdRowTarget);
        this.open(IdRowTarget);
    }
    onAddButtonClick = ()=>{
        this.open();    
    }
    open=(id)=>{
        this.patientID = id ;
        if(!id){
            this.formMode ="New";      
            patientEditScreen.resetControls();
        }
        else{
            this.formMode = "Edit";
            var patientData = DataService.getById(id);    
            patientEditScreen.LoadControlsData(patientData); 
        }
    }
}
let patientListScreen = new PatientListScreen();