appInit = ()=>{
    renderTable();
    $(".action-link").click(onActionLinkClick); 
    $(".edit").click(onEditButtonClick);
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
onEditButtonClick = (e) =>{
    var rowTarget =  $(e.target).data("id");
    $('.patient-id').html(rowTarget);
}

$(document).ready(appInit);