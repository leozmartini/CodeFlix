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

        .then(async(res) => { 
            resText = await res.text()
            response.innerHTML = resText=='404'?'Usuário não encontrado' : resText=='401'?'Senha incorreta' : 'logado'
        })

}
