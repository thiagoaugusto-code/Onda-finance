# Onda Finance

Aplicação web simulando um app bancário simples, com foco em organização, experiência do usuário (UX) e boas práticas de desenvolvimento.

A ideia é permitir que o usuário faça login, visualize seus saldos e transações, e transfira valores entre contas, tudo de forma responsiva e moderna.




## 🌐 Acesso Online

Você pode experimentar a aplicação publicada no link abaixo:

👉 https://onda-finance-web-nine.vercel.app/



## Stack Tecnológica

-React + TypeScript – base do projeto
- Vite – bundler e dev server
- Tailwind + CVA (Component Variant API) – estilização rápida e consistente
- shadcn/ui + Radix – componentes UI prontos e acessíveis
- React Router – navegação entre páginas
- React Query – gerenciamento de dados assíncronos
- Zustand – gerenciamento de estado global
- React Hook Form + Zod – formulários e validação
- Axios – integração futura com APIs
- Vitest + React Testing Library – testes unitários e de fluxo

## Funcionalidades

### Login (mock)
- Tela simples de login com input de nome
- Persistência de sessão usando Zustand + middleware persist
- Redireciona para o Dashboard após login

### Dashboard
- Exibição do saldo atual das contas
- Listagem das últimas transações (mock inicial)
- Botão de logout e navegação para Transferência
- Layout responsivo e moderno, utilizando Tailwind + shadcn/ui

### Transferência
- Formulário com campos: valor, descrição e conta de destino
- Validação de formulário com Zod (valor mínimo, campos obrigatórios)
- Atualização do saldo em tempo real
- Registro de transação em ambas as contas (origem e destino)
- Botão para voltar ao Dashboard

## Segurança

Como o aplicativo seria protegido contra engenharia reversa e vazamento de dados (não implementado):

### Engenharia Reversa
- **Ofuscação de código** (Terser ou plugins de build)
- **Minificação** do bundle
- **Proteção contra debugging** em produção
- **Code splitting** para reduzir exposição da lógica

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


## Desenvolvimento
```bash
npm install
npm run dev
```
## Build para produção

```bash
npm run build
npm run preview
```

## Testes
- ### Testes realizados usando Vitest + React Testing Library:

- **TransferPage**: validação de formulário e atualização de saldo
- Cobrem casos de:
  - valor inválido
  - campos obrigatórios
  - atualização correta dos saldos

Executar testes:

```bash
npm run test
```

## Melhorias Futuras
- Integração com API real usando Axios + React Query
- Autenticação completa com JWT e refresh tokens
- Dashboard com gráficos de transações
- Mais testes unitários e de integração
- Acessibilidade completa (teclado, leitores de tela)

Um fluxo testado: Transferência de dinheiro com validação de formulário.
