<h1 align="center">
  Gympoint
</h1>

<h3 align="center">
  Sistema de gestão de acadamia proposta para Desafio final do GoStack 09 do Rockeseat
</h3>

#Repositório

- Clonando respositório
```bash
git clone git@github.com:ericduarte/gympoint.git
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
- Configurar variáveis de ambiente.
 Crie um arquivo .env na raíz do projeto, tomando como base o arquivo .env.example como no exemplo abaixo e preencha com as configurações necessárias(
Nessa etapa é necessário ter um serviço de envio de emails para preencher as configurações necessárias para a funcionalidade de envio de email.
 ):
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

#Frontend

- Instalar dependências
```bash
cd frontend
yarn install
```
- Iniciar projeto
```bash
yarn start
```

#Mobile
- Instalar dependências
```bash
cd mobile
```
- Iniciar projeto
```bash
react-native run-android
```
Obs.: Essa aplicação foi testada apenas no ambiente Android