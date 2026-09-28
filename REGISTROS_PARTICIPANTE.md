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
PREENCHIMENTO E EXPLICACAO DA SOLUCAO ------


Eu nao tenho muito conhecimento sobre react mas consigo detalhar o que eu faria caso tivesse.

Primeiro eu criei um botao abaixo da sidebar que ao clicar apareceria um popup com uma input box para o usuario inserir as instrucoes que deseja.

Eu criei uma nova coluna na classe usuario chamada prompt, onde o prompt atualizado seria armazenado caso fosse usado (caso contrario seria usado o prompt hardcoded atual)

Após o usuario inserir as instrucoes ele pode ou clicar em um botao de salvar ou de cancelar (apenas fecharia o popup). Se clicasse em salvar o texto inserido seria salvo dentro da coluna prompt da sua entidade de usuario respectiva pelo seu id. 

Nao consegui encontrar exatamente onde o prompt hardocded é chamado mas eu iria sobrescrever essa chamada dentro de cada sessao de usuario para usar o prompt atualizado que o usuario inseriu (caso estivesse vazio eu continuaria no prompt original hardcoded)

Para os testes automatizados eu criaria um que abre o popup, outro que atualiza o prompt e envia uma mensagem ao usuario que deveria ser afetada pelo prompt ("tipo se as instrucoes atualizadas fossem ´sempre inclua goodbye no final das suas respostas´ o teste verificaria se a resposta do agente contem esse goodbye )

e por ultimo eu adicionaria um teste similar a esse porem fazendo o logout e login antes para verificar a persistencia.

