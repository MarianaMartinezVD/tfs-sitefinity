$(document).ready(function(){
    let url = window.location.href.split('/');
    let action = url[url.length - 1];
    let query = action.split('?');
    url[url.length - 1] = query[0];

    window.history.pushState("","Mis Cotizaciones","/" + query[0]);


});

function getQueryParams(query, params){
    let res;
    if(typeof(params) === 'string'){
        let index = query.search(`(\\?|\\&)*${params}`);
        console.log('index: ' + index);
        if(index !== -1){
            res = query.substr(index, query.indexOf('&'));
            return res;
        }
        else{
            res = null;
            return res;
        }
    }
}