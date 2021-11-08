class templateEngineClass {
    constructor(){

    }
    init =() =>{
        
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
}
let templateEngine = new templateEngineClass();