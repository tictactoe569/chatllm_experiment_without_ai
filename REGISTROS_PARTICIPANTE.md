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


Priimeiro vou pesquisar o que são as custom instructions do chatgpt... nunca as utilizei

Pelo que entendi é uma tela que pergunta se o usuario quer por dados dele, como um background ou como ele quer que o chat responda a ele. 

Então em suma eu preciso criar um botao que abra um painel que pergunte se o uusuario quer escrever uma mensagem, falando sobre seu background e preferencias de respostas. Essa mensagem deve ser armazenada por usuario e usada como bases nas conversas. Então talvez eu possa criar um esquema só para essas referencias, o qual tem uma ligacao com o usuario e que toda vez que um novo chat for rodado, ele le essas especificacoes para responder correspondente a personalização. Pode já existir um default para esse texto e que o usuario pode troca-lo para a sua personalizacao atraves do botao. A parte de isolamento e persistencia provavelmente será igual ao dos historicos. 

Vou ler o codigo e entender que partes consigo reutilizar. 

Talvez possa criar uma class ChatPreferences no chat.py

vou rodar os testes antes de mexer no codigo. nao consegui rodar os testes e nao quer perder muito tempo entendendo eles agora... 
   
(.venv) C:\Users\EyeTracker\chatllm_experiment_without_ai>python3 tests/test_schemas.py
Traceback (most recent call last):
  File "C:\Users\EyeTracker\chatllm_experiment_without_ai\tests\test_schemas.py", line 6, in <module>
    from backend.schemas.chat import ChatMessageIn, ChatRequest, ChatResponse
ModuleNotFoundError: No module named 'backend'


Continuarei criando e testando manualmente.... nao é como faria se tivesse mais tempo, mas tudo bem. 

Embora eu entenda o codigo, nao me lembro de fazer um esquema, então copiei a estrutura dos outros e estou vendo se essas variaveis sao usadas em outro slugares tbm. 

class TestChatResponse:
    def test_valid_response(self):
        resp = ChatResponse(reply="Resposta do modelo.", model="google/gemma-4-31b-it")
        assert resp.reply == "Resposta do modelo."
        assert resp.model == "google/gemma-4-31b-it"


Acho que posso passar as preferencias para ele ver aqui antes, ou talvez no propria class ChatResponse... Tenho que investigar o melhor lugar para esse fluxo.

Na vdd acho que talvez no router tbm seja relevante. Preciso entender como a logica funciona. Gostaria que tivessem comentarios no codigo para eu entender 100%

try:
        reply, model_name = await generate_reply(
            user_message=payload.message,
            history=[item.model_dump() for item in payload.history],
            model=payload.model,
        )

provavelmente é nesse bloco que preciso mandar a infomacao.


Antes fui ver o front. vou usar a estrutura do btn novo chat para o btn de preferencias. 

  const handleChangePreferences = async () => {
    print("oi")
  };

  nao sei bem como implementar isso aqui mas em teoria ele vai abrir um textinho para mudar minhas preferencias. 

O btn foi criado mas qnd eu clico nele abre a impressora... em jsx o print nao é o console.log.... 


