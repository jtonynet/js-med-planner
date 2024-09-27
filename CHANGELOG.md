# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Added

### Fixed

## [0.0.16] - 2024-27-09
### Added

- Acertos no Docker
- bugfixes


## [0.0.15] - 2024-25-09
### Added

- [Conforme Issue 35](https://github.com/jtonynet/js-med-planner/issues/35):
  - Adicionadas Restrições/Validações para creates e updates
  - Aumentando a cabertura de testes com corner cases
  - Melhorias e refactor nas duas camadas


## [0.0.14] - 2024-24-09
### Added

- [Conforme Issue 33](https://github.com/jtonynet/js-med-planner/issues/33):
  - TDD rota para obter observacoes de agendamento do recurso `observation`
  - Atualizado Swagger

## [0.0.13] - 2024-23-09
### Added

- [Conforme Issue 30](https://github.com/jtonynet/js-med-planner/issues/30):
  - TDD rota de criar observacao de agendamento do recurso `observation`
  - Atualizado Swagger

## [0.0.12] - 2024-23-09
### Added

- [Conforme Issue 28](https://github.com/jtonynet/js-med-planner/issues/28):
  - TDD rota de obter lista por medico autorizado do recurso `appointment`
  - Atualizado Swagger

## [0.0.11] - 2024-23-09
### Added

- [Conforme Issue 24](https://github.com/jtonynet/js-med-planner/issues/26):
  - TDD rota de deletar do recurso `appointment`
  - Atualizado Swagger

## [0.0.10] - 2024-23-09
### Added

- [Conforme Issue 24](https://github.com/jtonynet/js-med-planner/issues/24):
  - TDD rota de editar do recurso `appointment`
  - Atualizado Swagger

## [0.0.9] - 2024-22-09
### Added

- [Conforme Issue 22](https://github.com/jtonynet/js-med-planner/issues/22):
  - TDD rota de listar do recurso `appointment`
  - Atualizado Swagger


## [0.0.8] - 2024-22-09
### Added

- [Conforme Issue 20](https://github.com/jtonynet/js-med-planner/issues/20):
  - model, route e controller `appointment` criados
  - TDD rota de criacao do recurso `appointment`
  - Atualizado Swagger

## [0.0.7] - 2024-19-09
### Added

- [Conforme Issue 16](https://github.com/jtonynet/js-med-planner/issues/16):
  - Documentação da interface da API 
  - Swagger funcional
  - controllers/swagger/schemas possui as anotations dos requests e responses das rotas
  - script base postman exportado


## [0.0.6] - 2024-19-09
### Added

- [Conforme Issue 14](https://github.com/jtonynet/js-med-planner/issues/14):
  - Entidade `doctor` criada
  - `patient` so pode ser manipulada por `doctor` autorizado
  - acertos nos testes para refletir o `autorization`
  - melhorias na suite de testes
  - melhorias no README.md

## [0.0.5] - 2024-18-09
### Added

- [Conforme Issue 12](https://github.com/jtonynet/js-med-planner/issues/12):
  - Rota DELETAR (soft-delete) Paciente por uuid e teste de integração minimo da mesma
  - Usando [paranoid](https://sequelize.org/docs/v6/core-concepts/paranoid/) e [hook de model](https://sequelize.org/docs/v6/other-topics/hooks/#permanent-hooks-with-sequelizeaddhook) para ser aderente a LGPD
  - melhorias na suite de testes
  - melhorias no README.md

## [0.0.4] - 2024-18-09
### Added

- [Conforme Issue 10](https://github.com/jtonynet/js-med-planner/issues/10):
  - Rota obter Paciente por uuid e teste de integração minimo da mesma
  - Rota editar Pacientes e teste de integração minimo da mesma
  - melhorias na suite de testes
  - melhorias no README.md


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

[0.0.16]: https://github.com/jtonynet/js-med-planner/compare/v0.0.14...v0.0.16
[0.0.15]: https://github.com/jtonynet/js-med-planner/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/jtonynet/js-med-planner/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/jtonynet/js-med-planner/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/jtonynet/js-med-planner/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/jtonynet/js-med-planner/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/jtonynet/js-med-planner/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/jtonynet/js-med-planner/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/jtonynet/js-med-planner/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/jtonynet/js-med-planner/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/jtonynet/js-med-planner/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/jtonynet/js-med-planner/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/jtonynet/js-med-planner/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/jtonynet/js-med-planner/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/jtonynet/js-med-planner/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/jtonynet/js-med-planner/compare/v0.0.0...v0.0.1
[0.0.0]: https://github.com/jtonynet/js-med-planner/releases/tag/v0.0.0
