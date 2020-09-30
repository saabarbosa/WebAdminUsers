var usuario = sessionStorage.getItem("Chave");
var objUser = JSON.parse(usuario);
if ((usuario == 'null') || (usuario === null) ){
    location.href = 'http://www.seguir.com.br/web/login.html';
}

