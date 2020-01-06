<h1 align="center">
  Gympoint
</h1>

<h3 align="center">
  Sistema de gestão de academias proposta para Desafio final do GoStack 09 do Rockeseat
</h3>

- Clonando respositório
```bash
git clone git@github.com:ericduarte/gympoint.git
cd gympoint
```

# Backend
O processo de instalação assume a premissa de que possui o Git, NodeJs, Yarn, PostgresSQL e Redis corretamente instalados e configurados no seu sistema operacional

Instalar dependências
```bash
cd backend
yarn install
```
- Crie uma base no Postgres
- Crie uma base no Redis
- Criar uma conta em um serviço de envio de email
- Configurar variáveis de ambiente.
 Crie um arquivo .env na raíz do projeto, tomando como base o arquivo .env.example como no exemplo abaixo e preencha com as configurações necessárias:
 ```env
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASS=<SUA SENHA>
DB_NAME=gympoint
APP_URL=localhost:3333
#Redis
REDIS_HOST=127.0.0.1
REDIS_POST=6379
# Mail
MAIL_HOST=<MAIL_HOST>
MAIL_PORT=2525
MAIL_USER=<MAIL_USER>
MAIL_PASS=<MAIL_PASS>
```


- Rode as migrations para atualizar a base de dados
```bash
yarn sequelize db:migrate
```

- Rode as seeds para inserir o usuário administrador
```bash
yarn sequelize db:seed:all
```

- Iniciar servidor
```bash
yarn dev
```

- Iniciar filas
```bash
yarn queue
```

# Frontend

- Instalar dependências
```bash
cd frontend
yarn install
```
- Iniciar projeto
```bash
yarn start
```
- Faça login com o usuário adicionado nos seeds anteriormente
```
   email: admin@gympoint.com
   password: 123456
```

# Mobile
- Instalar dependências
```bash
cd mobile
yarn install
```
-Altere a url base da api informando o IP do seu computador, caso esteja utilizando um dispositivo ligado a USB, ou informa o IP de acordo com os requisitos do seu emulador.

src/services/api.js 
```bash
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://<HOST>:3333',
});

export default api;
```

- Iniciar projeto
```bash
react-native run-android
```
Obs.: Essa aplicação foi testada apenas no ambiente Android
