class PatientEditScreen{
    constructor(){
        this.patientID;
        this.formMode ;
    }
    init=()=>{
        this.ToastrAlert();
        $(".save-btn").click(this.onSaveButtonClick);
    }
    open=(id)=>{
        this.patientID = id ;
        if(!id){
            this.formMode ="New";      
            this.resetControls();
        }
        else{
            this.formMode = "Edit";
            var patientData = DataService.getById(id);    
            this.LoadControlsData(patientData); 
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
            var currentPatientData = this.GetControlsData(this.patientID);
            if(this.formMode == "Edit"){
                DataService.edit(currentPatientData,this.patientID);
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
        patientListScreen.renderTable(); 
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
        $(".action-alert").fadeOut();
    }
    
}
let patientEditScreen = new PatientEditScreen();
patientEditScreen.init();