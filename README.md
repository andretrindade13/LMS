# 📚 LMS pro
Plataforma educaciona/gestão desenvolvida com foco em desempenho, modularidade e escalabilidade.

>💡 MVP desenvolvido com NestJS no backend e Next.js no frontend, aplicando boas práticas de arquitetura limpa, SSR, tipagem com TypeScript e UI moderna com shadcn/ui.

## 🧩 Tecnologias Utilizadas
### 🔧 Backend
- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/docs/getting-started)
- Autenticação JWT
- [Swagger](https://swagger.io/docs/) para documentação da API
### 🖥️ Frontend
- [Next.js](https://nextjs.org/) (App Router / SSR)
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🧱 Estrutura do Projeto
> Monorepo com organização baseada em DDD, separando domínio da infraestrutura e interfaces.

## 🚀 Funcionalidades do MVP
## 📦 Como Rodar o Projeto Localmente
### Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Banco de dados (PostgreSQL)

### Passo a passo
```
# Clone o repositório
git clone <https://github.com/andretrindade13/LMS.git>
cd LMS

# Instale as dependências
npm install

# Rode o backend
cd apps/backend
cp .env.example .env
npm start:dev

# Em outra aba, rode o frontend
cd apps/frontend
cp .env.example .env
npm dev

# Rodar testes unitários no backend
cd apps/backend
npm test

```

## 👨‍💻 Autor

Desenvolvido por **André Trindade**

📫 contato: andreedutech@email.com

🐙 GitHub: [@andretrindade13](https://github.com/andretrindade13)