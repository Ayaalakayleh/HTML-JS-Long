class PatientList{
    constructor(){ }
        
    init=()=>{ 
        $(".add-btn").click(this.onAddButtonClick);
        this.open();
    }
        
    open=()=>{
        this.renderTable();
        // routerEngine.navigate('patient-list');
    }
    renderTable = ()=> {
        $(".content-container").load("app/Patient/patientListScreen.html",function(responseTxt, statusTxt,xhr){
            if(statusTxt == "success"){
                $(".patient-list-body").empty();
                var str = $(".template").html();  
                
                let data = DataService.getAll();
                for( let i=0; i<data.length; i++){
                    var templete = templateEngine.renderTemplete(str,data[i]);
                    $(".patient-list-body").append(templete);
                } 
            }
            // routerEngine.init();
        });
       
        this.EditClickEvent();
        this.DeleteClickEvent();
    }
    EditClickEvent=()=>{
        $(".edit").click(this.onEditButtonClick);
    }
    DeleteClickEvent=()=>{
        $(".del-btn").click(this.onDeleteButtonClick);
    }
    onEditButtonClick = (e)=>{
        let rowID = $(e.target).closest("tr")
        var IdRowTarget = rowID.data("id");
        $('.patient-id').html(IdRowTarget);
        patientEdit.open(IdRowTarget);
    }
    onAddButtonClick = ()=>{
        patientEdit.open();    
    } 
    onDeleteButtonClick=(e)=>{
       let rowID = $(e.target).parents("tr")
        var IdRowTarget = rowID.data("id");
        DataService.Delete(IdRowTarget);  
    } 
}
let patientList = new PatientList(); 