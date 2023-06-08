# Documentação do Software SMOKE-BOT

## 1. INTRODUÇÃO

O Software SMOKE-BOT é uma aplicação de consulta a uma base de dados dentro do Whatsapp desenvolvida para facilitar o acesso de clientes e vendedores a informações que otimizam seu dia a dia.

## 2. INSTALAÇÃO

Para instalar o Software SMOKE-BOT, siga estas etapas:

1. Instale um editor de cógido (VS Code)
2. Instale uma versão estável do NodeJS
3. No terminal do seu editor de código, acesse o diretório do projeto
4. Execute o comando 'npm install'

## 3. GUIA DO USUÁRIO

O Software SMOKE-BOT oferece as seguintes funcionalidades principais:

- Consulta a taxa de câmbio do dia.
- Consulta ao saldo devedor atual.
- Consulta ao último pedido faturado em nome do respectivo cliente.
- Notificações automáticas de saldo presetes a vencer, vencendo ou vencidos.
- Para vendedores, consulta ao estoque de produtos.

Para começar a usar o software, siga estas etapas:

1. No seguinte caminho 'helpers\mysql.js', adicione suas credenciais de acesso ao Banco de Dados á constante 'createConnection'.
2. No seguinte caminho '\botSmokeConsulta.js', defina a porta em que o backend irá rodar. Em seguida defina o IdClient, que será seu usuário bot.
3. No terminal, execute 'node botSmokeConsulta.js' para iniciar o servidor.
4. Abra em seu navegador de preferência o caminho http://localhost:"SUBSTITUA_PELA_PORTA_DEFINIDA"/.
5. Escaneie o QR Code que será gerado com o celular que será o Bot da aplicação.
6. Agora você já pode testar nosso Robô!!

## 4. ARQUITETURA DO SOFTWARE

O Software SMOKE-BOT é baseado em uma arquitetura de três camadas, composta por:

- Interface do usuário: toda interação é realizada através do Whatsapp.
- Servidor de aplicativos: utiliza o NodeJS para gerenciar as requisições dos usuários.
- Banco de dados: o software apenas busca as informações em uma base de dados pré-existente construída em MySQL.

## 5. CONFIGURAÇÕES

O Software SMOKE-BOT possui algumas opções de configuraçã de permissões que incluem:

### CATEGORIAS

Dentro do arquivo 'data\categorias.js', adicione novas categorias seguindo a estrutura padrão. Onde a propriedade corresponde a descrição da categoria no Banco de Dados, enquanto seu valor refére-se ao código interno da categoria.

### CONTA

Dentro do arquivo 'data\conta.js', edite conforme dados de conta atualizados substituíndo os dados anteriores ou "###" (hashtags) por padrão.

### QUERYS

Dentro do arquivo 'data\querys.js', defina novos caminhos para novas consultas ou edite os caminhos padrões conforme necessidade.

### TIPOS DE GRUPOS

Dentro do arquivo 'data\tiposGrupos.js', existem duas possíveis alterações a serem realizadas, a primeira é a definição de quais depósitos cada estoque pode ter acesso. A segunda é onde cadastramos os grupos referentes a cada cliente.

#### 6. SOLUCAÇÃO DE PROBLEMAS

Quando ocorrer erros e problemas que necessitem de suporte técnico, entre em contato através do email patrickn.contact@gmail.com.
