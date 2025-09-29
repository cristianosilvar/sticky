# Exemplos de Uso da API

## 1. Criar um Usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
  }'
```

**Resposta:**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

## 2. Fazer Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "123456"
  }'
```

**Resposta:**
```json
{
  "token": "jwt-token-aqui",
  "user": {
    "id": "uuid-do-usuario",
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

## 3. Criar um Filme

```bash
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Poderoso Chefão",
    "synopsis": "Uma história sobre a família Corleone",
    "rating": 9.5,
    "durationMinutes": 175
  }'
```

**Resposta:**
```json
{
  "id": "uuid-do-filme",
  "title": "O Poderoso Chefão",
  "synopsis": "Uma história sobre a família Corleone",
  "rating": 9.5,
  "durationMinutes": 175,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 4. Listar Filmes

```bash
curl -X GET http://localhost:3000/movies
```

**Resposta:**
```json
[
  {
    "id": "uuid-do-filme",
    "title": "O Poderoso Chefão",
    "synopsis": "Uma história sobre a família Corleone",
    "rating": 9.5,
    "durationMinutes": 175,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 5. Criar uma Sessão

```bash
curl -X POST http://localhost:3000/showtimes \
  -H "Content-Type: application/json" \
  -d '{
    "movieId": "uuid-do-filme",
    "date": "2024-01-15T20:00:00.000Z",
    "startAt": "2024-01-15T20:00:00.000Z",
    "status": "SCHEDULED",
    "basePrice": 25.50
  }'
```

**Resposta:**
```json
{
  "id": "uuid-da-sessao",
  "date": "2024-01-15T20:00:00.000Z",
  "movieId": "uuid-do-filme",
  "startAt": "2024-01-15T20:00:00.000Z",
  "status": "SCHEDULED",
  "basePrice": 25.50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 6. Listar Sessões Disponíveis

```bash
curl -X GET http://localhost:3000/showtimes/available
```

**Resposta:**
```json
[
  {
    "id": "uuid-da-sessao",
    "date": "2024-01-15T20:00:00.000Z",
    "movieId": "uuid-do-filme",
    "startAt": "2024-01-15T20:00:00.000Z",
    "status": "SCHEDULED",
    "basePrice": 25.50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 7. Criar um Pedido

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "uuid-do-usuario",
    "totalPrice": 51.00
  }'
```

**Resposta:**
```json
{
  "id": "uuid-do-pedido",
  "userId": "uuid-do-usuario",
  "orderStatus": "PENDING",
  "totalPrice": 51.00,
  "expiredAt": "2024-01-01T00:30:00.000Z",
  "paidAt": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 8. Processar Pagamento

```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "uuid-do-pedido",
    "price": 51.00
  }'
```

**Resposta:**
```json
{
  "id": "uuid-do-pagamento",
  "orderId": "uuid-do-pedido",
  "price": 51.00,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 9. Criar Ingresso

```bash
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "uuid-do-pedido",
    "showtimeId": "uuid-da-sessao",
    "price": 25.50
  }'
```

**Resposta:**
```json
{
  "id": "uuid-do-ingresso",
  "orderId": "uuid-do-pedido",
  "showtimeId": "uuid-da-sessao",
  "price": 25.50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 10. Buscar Pedidos por Usuário

```bash
curl -X GET http://localhost:3000/orders/user/uuid-do-usuario
```

**Resposta:**
```json
[
  {
    "id": "uuid-do-pedido",
    "userId": "uuid-do-usuario",
    "orderStatus": "PAID",
    "totalPrice": 51.00,
    "expiredAt": "2024-01-01T00:30:00.000Z",
    "paidAt": "2024-01-01T00:05:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:05:00.000Z"
  }
]
```

## Fluxo Completo de Compra

1. **Criar usuário** (se não existir)
2. **Fazer login** para obter token
3. **Listar filmes** disponíveis
4. **Listar sessões** disponíveis
5. **Criar pedido** com o valor total
6. **Processar pagamento** para o pedido
7. **Criar ingressos** para cada sessão desejada

## Status dos Pedidos

- `PENDING` - Pedido criado, aguardando pagamento
- `PAID` - Pedido pago
- `CANCELLED` - Pedido cancelado
- `EXPIRED` - Pedido expirado

## Status das Sessões

- `SCHEDULED` - Sessão agendada
- `ONGOING` - Sessão em andamento
- `COMPLETED` - Sessão finalizada
- `CANCELLED` - Sessão cancelada
