class routerEngineClass {
    constructor(){

    }
    init =() =>{
        $(".action-link").click(this.onActionLinkClick); 
    }
    
    hidePages = () => {
        $(".content-container").text("");
    }
    navigate = (target,screen) =>{
        $.get(target,function(data, status){
            if(status == "success"){
                $(".content-container").append(data);
            }
        });
        if(screen === "list"){
            patientList.renderTable();
        }
    }
    onActionLinkClick = (e) => {
        let target = $(e.target).data("target");
        let screen = $(e.target).data("screen");
        this.hidePages();
        this.navigate(target,screen);
    }
}
let routerEngine = new routerEngineClass();