class routerEngineClass {
    constructor(){

    }
    init =() =>{
        $(".action-link").click(this.onActionLinkClick); 
    }
    
    hidePages = () => {
        $(".component").hide();
    }
    navigate = (targetScreen) =>{
        $("."+targetScreen).show();
    }
    onActionLinkClick = (e) => {
        let target = $(e.target).data("target");
        this.hidePages();
        this.navigate(target);
    }
}
let routerEngine = new routerEngineClass();