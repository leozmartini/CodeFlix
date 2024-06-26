# CodeFlix

> Projeto com sistema de login com JWT e páginas exclusivas para cada tipo de usuário.

## 👾 Sumário
1. [Ajustes e melhorias](#-ajustes-e-melhorias)
2. [Funcionalidades](#-funcionalidades)
3. [Deploy](#-deploy)
4. [Construído com](#%EF%B8%8F-construído-com)
5. [API](#%EF%B8%8F-api)
6. [Instalação local](#-instalando-codeflix-localmente)
7. [Licença](#-licença)


## 📝 Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Ajustar front-end básico.
- [x] Implementar back-end.
- [x] Criar sistema de login seguro.
- [x] Sistema de usuários exclusivos.
- [x] Ajustar GitFlow.
- [x] Reconstruir estrutura do projeto.
- [ ] Front-end com framework moderno.

## ☕ Funcionalidades

### Login e Tokens
Ao realizar o login, é criada uma Token JWT com o tipo de usuário criptografado em base 64(esse dado não é sensível) armazenada num cookie e válida por 10 minutos. 
Inviolável, assinada digitalmente. Vídeo anexado demonstrando as tokens no tópico abaixo;


### Tipos de usuário 
Cada usuário fica registrado no banco de dados com um "UserType", isso define qual página ele irá ter acesso após realizar o login. Cada UserType tem uma pasta com imagens e HTML exclusivos. Só é possível registrar no banco de dados UserTypes com pastas exclusivas já existentes e com nome igual.

![user folder](https://github.com/leozmartini/CodeFlix/assets/82405111/88228e56-00fa-4dde-a0ac-55269e8a86b0)


Exemplo de login com usuário do tipo Default:

https://github.com/leozmartini/CodeFlix/assets/82405111/90e8e65f-68f2-4abc-94b8-96fae8a857c4




Exemplo de login com usuário do tipo Chess:

https://github.com/leozmartini/CodeFlix/assets/82405111/15d8e4ea-c36d-4d45-8494-280bd2ecadf8

## 🚀 Deploy

### O projeto está no ar no seguinte endereço: https://codeflix-2cnw.onrender.com

* A host deve demorar um pouco pra responder, principalmente no primeiro acesso à página inicial.

* Você pode seguir com esses dados de login:
```bash
    - UserType: default
    username: default
    password: admin

    - UserType: chess
    username: chess
    password: admin

```



## 🛠️ Construído com

* [express](https://www.npmjs.com/package/express) - Gerenciar back-end.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Sistema de token de acesso.
* [mongoose](https://www.npmjs.com/package/mongoose) - Gerenciar banco de dados.
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de senhas no DataBase.
* [body-parser](https://www.npmjs.com/package/body-parser) - Processar body das requisições HTTP.
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Manipular cookies.
* [dotenv](https://www.npmjs.com/package/dotenv) - Esconder dados sensíveis do servidor.
* [ejs](https://www.npmjs.com/package/ejs) - Renderizar HTML.





## ⚙️ API
Comandos da API para consultar e registrar dados.

* Listar usuários

```
Entrada:
GET
/auth/userlist

Saída:
JSON com todos usuários registrados e último login. Ação aberta e não requer senhas. É possível fazer pelo navegador.
```

* Registrar usuário

```
Entrada:
POST
/auth/register
Body JSON: {
    "adminKey": "SECRET",
    "username": "admin",
    "password": "admin",
    "userType": "default"
}

Saída:
Usuário será registrado. Requer senha do Mongo pois apenas administradores podem registrar. 

```

* Deletar usuário

```
Entrada:
DELETE
/auth/register
Body JSON: {
    "adminKey": "SECRET",
    "username": "x",
}

Saída:
Usuário será deletado do bando de dados.

```

* Logout

```
Entrada:
GET
/auth/logout

Saída:
Cookie com token de acesso é deletado e usuário deve realizar login novamente. 
Ação é feita quando se clica na foto do usuário no canto superior direito na página principal.

```

* Outros

Os demais recursos da api, como verificação de senhas e envio de arquivos protegidos e dados para usuários logados, são usados diretamente pelo Front-end durante o uso das páginas.

## 🔗 Instalando CodeFlix localmente.

Para instalar o CodeFlix, siga estas etapas:

1. Instale as dependencias. (Necessário Node.js)
```
npm ci
```

2. Crie um arquivo .env e preencha-o seguindo o exemplo: (Necessário [MongoDB](https://www.mongodb.com/pt-br))
```
MONGO_URI=mongodb://localhost:27017/codeflix
SECRET=1234
PORT=3000
```

3. Inicie o projeto (build).
```
npm run build

npm run start
```

3. Iniciar o projeto (dev). (Necessário devDependencies)
```
npm run dev
```



## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.