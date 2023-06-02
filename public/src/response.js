function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const response = document.getElementById('response')
    let resText

    fetch("/auth/login", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: { "Content-Type": "application/json" }

    })

        .then(async (res) => {
            resText = await res.text()
            // response.innerHTML = resText == '404' ? '<h3> Usuário não encontrado </h3>' : resText == '401' ? '<h3> Senha incorreta </h3>' : '<h3>logado</h3>'
            if (resText == '404') {responseFailed(); response.innerHTML = '<h3> Usuário não encontrado </h3>' }
            if (resText == '401') { responseFailed(); response.innerHTML = '<h3> Senha incorreta </h3>' }

            if (resText == '202') {responseDone(); response.innerHTML = '<h3> Logado com sucesso.<br>Redirecionando... </h3>'}
        })

}


function responseDone() {
    let addCSS = document.getElementById('response');
    addCSS.classList.remove('responseFailed')
    addCSS.classList.add('responseDone')
}

function responseFailed() {
    let addCSS = document.getElementById('response');
    addCSS.classList.remove('responseDone')
    addCSS.classList.add('responseFailed')
}