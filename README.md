<a id="header"></a>
<!-- 
    Logo image generated by Bing IA: https://www.bing.com/images/create/
-->
<img src="./docs/assets/images/layout/header_title_challenge.png" alt="Med Planner Challenge">


<!-- 
    icons by:
    https://devicon.dev/
    https://simpleicons.org/
-->
[<img src="./docs/assets/images/icons/nodedotjs.svg" width="25px" height="25px" title="Node.js" alt="Node.js">](https://nodejs.org/en) [<img src="./docs/assets/images/icons/npm.svg" width="25px" height="25px" alt="npm" title="npm">](https://www.npmjs.com/) [<img src="./docs/assets/images/icons/eslint.svg" width="25px" height="25px" alt="Eslint" title="Eslint">](https://eslint.org/) [<img src="./docs/assets/images/icons/express.svg" width="25px" height="25px" title="Express" alt="Express">](https://expressjs.com/) [<img src="./docs/assets/images/icons/sequelize.svg" width="25px" height="25px" title="Sequelize" alt="Sequelize">](https://sequelize.com/) [<img src="./docs/assets/images/icons/jest.svg" width="25px" height="25px" alt="Jest" title="Jest">](https://jestjs.io/) [<img src="./docs/assets/images/icons/jsonwebtoken.svg" width="25px" height="25px" alt="JsonWebToken" title="JsonWebToken">](https://jwt.io/) [<img src="./docs/assets/images/icons/docker.svg" width="25px" height="25px" alt="Docker" title="Docker">](https://www.docker.com/) [<img src="./docs/assets/images/icons/github.svg" width="25px" height="25px" alt="GitHub" title="GitHub">](https://github.com/jtonynet) [<img src="./docs/assets/images/icons/visualstudiocode.svg" width="25px" height="25px" alt="vscode" title="vscode">](https://code.visualstudio.com/) [<img src="./docs/assets/images/icons/postman.svg" width="25px" height="25px" alt="Postman Logo" title="Postman">](https://www.postman.com/) [<img src="./docs/assets/images/icons/postgresql.svg" width="25px" height="25px" alt="PostgreSQL Logo" title="PostgreSQL">](https://www.postgresql.org/) [<img src="./docs/assets/images/icons/swagger.svg" width="25px" height="25px" alt="Swagger Logo" title="Swagger">](https://swagger.io/) [<img src="./docs/assets/images/icons/githubactions.svg" width="25px" height="25px" alt="GithubActions Logo" title="GithubActions">](https://docs.github.com/en/actions) [<img src="./docs/assets/images/icons/mermaidjs.svg" width="25px" height="25px" alt="MermaidJS Logo" title="MermaidJS">](https://mermaid.js.org/)

<!-- 
[<img src="./docs/assets/images/icons/dotenv.svg" width="25px" height="25px" alt="DotEnv Logo" title="DotEnv">](https://www.npmjs.com/package/dotenv)
[<img src="./docs/assets/images/icons/amazonaws.svg" width="25px" height="25px" alt="Amazon AWS Logo" title="Amazon AWS">](https://aws.amazon.com/pt/) [<img src="./docs/assets/images/icons/passport.svg" width="25px" height="25px" alt="Passport Logo" title="Passport">](https://www.passportjs.org/) [<img src="./docs/assets/images/icons/prometheus.svg" width="25px" height="25px" alt="Prometheus Logo" title="Prometheus">](https://prometheus.io/) [<img src="./docs/assets/images/icons/grafana.svg" width="25px" height="25px" alt="Grafana Logo" title="Grafana">](https://grafana.com/)
-->

[![Badge Status](https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-green)](#header) [![Github Project](https://img.shields.io/badge/PROJECT%20VIEW%20KANBAM-GITHUB-green?logo=github&logoColor=white)](https://github.com/users/jtonynet/projects/6) <!-- ![Badge GitHubActions](https://github.com/jtonynet/go-products-api/actions/workflows/main.yml/badge.svg?branch=main) -->

---

## 🕸️ Redes

[![linkedin](https://img.shields.io/badge/Linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jos%C3%A9-r-99896a39/) [![dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/learningenuity) [![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:learningenuity@gmail.com)

---

## 📁 O Projeto

<a id="index"></a>
### ⤴️ Índice

__[Med Planner Challenge](#header)__<br/>
  1.  ⤴️ [Índice](#index)
  2.  📖 [Sobre](#about)
  3.  💻 [Rodando o Projeto](#run)
  4.  📰 [Documentação da API](#api-docs)
  5.  📊 [Diagramas](#diagrams)
  6.  ✅ [Testes](#tests)
  7.  👏 [Boas Práticas](#best-practices)
  8.  🧠 [ADR - Architecture Decision Records](#adr)
  9.  🔢 [Versões](#versions)
  10. 🧰 [Ferramentas](#tools)
  11. 🤖 [Uso de AI](#ia)
  12. 🏁 [Conclusão](#conclusion)

---

<a id="about"></a>
### 📖 Sobre

Acompanhe as tarefas pelo [__Kanban__](https://github.com/users/jtonynet/projects/6)

Este repositório foi criado com a intenção de propor uma possível solução para o seguinte desafio:

> 👨‍💻 __Case Dev Backend:__
> 
> Construir o backend para um sistema de prontuário eletrônico onde o médico pode
cadastrar as informações do paciente como nome, telefone, data de nascimento, sexo,
altura e peso e fazer os registros das consultas realizadas por paciente.

> __1. Requisitos funcionais:__
> 
> - __Requisitos obrigatórios:__
>   - Eu, como médico, quero poder cadastrar um paciente com os seguintes
dados: nome, telefone, email, data de nascimento, sexo, altura e peso.
>   - Eu, como médico, quero poder listar e editar o perfil dos pacientes cadastrados.
>   - Eu, como médico, quero poder cadastrar um agendamento de consulta para
um paciente.
>   - Eu, como médico, quero poder listar, alterar e excluir os agendamentos de consulta.
>   - Eu, como médico, quero poder anotar uma observação durante a consulta.
>   - Eu, como médico, quero poder visualizar as anotações das consultas dos pacientes.
> 
> - __Requisitos desejáveis:__
>   - Eu como médico, quero que o sistema valide a minha agenda, não deixando
eu cadastrar mais de um paciente na mesma hora.
>   - Eu, como médico, quero poder excluir os dados pessoais do paciente por causa
das novas regras do LGPD, mas mantendo o histórico de consulta por questões de contabilidade
>
>
>
>  __2. Requisitos não funcionais:__
> - __Requisitos obrigatórios__
>   - Deve usar o padrão de API REST (HTTP/JSON);
>   - Pode ser feito em __node.js__ (javascript ou typescript) ou PHP (laravel);
>   - Documentação da interface da API gerada (swagger, open-api, RAML ou postman);
>   - Os dados devem ser validados (existência e formatos) na inserção/atualização
para garantir consistência da base;
>   - Implementar testes unitários e/ou de integração e/ou documentação de testes
(casos de teste / script de teste).
>
> - __Requisitos desejáveis__
>   - Documentação da modelagem do banco de dados (diagrama ER ou de classe);
>   - Para o banco de dados pode usar MySQL ou PostgreSQL, podendo optar ou
não pelo uso de ORM;
>   - Setup de ambiente de desenvolvimento usando docker / docker-compose;
>   - Hospedar em um ambiente cloud a sua escolha (Heroku, AWS EBS, IBM Cloud, etc);
>   - Garantir autenticação e/ou autorização (login/logout, token JWT, roles);
>   - Implementar alguma ferramenta de lint ou qualidade (sonar, code-quality, eslint, etc);
>   - Deploy automatizado via pipeline (gitlab-ci, bitbucket pipeline, github actions, etc).


_*A documentação original do desafio é mais abrangente, com sugestões de tela para o front e mais dados._

Faz sentido utilizar __Arquitetura de Duas Camadas__. Caso a complexidade aumente, podemos extender para o uso de uma terceira camada (`services`).

Foco em garantir estabilidade com __TDD__ e uma implementação de __CI__ no GitHub Actions


Sobre:
>   - Eu como médico, quero que o sistema valide a minha agenda, não deixando
eu cadastrar mais de um paciente na mesma hora.

Deve existir ao menos 1 minuto de diferença entre o cadastro de um paciente e outro.

[⤴️ de volta ao índice](#index)

---

<a id="run"></a>
### 💻 Rodando o Projeto

<a id="run-containerized"></a>
#### 🐋 Conteinerizado

Rode os comandos `docker compose` (de acordo com sua versão do docker compose) no diretório raiz do projeto:
```bash
/js-med-planner$ docker compose build
/js-med-planner$ docker compose up postgres-med-planner backend-rest
```

<!-- Acesse a rota: `http://localhost:8080/patients` -->

<br/>

<a id="run-locally"></a>
#### 🏠 Local

API:
Com o node 20.17.0 instalado, suba apenas a base de dados com o comando:

```
/js-med-planner$ docker compose up postgres-med-planner
```
ou se conecte a uma database válida, então vá para o diretório `backend-rest` e execute os comandos:

```bash
/js-med-planner/backend-rest$ npm install
/js-med-planner/backend-rest$ npm run dev
```
<br/>

#### ⏳ TODO: migrations e seeds

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="api-docs"></a>
### 📰  Documentação da API

####  <img src="./docs/assets/images/icons/swagger.svg" width="20px" height="20px" alt="Swagger" title="Swagger">  Swagger

Com a aplicação em execução, a rota de documentação Swagger fica disponível em http://localhost:3000/docs/

O endpoint `auth/login` provê um token `Bearer` que deve ser obtido e utilizado no `Authorize` do swagger para que as requisições possam ser procedidas adequadamente.

O cliente deve informar o UUID do recurso para criação. Para validações, você pode utilizar um [site gerador de UUIDs](https://www.uuidgenerator.net/).

<img src="./docs/assets/images/screen_captures/swagger_medplanner_rest_api.png">

<br/>

####  <img src="./docs/assets/images/icons/postman.svg" width="20px" height="20px" alt="Swagger" title="Swagger">  Postman

Dentro da pasta [./scripts/postman](./scripts/postman/rjs-med-planner.postman_collection.json) encontra-se o arquivo JSON básico que pode ser importado no seu `Postman` para auxiliar em testes manuais e desenvolvimento.</summary>

<img src="./docs/assets/images/screen_captures/postman_medplanner_rest_api.png">

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="diagrams"></a>
### 📊 Diagramas do Sistema
_Diagramas Mermaid podem apresentar problemas de visualização em aplicativos mobile_

<!-- 
    diagrams by:
    https://mermaid.js.org/
-->

**ER:**

```mermaid
erDiagram 
    patient {
        int id
        UUID uuid
        string name
        string phone
        string email
        date birth_date
        enum gender
        decimal height
        decimal weight
    }
    appointment {
        int id
        UUID uuid
        int patient_id
        int doctor_id
        string description
        datetime start_time
        datetime end_time
    }
    doctor {
        int id
        UUID uuid
        string name
        string email
        string password
    }
    observation{
        int id
        UUID uuid
        int appointment_id
        string message
    }

    patient ||--o{ appointment : has
    doctor ||--o{ appointment : has
    appointment ||--o{ observation : has
```

   1. A abordagem da tabela `doctor` com o campo `password` foi aplicada apenas para ter uma autenticação minima nos endpoints dos recursos desde o inicio. Caso alcance todos os requisitos obrigatórios do desafio e tenha tempo disponível, pretendo implementar `user` com `roles` adequadas
<br/>

**Diagrama de Sistema:**

```mermaid
graph LR
    subgraph Doctor Flow
      DOCTOR(["👩‍⚕️ Authorized Doctor"])

      DOCTOR --> CREATE_PATIENT("🌐 Create Patient")
      DOCTOR --> RETRIEVE_PATIENT_LIST("🌐 Retrieve Patient List")
      DOCTOR --> RETRIEVE_PATIENT("🌐 Retrieve Patient")
      DOCTOR --> UPDATE_PATIENT("🌐 Update Patient")
      DOCTOR --> DELETE_PATIENT("🌐 Delete Patient")
    end

    subgraph Two Tier Architecture
      subgraph Controllers
        API_CREATE_PATIENT("🖥️ Create Patient")
        API_GET_PATIENTS("🖥️ Retrieve Patient")
        API_GET_PATIENT("🖥️ Get Patient by UUID")
        API_UPDATE_PATIENT("🖥️ Update Patient by UUID")
        API_DELETE_PATIENT("🖥️ Delete Patient by UUID")
      end

      subgraph Models
        ENTITY_PATIENT("📄 Patient")
      end

      subgraph DATABASE
        MED_PLANNER_DB[("🗄️ PostgreSQL <br/> med-planner-db")]
      end 
    end
  
  CREATE_PATIENT -->|http POST| API_CREATE_PATIENT
  RETRIEVE_PATIENT_LIST -->|http GET| API_GET_PATIENTS
  RETRIEVE_PATIENT -->|http GET| API_GET_PATIENT
  UPDATE_PATIENT -->|http PATCH| API_UPDATE_PATIENT
  DELETE_PATIENT -->|http DELETE| API_DELETE_PATIENT

  API_CREATE_PATIENT-->ENTITY_PATIENT
  API_GET_PATIENTS-->ENTITY_PATIENT
  API_GET_PATIENT-->ENTITY_PATIENT
  API_UPDATE_PATIENT-->ENTITY_PATIENT 
  API_DELETE_PATIENT-->ENTITY_PATIENT


  ENTITY_PATIENT-->MED_PLANNER_DB
```
_*Diagrama INICIAL geral com baixo nível de fidelidade_


<br/>

<!-- 
    diagrams by:
    https://mermaid.js.org/
-->

[⤴️ de volta ao índice](#index)

---

<a id="tests"></a>
### ✅ Testes
_*TDD inicialmente com teste de integração pois trata-se de um CRUD. Verificado sucesso do fluxo no "caminho feliz", implementarei os corner cases (validações) com seus respectivos testes_

Com o projeto da backend-rest [adequadamente instalado](#run-locally) em seu ambiente local, levante o banco de testes com

```bash
/js-med-planner$ docker compose up test-postgres-med-planner
```

então vá para o diretório do mesmo e execute o comando de testes:

```bash
/js-med-planner/backend-rest$ npm run test
```

<img src="./docs/assets/images/screen_captures/integration_tests_db.jpeg">

Cada vez que o comando for procedido, a database de testes será recriada no test-postgres-med-planner assegurando uma execução limpa

<img src="./docs/assets/images/screen_captures/integration_tests_run.jpeg">

Saída esperada pelo comando

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="best-practices"></a>
### 👏 Boas Práticas

- [Swagger](https://swagger.io/)
- [Github Project - Kanbam](https://github.com/users/jtonynet/projects/5/views/1)
- [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [ADR - Architecture Decision Records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Mermaid Diagrams](https://mermaid.js.org)
<!--
- [Observabilidade](https://en.wikipedia.org/wiki/Observability_(software)) com:
  - [Prometheus](.)
  - [Grafana](https://grafana.com/)
-->

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="adr"></a> 
### 🧠 ADR - Architecture Decision Records

- [0001: Registro de Decisões de Arquitetura (ADR)](./docs/architecture/decisions/0001-registro-de-decisoes-de-arquitetura.md)
- [0002: Express, Sequelize e Postgres em API TDD Jest com arquitetura de Duas camadas](./docs/architecture/decisions/0002-express-sequelize-e-postgres-tdd-jest-com-arquitetura-de-api-em-duas-camadas.md)

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="versions"></a>
### 🔢 Versões

As tags de versões estão sendo criadas manualmente a medida que o projeto avança com melhorias notáveis. Cada funcionalidade é desenvolvida em uma branch a parte (Branch Based, [feature branch](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)) quando finalizadas é gerada tag e mergeadas em master.

Para obter mais informações, consulte o [Histórico de Versões](./CHANGELOG.md).

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="tools"></a>
### 🧰 Ferramentas

- Linguagem:
  - [NodeJS v20.17.0](https://nodejs.org/en)
  - [NVM](https://github.com/nvm-sh/nvm)

- Framework & Libs:
  - [Express 4.21.0](https://expressjs.com/)
  - [Jest](https://jestjs.io/pt-BR/)
  - [Sequelize 6.37.3](https://sequelize.org/)
  - [.env](https://www.npmjs.com/package/dotenv)

- Infra & Technologias
  - [Docker v24.0.6](https://www.docker.com/)
  - [Docker compose v2.21.0](https://www.docker.com/)
  - [MySQL](https://www.postgresql.org/)
<!--
  - [Prometheus](https://prometheus.io/docs/guides/go-application)
  - [Grafana](https://grafana.com/)
-->

- GUIs:
  - [VsCode](https://code.visualstudio.com/)
  - [Postman](https://blog.postman.com/introducing-the-postman-vs-code-extension/)

<br/>

[⤴️ de volta ao índice](#index)

---

<a id="ia"></a>
### 🤖 Uso de AI

A figura do cabeçalho nesta página foi criada com a ajuda de inteligência artificial e um mínimo de retoques e construção no Gimp [<img src="./docs/assets/images/icons/gimp.svg" width="30" height="30 " title="Gimp" alt="Gimp Logo" />](https://www.gimp.org/)


__Os seguintes prompts foram usados para criação no  [Bing IA:](https://www.bing.com/images/create/)__


<details>
  <summary><b>Jovem Médica</b></summary>
"medica mulher afrodescendente de óculos segurando um Smartphone e olhando atentamente para ele com um leve sorriso. Fundo branco para fácil remoção, estilo cartoon cores chapadas, historia em quadrinhos" <b>(sic)</b>
</details>

<br/>

__Arte e desenvolvimento são, acima de tudo, atividades criativas humanas. Valorize as pessoas!__

Contrate artistas para projetos comerciais ou mais elaborados e aprenda a ser engenhoso!

[⤴️ de volta ao índice](#index)

<br/>

---

<a id="conclusion"></a>
### 🏁 Conclusão

__TODO__

😊🚀

<br/>

[⤴️ de volta ao índice](#index)

---

<!-- 
Teste concorrendo com a app, derrubar porta 300
sudo kill -9 $(lsof -t -i:3000)

Criando Modelos com o cli do sequelize

```bash
sequelize model:create --name patients --attributes uuid:uuid,name:string,phone:string,email:string,birthDate:date,gender:string,height:float,weight:float
```

```bash
sequelize model:create --name doctors --attributes uuid:uuid,name:string,email:string,password:string
sequelize seed:create --name create-initial-doctor

sequelize model:create --name appointments --attributes uuid:uuid,patientId:int,doctorId:int,description:string,startTime:date,endTime:date

sequelize model:create --name observations --attributes uuid:uuid,appointmentId:int,message:string
```

//LIMPANDO DOCKER

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker rmi $(docker images -q) --force

docker volume rm $(docker volume ls -q) --force

docker network prune -f

docker system prune -a --volumes

-->


