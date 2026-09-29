# Registros do Participante

Este arquivo é um espaço opcional e de uso livre durante a atividade.

Você pode utilizá-lo da forma que considerar mais útil para o seu trabalho. Por exemplo, ele pode servir como:

documentação própria da solução;

- anotações;
Pensei em primeiro começar pelo backend para criar um campo de custom_instructions na classe do User para dessa forma ser algo unico dele e não termos outro usuario acessando as informações dele. Sendo assim, vi que o ideal seria criar esse campo, depois disso em 'openrouter.py' criar a classe para a resposta customizada e estou propagando essas mudanças pelo código.

Tem certas partes em que fico em duvida de como prosseguir, acho que comecei bem e até sei como terminar, mas a parte dos endpoints vai ser mais complicada. Além disso ainda tem a parte do App.jsx que quero fazer o seguinte: Criar um botão ao lado de "Sair" que abra um modal e eu possa colocar minhas instruções customizadas. Ele por padrão deve começar em branco sempre para seguir com o enunciado e ao digitar minha instrução todos as respostas seguintes terão aquela instrução implementada. Acho que fiz certo ao modificar o openrouter.py, mas como propagar depois disso que é dificil.

Além disso, preciso criar um endpoint para quando o usuario tiver uma custom_instruction, utiliza-lo para enviar sua resposta para o openrouter.

- refatorações;
Não refatorei nada.

- rascunhos;

- observações;
Arquivos que precisam ser mexidos:
models.py
openrouter.py
App.jsx
database/chat.db (alterar diretamente ou por outro meio para adicionar nova coluna)
tests/

- lembretes;
Preciso atualizar o chat.db para conter a coluna de custom_instructions para ter a permanencia mencionado nas instruções.
Algo como:
-- Source - https://stackoverflow.com/a/4253879
-- Posted by Raceimaztion, modified by community. See post 'Timeline' for change history
-- Retrieved 2026-09-29, License - CC BY-SA 4.0

ALTER TABLE chat_messages ADD COLUMN custom_instructions TEXT;


- listas ou checklists;
1 - Adição de atributo custom_instructions em User [X]
2 - Criação de classe para resposta personalizada [X]
3 - Criar os endpoints [ ]
4 - Mexer em app.jsx para criar o modal para possibilitar as instruções personalizadas [ ] (quase lá)
5 - Modificar os testes existentes para adicionar os novos casos [ ] (não farei) 


- requisitos;
1. **Persistencia por usuario:** as instrucoes personalizadas devem ser salvas no banco de dados SQLite e associadas ao usuario autenticado. [ ] (falta alterar o BD)
2. **Edicao na interface:** o usuario logado deve conseguir visualizar e editar suas instrucoes pela interface web e salva-las. [ ] (quase lá tambem)
3. **Uso nas conversas:** as mensagens enviadas ao modelo (incluindo streaming) devem usar as instrucoes do usuario logado no lugar do prompt fixo. [X]
4. **Valor padrao:** um usuario que nunca editou suas instrucoes deve continuar recebendo o comportamento atual (o prompt padrao). [X]
5. **Isolamento:** um usuario nunca pode ler nem alterar as instrucoes de outro usuario. Os endpoints devem exigir autenticacao. [X]
6. **Persistencia entre logins:** apos logout e novo login, as instrucoes salvas continuam la. [ ] (para isso preciso fazer a 1)


- referências;
1- https://stackoverflow.com/questions/64911558/custom-dialog-box-with-text-input-react-native
2- https://stackoverflow.com/a/4253879

---

Registros
