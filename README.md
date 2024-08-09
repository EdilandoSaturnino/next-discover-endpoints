# next-discover-endpoints

Este projeto é uma aplicação Next.js que permite ao usuário inserir uma URL e descobrir possíveis endpoints acessíveis nessa URL. Ele utiliza um arquivo `endpoints.txt` que contém uma lista de endpoints comuns que são testados em relação à URL fornecida.

## Estrutura do Projeto

- **`app/page.tsx`**: Componente React que representa a página principal do projeto. Ele contém a interface do usuário para inserir a URL e exibir os endpoints descobertos.
- **`app/api/discover/route.ts`**: API route que processa a URL fornecida e tenta descobrir os endpoints acessíveis com base na lista de endpoints armazenada no arquivo `endpoints.txt`.
- **`endpoints.txt`**: Arquivo contendo uma lista de possíveis endpoints, um por linha, que serão verificados pela API.

## Pré-requisitos

- Node.js v14 ou superior
- bun

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/EdilandoSaturnino/next-discover-endpoints.git
   cd next-discover-endpoints
   ```

2. Instale as dependências:

   ```bash
   bun install
   ```

3. Crie o arquivo `endpoints.txt` na raiz do projeto e adicione os endpoints desejados, um por linha (não estou deixando por motivos óbvios).

## Uso

1. Inicie o servidor de desenvolvimento:

   ```bash
   bun dev
   ```

2. Acesse `http://localhost:3000` no navegador.

3. Insira uma URL no campo de entrada e clique em "Descobrir Endpoints". A aplicação fará requisições para cada endpoint listado no `endpoints.txt` e exibirá os que estiverem acessíveis.

## Configurações Adicionais

- **Limitar o número de requisições simultâneas**: O valor padrão é 50, definido pela constante `MAX_PARALLEL_REQUESTS` no arquivo `route.ts`. Você pode ajustar esse valor conforme necessário para balancear a performance e evitar sobrecarregar o servidor de destino.
- **User-Agent**: O código usa um User-Agent que simula um navegador comum. Isso pode ser alterado conforme necessário no arquivo `route.ts`.

## Estrutura do Projeto

```plaintext
discover-endpoints/
├── app/
│   ├── api/
│   │   └── discover/
│   │       └── route.ts
│   └── page.tsx
├── endpoints.txt
├── public/
│   └── ...
├── styles/
│   └── ...
├── node_modules/
│   └── ...
├── package.json
├── tsconfig.json
└── next.config.js
```

## Considerações

- **Detecção de Atividade Suspeita**: O servidor de destino pode detectar que múltiplas requisições estão sendo feitas em um curto período de tempo. É importante usar essa ferramenta de forma ética e respeitar as políticas de uso do servidor de destino.
- **Erros e Logs**: Se um endpoint não for acessível ou houver um erro na requisição, isso será registrado no console.

## Licença

Este projeto está licenciado sob a licença MIT.
