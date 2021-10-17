app_init = ()=>{
    $(".route").click(route);  
}
hidePages = () => {
    $(".screen").hide();
}
route = (e) => {
    var target = $(e.target).data("target");
    hidePages();
    $(target).show();
}
$(document).ready(app_init);