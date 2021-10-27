appInit = ()=>{
    $(".action-link").click(onActionLinkClick); 
    renderTable();
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
    var board = $(".patient-list-body"); 
    var str = '<tr>'+
    '<td>{{ID}}</td>'+
    '<td>{{fname}} {{mname}} {{lname}}</td>'+
    '<td>{{email}}</td>'+
    '<td>{{gender}}</td>'+
    '<td>{{DOB}}</td>'+
    '<td>{{Active}}</td>'+
    '<td>Created By: {{CreatedBy}} {{creationDate}}</td>'+
    '<td><button class="btn btn-info action-link" data-target="#user-edit">Edit</button></td></tr>';

    for( let i=0; i<patientsData.length; i++){
        var templete = renderTemplete(str,patientsData[i]);
        board.append(templete);
    }
}

renderTemplete = (templateText, data) =>{   
    var myString = templateText;
    var key;
    var indexOpen;
    var indexClose;

    for(let i=0; i<myString.length; i++){
        if(myString.includes("{{")){ 
            indexOpen = myString.indexOf("{")+2;
            indexClose =  myString.indexOf("}");
        
            key = myString.substring(indexOpen,indexClose);

            //=== replace
            myString = myString.replace("{{"+key+"}}", data[key]);
        } 
    }     
    return myString;
}

$(document).ready(appInit);