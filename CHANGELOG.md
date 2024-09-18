# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Added

### Fixed

## [0.0.3] - 2024-18-09
### Added

- [Conforme Issue 8](https://github.com/jtonynet/js-med-planner/issues/8):
  - Rota Listar Pacientes e teste de integração minimo da mesma
  - Removidos numeros magicos de status code

## [0.0.2] - 2024-18-09
### Added

- [Conforme Issue 5](https://github.com/jtonynet/js-med-planner/issues/5):
  - Rota Cadastrar Paciente e teste de integração minimo da mesma
  - Banco de testes recriado a cada novo teste de integração. Avaliar [pg-mem](https://github.com/oguimbal/pg-mem) no futuro
  - Refactor para corrigir bugs de importação/require module e commonJS
  - Model patients prevendo soft-delete [paranoid](https://sequelize.org/docs/v6/core-concepts/paranoid/) para [crypto-shredding](https://en.wikipedia.org/wiki/Crypto-shredding) aderente a LGPD
  - Evolução do README.md


## [0.0.1] - 2024-17-09
### Added

- [Conforme Issue 3](https://github.com/jtonynet/js-med-planner/issues/3):
  - Criada rest-api com server e teste minimo com eslint
  - rest-api dockerizada
  - docker-compose levanta rest-api e postgres



## [0.0.0] - 2024-16-09
### Added

- [Kanban Project View Iniciado](https://github.com/users/jtonynet/projects/6)
- Iniciado o [Projeto](https://github.com/users/jtonynet/projects/3) com o commit inicial. Documentação base: Readme Rico, [Diagramas Mermaid](https://github.com/jtonynet/go-products-api/tree/main#diagrams), ADRs: [0001: Registro de Decisões de Arquitetura (ADR)](./docs/architecture/decisions/registro-de-decisoes-de-arquitetura.md) e [0002: Express, Sequelize e Postgress em API TDD Jest com arquitetura de Duas camadas](./docs/architecture/decisions/0002-express-sequelize-e-postgress-tdd-jest-com-arquitetura-de-api-em-duas-camadas.md).
- Sabemos o que fazer, graças às definições do arquivo __README.md__. Sabemos como fazer graças aos __ADRs__ e documentações vinculadas. Devemos nos organizar em estrutura __Kanban__, guiados pelo modelo Agile, em nosso __Github Project__, e dar o devido prosseguimento às tarefas.


[0.0.3]: https://github.com/jtonynet/js-med-planner/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/jtonynet/js-med-planner/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/jtonynet/js-med-planner/compare/v0.0.0...v0.0.1
[0.0.0]: https://github.com/jtonynet/js-med-planner/releases/tag/v0.0.0
