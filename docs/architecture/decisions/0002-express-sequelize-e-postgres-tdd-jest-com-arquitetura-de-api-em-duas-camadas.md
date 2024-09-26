# 2. Express, Sequelize e Postgress em API TDD Jest com arquitetura de Duas camadas

Data: 16 de fevereiro de 2024

## Status

Aceito

## Contexto

Precisamos definir o melhor fluxo de trabalho e testes para a `js-med-planner`.


Dadas as necessidades expostas na documentacao do desafio, que em parte podem ser vistas na parte [`Sobre->Requisitos não funcionais->Requisitos obrigatórios` do arquivo README.md](../../../README.md). Segue o principal trecho para nosso contexto:

>
> Pode ser feito em __node.js__ (javascript ou typescript) ou PHP (laravel);
>

Temos diversas abordagens para a construção dessa API, incluindo `Arquitetura Hexagonal`, `DDD` e `Duas Camadas`, além da abordagem de testes na já conhecida Pirâmide de Testes, que pode auxiliar no fluxo de `CI`, componente crucial para a estabilidade em um [Microsserviço Pronto para Produção](https://www.amazon.com.br/Microsservi%C3%A7os-Prontos-Para-Produ%C3%A7%C3%A3o-Padronizados/dp/8575226215).

<img src="../../assets/images/layout/graphics/test_pyramid.jpg">

_[Imagem retirada do artigo: The Testing Pyramid: Simplified for One and All](https://www.headspin.io/blog/the-testing-pyramid-simplified-for-one-and-all)_

## Decisão

Este documento determina o fluxo de trabalho __Branch Based com Feature Branch__, design estrutural e a abordagem de testes para garantir um padrão e a estabilidade da aplicação.

Dada sua aparente simplicidade, Faz sentido utilizar iniciar por uma __Arquitetura de Duas Camadas__. Caso exista a necessidade e a complexidade aumentar, o projeto pode ser extendido para o uso de uma __Terceira Camada__.

__Nodejs JavaScript no framework Express__ Foram escolhidos pela sua simplicidade e minha familiaridade com seu fluxo de desenvolvimento, utilizando __Jest__ para testes

__Sequelize__ foi escolhido como ORM por facilitar a integração aos principais BDs.

Utilizaremos __Integration Test__ para iniciar a construção de nosso sistema através dele, no espírito do __TDD__. Para que haja forte integração ao GithubActions, que adotaremos como processo de __CI__. Não identifiquei a necessidade de testes unitários no momento, pois a complexidade do sistema está concentrada em suas consultas ao banco. No entanto, não descarto a possibilidade de utilizá-los no futuro, assim que houver necessidade.

Também faz sentido adotar ferramentas de documentação e design de APIs, como o __Swagger__, devido ao seu amplo histórico de utilização e mantendo a consistência da API.

As escolhas de tecnologia foram conservadoras, visando garantir segurança e entrega. __TypeScript com NestJS e TypeORM__ foram considerados, mas como a maior experiência do time está nas tecnologias previamente escolhidas, decidimos seguir com elas. No futuro, outros desenvolvimentos podem utilizar a stack que foi preterida.

Decidi também utilizar o [Github Projects](https://github.com/users/jtonynet/projects/6) como ferramenta para auxiliar na abordagem __Kanban__ para conclusão das tarefas, visando alcançar um cenário próximo ao de um time de desenvolvimento real.

## Consequências

Uma API bem documentada (__Swagger, Readme, ADRs e Diagramas__) que atende as propostas da área de negócios e as __Guidelines and Guardrails__ (definições prévias da área de tecnologia), conforme descrito no [arquivo README.md](../../../README.md), com capacidade de desenvolvimento e expansão de forma __Iterativa e Incremental__.
