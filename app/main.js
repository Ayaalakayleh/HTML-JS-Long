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
    var x = $(".patient-list-body"); 
   
    for( let i=0; i<patientsData.length; i++){
        x.append('<tr>'+
        '<td>'+patientsData[i].ID+'</td>'+
        '<td>'+patientsData[i].fname+' '+patientsData[i].mname+' '+patientsData[i].lname+'</td>'+
        '<td>'+patientsData[i].email+'</td>'+
        '<td>'+patientsData[i].gender+'</td>'+
        '<td>'+patientsData[i].DOB+'</td>'+
        '<td>'+patientsData[i].Active+'</td>'+
        '<td>'+'Created By:'+patientsData[i].CreatedBy+', '+patientsData[i].creationDate+'</td>'+
        '<td><button class="btn btn-info action-link" data-target="#user-edit">Edit</button></td>'+
        +'</tr>');
    }
}
$(document).ready(appInit);