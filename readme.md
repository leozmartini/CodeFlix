# CodeFlix

> Projeto com sistema de login com JWT e páginas exclusivas para cada tipo de usuário.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Ajustar front-end básico.
- [x] Implementar back-end.
- [x] Criar sistema de login seguro.
- [x] Sistema de usuários exclusivos.
- [x] Ajustar GitFlow.
- [ ] Front-end com framework moderno.

## 🚀 Instalando CodeFlix localmente.

Para instalar o CodeFlix, siga estas etapas:

1. Instale as dependencias. (Necessário Node.js)
```
npm ci
```

2. Crie um arquivo .env e preencha-o seguindo o exemplo: (Necessário [MongoDB](https://www.mongodb.com/pt-br))
```
MONGO_USER=usuário.do.database
MONGO_PASS=senha.do.database
MONGO_URI=inserir.link.de.conexão.MondoDB
PORT=7777
SERVER_URL=localhost
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


## 🛠️ Construído com

* [express](https://www.npmjs.com/package/express) - Gerenciar back-end.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Sistema de token de acesso.
* [mongoose](https://www.npmjs.com/package/mongoose) - Gerenciar banco de dados.
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de senhas no DataBase.
* [body-parser](https://www.npmjs.com/package/body-parser) - Processar body das requisições HTTP.
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Manipular cookies.
* [dotenv](https://www.npmjs.com/package/dotenv) - Esconder dados sensíveis do servidor.
* [ejs](https://www.npmjs.com/package/ejs) - Renderizar HTML.

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



### API
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
    "adminKey": "SENHA.MONGODB",
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
POST
/auth/register
Body JSON: {
    "adminKey": "SENHA.MONGODB",
    "username": "x",
    "password": "delete",
}

Saída:
Usuário será deletado do bando de dados. Essa ação acontece quando a senha do usuário foi "delete".

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


## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.