# Onda Finance

Aplicação web simulando um app bancário simples, com foco em organização, UX e boas práticas.

## Stack Tecnológica

- React + TypeScript
- Vite
- Tailwind + CVA
- shadcn/ui + Radix
- React Router
- React Query
- Zustand
- React Hook Form + Zod
- Axios
- Vitest

## Funcionalidades

### Login (mock)
- Tela simples de login
- Persistência de sessão usando Zustand com middleware persist

### Dashboard
- Exibição do saldo atual
- Listagem das últimas transações (mock inicial)

### Transferência
- Formulário com validação usando React Hook Form e Zod
- Atualização do saldo em tempo real
- Adição de transação à lista

## Segurança

Como o aplicativo seria protegido contra engenharia reversa e vazamento de dados (não implementado):

### Engenharia Reversa
- **Ofuscação de Código**: Usar ferramentas como Terser ou Webpack plugins para ofuscar o código JavaScript/TypeScript, tornando difícil a leitura e compreensão do código fonte.
- **Minificação**: Minificar o código para reduzir o tamanho e remover comentários/whitespace.
- **Proteção contra Debugging**: Implementar detecção de ferramentas de desenvolvedor e desabilitar console logs em produção.
- **Code Splitting**: Dividir o código em chunks para evitar exposição de toda a lógica de uma vez.

### Vazamento de Dados
- **Criptografia**: Criptografar dados sensíveis no localStorage/sessionStorage usando bibliotecas como crypto-js.
- **HTTPS**: Garantir que toda comunicação seja via HTTPS para prevenir ataques man-in-the-middle.
- **Validação de Entrada**: Usar Zod para validar todas as entradas do usuário e prevenir injeções.
- **Sanitização**: Sanitizar dados antes de exibir ou armazenar.
- **Limpeza de Dados**: Não armazenar dados sensíveis desnecessariamente; limpar dados do estado quando não necessário.
- **Autenticação Segura**: Embora mock, em produção usar JWT com expiração curta, refresh tokens, etc.
- **CSP (Content Security Policy)**: Implementar headers CSP para prevenir XSS.
- **Rate Limiting**: Em APIs, implementar rate limiting para prevenir ataques de força bruta.

## Como Rodar

```bash
npm install
npm run dev
```

## Testes

```bash
npm run test
```

Um fluxo testado: Transferência de dinheiro com validação de formulário.
