class PatientEdit{
    constructor(){
        this.patientID =null;
        this.formMode=null ;
    }
    init=()=>{
        this.ToastrAlert();
        $(".save-btn").click(this.onSaveButtonClick);
        $(".confirm-btn").click(this.onConfirmDeleteBtnClick);
    }
    open=(id)=>{
        this.patientID = id ;
        if(!id){
            this.formMode ="New";      
            this.resetControls();
            $(".delete-btn").hide();
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
    onSaveButtonClick =()=>{ 
        var currentPatientData = this.GetControlsData(this.patientID);
        
        //-------
        //** Validation
        if(!validationEngine.ValidateForm()){
            toastr.error('failed saving');
            return;
        }
        //-------

        if(this.formMode == "Edit"){
            DataService.edit(this.patientID,currentPatientData);
            toastr.success('Edit Data Successfuly');
        }     
        else{
            DataService.add(currentPatientData);
            toastr.success('Add Data Successfuly');     
        } 
        patientList.open();
    }
    LoadControlsData = (patientData) =>{
        $(".FirstNameInput").val(patientData.fname);
        $(".MiddleNameInput").val(patientData.mname);
        $(".LastNameInput").val(patientData.lname);
        $(".EmailInput").val(patientData.email);
        $(".StatusValue").append($('<option>').html(patientData.status));
        var birthDate = moment(patientData.DOB).format('yyyy-MM-DD');
        let age = moment(birthDate).fromNow(true);  
        $(".DateInput").val(birthDate);  
        $(".AgeInput").val(age);
    
        // Active
        $(".ActiveInput").attr('checked', patientData.Active);

        // Gender
        if(patientData.gender == 1){
            $(".maleRadio1").prop('checked', true)
        }
        else{
            $(".femaleRadio2").prop('checked', true)
        }
        // Last check
        var checkDate = moment(patientData.lastCheck).format('yyyy-MM-DD')
        $(".lastCheckInput").val(checkDate);
    }
    GetControlsData = () =>{   
        var fname   = $(".FirstNameInput").val();
        var mname   = $(".MiddleNameInput").val();
        var lname   = $(".LastNameInput").val();
        var email   = $(".EmailInput").val();
        var status  = $(".StatusValue").val();
        var DOB     = $(".DateInput").val();
        var lastCheck = $(".lastCheckInput").val();
        var Active;
        var gender;
        var active;
      
        Active = $("input[name=active]:checked").val();
        if (Active == "on") {
            active = "true";
        } else {
            active = "false";
        }

        if($(".maleRadio1").is(':checked')){
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
    onConfirmDeleteBtnClick = () =>{
        $(".modal").modal("hide");
        DataService.Delete(this.patientID);  
        this.resetControls();
        patientList.open();
        toastr.success('Delete Data Successfuly');
    }
}
let patientEdit = new PatientEdit();