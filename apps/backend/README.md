# Sistema de Cinema - Backend

Sistema de gerenciamento de cinema desenvolvido seguindo os princípios de Domain-Driven Design (DDD) e Clean Architecture.

## 🎯 Funcionalidades

- **Gestão de Filmes**: Criar, listar e buscar filmes
- **Gestão de Sessões**: Criar e listar sessões disponíveis
- **Gestão de Pedidos**: Criar pedidos e buscar por usuário
- **Gestão de Pagamentos**: Processar pagamentos
- **Gestão de Ingressos**: Criar ingressos para sessões
- **Autenticação**: Sistema de login e registro de usuários

## 🏗️ Arquitetura

O projeto segue a arquitetura DDD (Domain-Driven Design) com as seguintes camadas:

```
src/
├── core/                    # Camada de Domínio
│   ├── domain/             # Entidades e Regras de Negócio
│   │   ├── entities/       # Entidades do domínio
│   │   └── repositories/   # Interfaces dos repositórios
│   └── application/        # Casos de Uso
│       ├── dto/           # Data Transfer Objects
│       └── use-cases/     # Casos de uso da aplicação
├── infra/                  # Camada de Infraestrutura
│   ├── http/              # Controllers e Rotas
│   ├── repositories/      # Implementações dos repositórios
│   └── config/            # Configurações
└── shared/                # Utilitários compartilhados
```

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_jwt"
PORT=3000
```

4. **Execute as migrations**
```bash
npx prisma migrate dev
```

5. **Inicie o servidor**
```bash
npm run dev
```

## 📚 Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /users` - Criar novo usuário

### Filmes
- `POST /movies` - Criar novo filme
- `GET /movies` - Listar todos os filmes
- `GET /movies/:id` - Buscar filme por ID

### Sessões
- `POST /showtimes` - Criar nova sessão
- `GET /showtimes/available` - Listar sessões disponíveis

### Pedidos
- `POST /orders` - Criar novo pedido
- `GET /orders/user/:userId` - Buscar pedidos por usuário

### Pagamentos
- `POST /payments` - Criar novo pagamento

### Ingressos
- `POST /tickets` - Criar novo ingresso

## 🗄️ Modelo de Dados

### Entidades Principais

#### User
- `id` (UUID) - Identificador único
- `name` (String) - Nome do usuário
- `email` (String) - Email único
- `password` (String) - Senha criptografada

#### Movie
- `id` (UUID) - Identificador único
- `title` (String) - Título do filme
- `synopsis` (String) - Sinopse
- `rating` (Number) - Avaliação (0-10)
- `durationMinutes` (Number) - Duração em minutos

#### Showtime
- `id` (UUID) - Identificador único
- `date` (DateTime) - Data da sessão
- `movieId` (UUID) - Referência ao filme
- `startAt` (DateTime) - Horário de início
- `status` (Enum) - Status da sessão
- `basePrice` (Decimal) - Preço base

#### Order
- `id` (UUID) - Identificador único
- `userId` (UUID) - Referência ao usuário
- `orderStatus` (Enum) - Status do pedido
- `totalPrice` (Decimal) - Preço total
- `expiredAt` (DateTime) - Data de expiração
- `paidAt` (DateTime) - Data do pagamento

#### Payment
- `id` (UUID) - Identificador único
- `orderId` (UUID) - Referência ao pedido
- `price` (Decimal) - Valor do pagamento

#### Ticket
- `id` (UUID) - Identificador único
- `orderId` (UUID) - Referência ao pedido
- `showtimeId` (UUID) - Referência à sessão
- `price` (Decimal) - Preço do ingresso

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## 📖 Documentação da API

A documentação completa da API está disponível através do Swagger UI quando o servidor estiver rodando:

```
http://localhost:3000/api-docs
```

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm start` - Inicia o servidor em produção
- `npm run test` - Executa os testes
- `npx prisma studio` - Abre o Prisma Studio para visualizar o banco

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - Desenvolvimento inicial

## 🙏 Agradecimentos

- Comunidade Node.js
- Prisma Team
- Express.js Team
