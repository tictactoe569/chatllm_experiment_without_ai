# ChatLLM Lab - Tarefa 3: Instrucoes Personalizadas (sem IA)

Este repositorio faz parte de uma pesquisa academica sobre **divida cognitiva no desenvolvimento de software com IA Generativa**.

Nesta tarefa voce parte de um ChatLLM que ja possui **login/logout** e **sessoes de chat com titulo automatico**, e vai implementar uma nova funcionalidade **manualmente**.

## 🚫 PROIBIDO O USO DE IA NESTA TAREFA

Esta tarefa deve ser feita **inteiramente por voce, sem assistentes de IA**.

- **Nao** use GitHub Copilot (chat, agente ou autocomplete), Claude, ChatGPT, Gemini, Cursor ou qualquer outra ferramenta de IA generativa.
- **Desative** o autocomplete do Copilot no VS Code durante a tarefa.
- Voce **pode** consultar documentacao oficial (FastAPI, SQLAlchemy, React, MDN, etc.), o codigo existente do projeto e suas proprias anotacoes. Para utilizar o google siga as configurações de **`CONFIG_GOOGLE.md`**.

Os assistentes de IA deste repositorio foram configurados (`.github/copilot-instructions.md` e `.claude/`) para **recusar** qualquer implementacao. O objetivo do experimento e medir o seu entendimento do codigo, entao o uso de IA invalida sua participacao.

## ⚠️ Antes de Comecar - Configuracao Obrigatoria

O arquivo `.env` e extraido pelo script de setup a partir de um arquivo protegido por senha incluido no repositorio. **A senha sera fornecida pelo professor.**

1. Execute o script de setup na raiz do projeto:

   Linux/Mac:

   ```bash
   bash ./setup.sh
   ```

   Windows:

   ```bat
   setup.bat
   ```

   ou

   ``` PowerShell
   .\setup.bat
   ```

2. Quando o script pedir, **digite a senha fornecida pelo professor**. Os caracteres nao aparecem enquanto voce digita; isso e normal. Se a senha estiver errada, o setup para com erro; basta executa-lo novamente. A extracao usa ferramentas do proprio sistema: `unzip` no Linux/Mac (instale com `sudo apt install unzip` se faltar) e `tar` no Windows 10/11.
3. Ao final, o arquivo `.env` estara na raiz do projeto.
4. Rode a aplicacao (`bash ./setup.sh run` ou `setup.bat run` ou `.\setup.bat run`) e abra `http://127.0.0.1:8000`.

> 🛠️ **Passo a passo completo e solucao de problemas:** veja [README_SETUP.md](README_SETUP.md).

## Estado Atual do Projeto

1. Backend FastAPI + SQLite com cadastro, login e logout por email e senha.
2. Sessoes de chat em uma barra lateral, com historico persistido e titulo automatico.
3. Inferencia via OpenRouter.
4. Um **system prompt fixo (hardcoded)** no backend, igual para todos os usuarios, enviado ao modelo em toda conversa.

## Tarefa 3 - Instrucoes Personalizadas por Usuario

Hoje o system prompt e fixo no codigo. Voce deve permitir que **cada usuario edite as suas proprias instrucoes personalizadas** (o system prompt), de forma parecida com o recurso "Custom Instructions" do ChatGPT.


### Requisitos minimos

1. **Persistencia por usuario:** as instrucoes personalizadas devem ser salvas no banco de dados SQLite e associadas ao usuario autenticado.
2. **Edicao na interface:** o usuario logado deve conseguir visualizar e editar suas instrucoes pela interface web e salva-las.
3. **Uso nas conversas:** as mensagens enviadas ao modelo (incluindo streaming) devem usar as instrucoes do usuario logado no lugar do prompt fixo.
4. **Valor padrao:** um usuario que nunca editou suas instrucoes deve continuar recebendo o comportamento atual (o prompt padrao).
5. **Isolamento:** um usuario nunca pode ler nem alterar as instrucoes de outro usuario. Os endpoints devem exigir autenticacao.
6. **Persistencia entre logins:** apos logout e novo login, as instrucoes salvas continuam la.

## Entrega

1. Faca commits pequenos e com mensagens descritivas ao longo do desenvolvimento.
2. Garanta que os testes existentes continuam passando (`.venv/bin/python -m pytest` ou `.venv\Scripts\python.exe -m pytest`).
3. Faca push das alteracoes para o repositorio remoto.
