class PatientListScreen{
    constructor(){ }
        
    init=()=>{ }
        
    open=()=>{
        this.renderTable();
        this.addEditClickEvent();
    }
    renderTable = ()=> {
        $(".patient-list-body").empty();
        var list = $(".patient-list-body"); 
        var str = $(".template").html();  
        for( let i=0; i<patientsData.length; i++){
            var templete = templateEngine.renderTemplete(str,patientsData[i]);
            list.append(templete);
        } 
        this.addEditClickEvent();
    }
    addEditClickEvent=()=>{
        $(".add-btn").click(this.onAddButtonClick);
        $(".edit").click(this.onEditButtonClick);
        $(".del-btn").click(this.onDeleteButtonClick)
    }
    onEditButtonClick = (e)=>{
        var IdRowTarget =  $(e.target).parents("tr").data("id");
        $('.patient-id').html(IdRowTarget);
        patientEditScreen.open(IdRowTarget);
    }
    onAddButtonClick = ()=>{
        patientEditScreen.open();    
    } 
    onDeleteButtonClick=(e)=>{
        var IdRowTarget =  $(e.target).parents("tr").data("id");
        DataService.Delete(IdRowTarget);  
    } 
}
let patientListScreen = new PatientListScreen();
patientListScreen.init();