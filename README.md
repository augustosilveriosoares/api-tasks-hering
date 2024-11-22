# Projeto Hering

Este repositório contém o **backend** e o **frontend** do projeto, ambos configurados para rodar em containers Docker.

## Estrutura de Pastas

- **back/**: Contém o código do **backend** (Spring Boot).
  - Para rodar o **backend**, navegue até a pasta `back` e execute o comando:
    ```bash
    docker-compose up --build
    ```

- **front/**: Contém o código do **frontend** (Angular).
  - Para rodar o **frontend**, navegue até a pasta `front` e execute o comando:
    ```bash
    docker-compose up --build
    ```

## Acessos

- **Backend (Spring Boot)**: A aplicação backend estará disponível em [http://localhost:8080](http://localhost:8080).
- **Frontend (Angular)**: A aplicação frontend estará disponível em [http://localhost](http://localhost).

## Usuários para Teste

- **Administrador**:  
  - **Login**: `admin`  
  - **Senha**: `herign`  

- **Usuário Comum**:  
  - **Login**: `user`  
  - **Senha**: `herign`  

> 🛠 **Dica**: Certifique-se de que o Docker está instalado e rodando corretamente antes de executar os comandos.

---
Feito com ❤️ por [Augusto Silverio Soares](https://github.com/augustosilveriosoares)
