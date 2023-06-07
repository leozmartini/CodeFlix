function login(event) {
    event.preventDefault();
    
    const formElement = document.getElementById("form");
    const formData = new FormData(formElement);

    fetch("/auth/login", {
        method: 'POST',
        body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password")
        }),
        headers: { "Content-Type": "application/json" }

    })

        .then(async (res) => {
            const data = await res.json();

            if (data.statusLogin == '404') {responseFailed(); response.innerHTML = '<h3> Usuário não encontrado </h3>' }
            if (data.statusLogin == '401') { responseFailed(); response.innerHTML = '<h3> Senha incorreta </h3>' }

            if (data.statusLogin == '202') {
                responseDone(); 
                response.innerHTML = '<h3> Logado com sucesso.<br>Redirecionando... </h3>'

                setTimeout(() => {
                    window.location.href = data.redirect
                },1000) 
            }
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