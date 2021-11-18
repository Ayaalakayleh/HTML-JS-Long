class templateEngineClass {
    constructor(){}

    init =() =>{}
    
    renderTemplete = (templateText, data) =>{   
        var template = templateText; 
        for(let i=0; i<template.length; i++){
            if(template.includes("{{")){     
                var indexOpen = template.indexOf("{")+2;
                var indexClose =  template.indexOf("}");
                var key = template.substring(indexOpen,indexClose);
                let splitting = key.split("|");

                //=== replace property which need format
                if(splitting.length >1){
                    let format = this.fromatFunction(splitting,data) ;
                    template = template.replace("{{"+key+"}}", format );  
                }
                
                //=== replace normal property
                template = template.replace("{{"+key+"}}", data[key]);
            }       
        }    
        return template;
    }
    fromatFunction = (array, data)=>{  // [propertyName, formatter, formateName]
        if(array.length == 1){
            return;
        }
        else{
            let propertyName = array[0];
            let formatter = array[1];
            let formatParameter = array[2];
            let result;
            
            switch(formatter){
                case "date":
                    result = this.datePipe(data[propertyName],formatParameter);
                    break;
                case "status":
                    result = this.statusPipe(data[formatter]);
                    break;
                case "gender":
                    result = this.genderPipe(data[propertyName]);
                break;        
            } 
            return result;
        }
    }
    datePipe=(date,formatParameter)=>{
        let x =  moment(date).format(formatParameter);
        return x;
    }
    statusPipe=(status)=>{
        if(status === 1){
            return "active";
        }
        else if(status === 0){
            return "not active";
        }
    }
    genderPipe=(gender)=>{
        if(gender === 1){
            return "male";
        }
        else if(gender === 2){
            return "female";
        }
    }
}
let templateEngine = new templateEngineClass();