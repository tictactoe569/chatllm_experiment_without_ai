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

Registros

ja percebi que não vou conseguir fazer isso daqui até o final em 2 horas. tenho 0 experiencia usando react na mão e uso IA direto, então não sei fazer esses pormenores. Já identifiquei onde ta o campo do systemprompt via ctrl+F no vscode, e cheguei até a criar um campo input na sidebar que poderia servir pra escrever o novo system prompt, mas não faço ideia de como pegar o valor do input field e passar ele como argumento de uma função que faria essa troca. Minha ideia seria criar uma coluna nova na tabela de usuario com o systemprompt e adicionar lá. Sei que não é a melhor abordagem mas dado o tempo e minha falta de proficiencia com isso acho que é o mais possível de se fazer.

update (1:30 de tempo de desenvolvimento):
Consegui progredir legal, consegui passar do problema no frontend e estou enviando a string escrita pelo usuário até a API que enviaria pro Backend. no backend em si já criei uma rota que deve ser o suficiente para levar essa string até um setter de system prompt. Estou atualmente preso numa questão de comunicação da API de frontend pro backend, recebo o erro 405 e não consigo resolver e nem achar uma solução na internet. Novamente isso vem da minha falta de familiaridade com react. Provavelmente vou acabar tendo que entregar incompleto assim. Meus próximos passos aqui seriam tentar fazer essa mudança em uma unidade de sessão, testar se essa mudança está influencieando no comportamento das respostas e ai depois buscar um meio de criar uma nova coluna na tabela para fazer essas systemprompt ser persistida pelo usuário e não pelo app inteiro.