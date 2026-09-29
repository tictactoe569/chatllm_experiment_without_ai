# Registros do Participante

Este arquivo é um espaço opcional e de uso livre durante a atividade.

Você pode utilizá-lo da forma que considerar mais útil para o seu trabalho. Por exemplo, ele pode servir como:

documentação própria da solução;

- anotações;

- refatorações;

- rascunhos;

- observações;

- lembretes;

- listas ou checklists;

- referências;

qualquer outro registro que você considere útil durante a implementação.

Não existe um formato esperado, nem é necessário preencher este arquivo para concluir a atividade.

Caso utilize este espaço, organize o conteúdo da maneira que preferir.

---

Exemplo de request:

```json
{
  "message": "Explique o que e um LLM em uma frase.",
  "history": [
    { "role": "user", "content": "Oi" },
    { "role": "assistant", "content": "Oi!" }
  ]
}
```
#1. **Persistencia por usuario:** as instrucoes personalizadas devem ser salvas no banco de dados SQLite e associadas ao usuario autenticado.
2. **Edicao na interface:** o usuario logado deve conseguir visualizar e editar suas instrucoes pela interface web e salva-las.
3. **Uso nas conversas:** as mensagens enviadas ao modelo (incluindo streaming) devem usar as instrucoes do usuario logado no lugar do prompt fixo.
4. **Valor padrao:** um usuario que nunca editou suas instrucoes deve continuar recebendo o comportamento atual (o prompt padrao).
5. **Isolamento:** um usuario nunca pode ler nem alterar as instrucoes de outro usuario. Os endpoints devem exigir autenticacao.
6. **Persistencia entre logins:** apos logout e novo login, as instrucoes salvas continuam la.

## Endpoints da API

1. `GET /health` retorna status da API.
2. `POST /api/chat` envia mensagem para o modelo e retorna resposta.
3. `POST /api/chat/stream` envia mensagem e retorna a resposta em streaming (SSE), com renderizacao progressiva no chat.


----

como nao tenho conhecimento/experiencia com as ferramentas usadas nesse projeto, deixo aqui minha ideia de como fazer a tarefa:
System Prompt = SP
-adicionar ao bd o system prompt, associando-o ao usuario
-adicionar na interface uma funcionalidade (provavelmente canto superior direito) para abrir um campo de edicao do system prompt do usuario, ela iria puxar do db e se encontrar
uma SP custom, ela carrega no campo de texto, caso contrario deixaria no campo o SP hardcoded. uma opcao adicional para usar o default (pois o user pode querer usar sem SP, ou poderia ter escrito uma SP insatisfatoria e querer voltar ao default)
-pelo oq entendi do funcionamento do request de msgs, ele manda a msg atual do usuario junto de todo o historico de msg, incluindo o systemprompt
entao, faria uma alteracao no openrouter.py, em _build_messages, para que chamasse uma nova func que puxaria do db o SP do usuario e botaria na variavel,
deixando a hardcoded como fallback, caso no db ainda nao tenha essa customizacao...
-como cada usuario tem salvo sua SP, e quando for fazer o request, o SP e puxado do db, acredito que nao deve dar problemas com o isolamento... mas poderia escrever testes automatizados para
aumentar o grau de certeza quanto a isso
-como é salvo no db e puxado a cada request, deve ser possivel manter a persistencia entre logins... mas poderia escrever testes automatizados para
aumentar o grau de certeza quanto a isso

¯\_(ツ)_/¯