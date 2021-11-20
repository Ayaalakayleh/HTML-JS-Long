appInit = ()=>{
    templateEngine.init();
    patientListScreen.init();
    patientEditScreen.init();
    routerEngine.init();
    DataService.init();
}
$(document).ready(appInit);