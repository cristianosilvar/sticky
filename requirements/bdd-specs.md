### Cenário: Realizar a compra de ingressos
- **Dado que** o usuário está na página de sessões  
- **E** há cadeiras disponíveis  
- **Quando** ele seleciona os ingressos desejados  
- **E** realiza o pagamento  
- **Então** a compra deve ser confirmada  
- **E** o ingresso deve ser disponibilizado  

---

### Cenário: Cancelar a compra antes de 24 horas
- **Dado que** o usuário possui uma compra realizada  
- **E** faltam mais de 24 horas para a sessão  
- **Quando** ele solicita o cancelamento da compra  
- **Então** o sistema deve cancelar a compra  
- **E** reembolsar o valor correspondente  

---

### Cenário: Reservar apenas cadeiras disponíveis
- **Dado que** uma cadeira já está reservada por outro cliente  
- **Quando** o usuário tenta selecioná-la  
- **Então** o sistema deve impedir a reserva  
- **E** exibir uma mensagem de erro  

---

### Cenário: Visualizar o comprovante de compra
- **Dado que** o usuário finalizou uma compra  
- **Quando** acessa sua área de compras  
- **Então** ele deve ver o comprovante com os detalhes da transação  

---

### Cenário: Utilizar o ingresso na entrada
- **Dado que** o usuário possui um ingresso válido  
- **Quando** ele chega à entrada da sessão  
- **Então** o ingresso deve ser validado pelo sistema  

---

### Cenário: Visualizar programação da próxima semana
- **Dado que** o usuário está na página de programação  
- **Quando** acessa a aba da próxima semana  
- **Então** ele deve ver as sessões futuras com suas informações  

---

### Cenário: Adicionar informações de sessões
- **Dado que** o administrador está autenticado  
- **Quando** ele preenche os dados de uma nova sessão  
- **E** confirma a criação  
- **Então** a sessão deve ser adicionada ao sistema  

---

### Cenário: Alterar informações de sessões existentes
- **Dado que** o administrador está autenticado  
- **E** uma sessão já está cadastrada  
- **Quando** ele edita os dados da sessão  
- **E** salva as alterações  
- **Então** as novas informações devem ser aplicadas  

---

### Cenário: Cancelar a compra de ingresso do usuário
- **Dado que** o administrador está autenticado  
- **E** um usuário possui uma compra confirmada  
- **Quando** o administrador solicita o cancelamento  
- **Então** o sistema deve cancelar a compra do usuário  
- **E** notificar o mesmo  

---

### Cenário: Ver informações dos clientes por sessão
- **Dado que** o administrador está autenticado  
- **Quando** acessa o painel de uma sessão específica  
- **Então** ele deve ver a lista de clientes e suas reservas  
