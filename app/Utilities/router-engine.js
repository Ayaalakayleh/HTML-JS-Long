class routerEngineClass {
    constructor(){

    }
    init =() =>{
        
    }
    hidePages = () => {
        $(".component").hide();
    }
    navigate = (targetScreen) =>{
        $(targetScreen).show();
    }
    onActionLinkClick = (e) => {
        let target = $(e.target).data("target");
        this.hidePages();
        this.navigate(target);
    }
}
let routerEngine = new routerEngineClass();