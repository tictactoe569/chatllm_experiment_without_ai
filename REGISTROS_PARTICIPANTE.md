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


Não foi possível implementar a funcionalidade solicitada: "deve permitir que **cada usuario edite as suas proprias instrucoes personalizadas** (o system prompt), de forma parecida com o recurso "Custom Instructions" do ChatGPT."

Apesar dos esforços, pela falta de familiaridade com react e programação fullstack, não foi possível gerar uma versão estável que implemente o que foi solicitado.
Outra dificuldade que enfrentei foi em relação a falta de sqlite3 nas variáveis de ambiente, não permitindo que eu alterasse o squema da tabela do chat.db alocando o seu novo campo de system prompt.

O processo de abordagem seguiu reconhecendo como o código funciona e localizando a parte que seria alterada. Com a parte mais ao extremo do backend localizada, a alteração começou no intuito de seguir sua conexões até o frontend concluindo a alteração. 

Começamos alterando o openrouter, assim como em backend, alteramos chat para passar esse novo parametro para o openrouter que ja foi alterado para receber o parametro do systemprompt.
Em seguida, alteramos o models para comportar a nova coluna de system prompt que seria necessária, assim como alterar a estrutura de dados/classe nos outros arquivos para assim também comportar esse novo dado. Depois dos ajustes no backend, era necessário alterar a ligação com o frontend que está em javascript e react, começamos com a mesma abordagem de focar nas conexões com o backend.
Dado o desconhecimento com essas stacks, as alterações não foram efetivas para a conclusão da manutenção e adição da nova funcionalidade.

