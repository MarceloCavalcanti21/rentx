# Cadastro de carro

**Requisitos Funcionais** => (quais são as funcionalidades)
[] Deve ser possível cadastrar um novo carro

**Requisitos Não Funcionais** => (banco de dados, biblioteca etc)

**Regras de Negócio** =>
[] Não deve ser possível cadastrar um carro com uma placa já existente
[] Não deve ser possível alterar a placa de um carro já cadastrado
[] O carro deve ser cadastrado, por padrão, como disponível
[] O usuário responsável pelo cadastrado deve ter permissão de administrador


# Listagem de carro

**Requisitos Funcionais** => (quais são as funcionalidades)
[] Deve ser possível listar todos os carros disponíveis
[] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
[] Deve ser possível listar todos os carros disponíveis pelo nome da marca
[] Deve ser possível listar todos os carros disponíveis pelo nome do carro

**Requisitos Não Funcionais** => (banco de dados, biblioteca etc)

**Regras de Negócio** =>
[] O usuário não precisa estar logado no sistema 


# Cadastro de Especificação do Carro

**Requisitos Funcionais** => (quais são as funcionalidades)
[] Deve ser possível cadastrar uma especificação para um carro
[] Deve ser possível listar todas as Especificações
[] Deve ser possível listar todos os carros

**Requisitos Não Funcionais** => (banco de dados, biblioteca etc)

**Regras de Negócio** =>
[] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
[] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
[] O usuário responsável pelo cadastrado deve ter permissão de administrador


# Cadastro de Imagens do Carro

**Requisitos Funcionais** => (quais são as funcionalidades)
[] Deve ser possível cadastrar a imagem do carro
[] Deve ser possível listar todos os carros

**Requisitos Não Funcionais** => (banco de dados, biblioteca etc)
[] Utilizar o multer para upload dos arquivos

**Regras de Negócio** =>
[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
[] O usuário responsável pelo cadastrado deve ter permissão de administrador


# Aluguel de carro

**Requisitos Funcionais** => (quais são as funcionalidades)
[] Deve ser possível cadastrar um aluguel

**Requisitos Não Funcionais** => (banco de dados, biblioteca etc)
[] 

**Regras de Negócio** =>
[] O aluguel deve ter duração mínima de 24 horas
[] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário
[] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro
