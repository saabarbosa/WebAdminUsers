$("#btn_login").click(function () {

    var settings = {
        "url": "http://www.seguir.com.br/seguir/portal/portalservice/authenticateCooperativa",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "value": { "usu_tx_login": $("#user").val(), "usu_tx_senha": $("#password").val() } }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var mensagem = response.message;
        if ((mensagem == "undefined") || (mensagem == null)) {
            sessionStorage.setItem("Chave", JSON.stringify(response.value));
            location.href = 'index.html';
        } else {
            $("#alerta").show();
            $("#alertMessage").text(mensagem);
            sessionStorage.setItem("Chave", null);
        }

    });



});

