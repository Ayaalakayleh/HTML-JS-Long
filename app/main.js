appInit = ()=>{
    renderTable();
    $(".action-link").click(onActionLinkClick); 
    $(".edit").click(onEditButtonClick);
    $(".save-btn").click(onSaveButtonClick);
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
    var list = $(".patient-list-body"); 
    var str = $(".template").html(); 

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

onEditButtonClick = (e) =>{
    var IdRowTarget =  $(e.target).data("id");
    $('.patient-id').html(IdRowTarget);

    patientID = IdRowTarget;

    for(let i=0; i<patientsData.length; i++){
        if(IdRowTarget == patientsData[i].ID){
            
            $("#FirstNameInput").val(patientsData[i].fname);
            $("#MiddleNameInput").val(patientsData[i].mname);
            $("#LastNameInput").val(patientsData[i].lname);
            $("#EmailInput").val(patientsData[i].email);
            
            // Status
            $(".StatusValue").append($('<option>').html(patientsData[i].status))

            // Date of Birth
            var birthDate = moment(patientsData[i].DOB).format('yyyy-MM-DD')
            $("#DateInput").val(birthDate)
           
            // Active
            if(patientsData[i].Active){
                $('.ActiveInput').prop('checked', true);
            }
            // Gender
            if(patientsData[i].gender == 1){
                $("#maleRadio1").prop('checked', true)
            }else{
                $("#femaleRadio2").prop('checked', true)
            }

            // Last check
            // var checkDate = moment(patientsData[i].lastCheck).fromNow()
            var checkDate = moment(patientsData[i].lastCheck).format('yyyy-MM-DD')
            $(".lastCheckInput").append($('<option>').html(checkDate));
        
        }
   }
}
onSaveButtonClick =()=>{
    getData ();
    reset();
}
getData = () =>{
    let fname = $("#FirstNameInput").val();
    let mname = $("#MiddleNameInput").val();
    let lname = $("#LastNameInput").val();
    let email = $("#EmailInput").val();
    let status = $(".StatusValue").val();
    let DOB   = $("#DateInput").val();
    let lastCheck = $(".lastCheckInput").val();
    let active;
    let gender;

    if($('.ActiveInput').is(':checked') ){
        active = true;
    }else{
        active = false;
    }

    if($("#maleRadio1").is(':checked') ){
        gender = 1;
    }
    else{
        gender = 2;
    } 

    for(let i=0; i<patientsData.length; i++){
        if(patientsData[i].ID == patientID ){
            patientsData[i].fname  = fname;
            patientsData[i].mname  = mname;
            patientsData[i].lname  = lname;
            patientsData[i].email  = email;
            patientsData[i].status = status;
            patientsData[i].DOB    = DOB;
            patientsData[i].lastCheck =  lastCheck;    
            patientsData[i].Active = active;
            patientsData[i].gender = gender;  
        }
        return patientsData[i];  
    } 
}
reset = () =>{
    $(".patient-list-body").empty();
    renderTable();
}
$(document).ready(appInit);