# Aula 01 — Intensivo CCP (Escola da Nuvem) · AWS Certified Cloud Practitioner CLF-C02

- **Instrutor:** Anderson Poquete (ex-aluno e instrutor da Escola da Nuvem). Moderadora no chat: Kerry/Karen.
- **Data:** 17/11/2026 · **Duração:** 2h51 · **Vídeo:** https://www.youtube.com/live/-Aw73AKN52s
- **Guia oficial do exame (PDF):** https://d1.awsstatic.com/pt_BR/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf
- **Fonte deste resumo:** transcrição automática do áudio (arquivo `Transcricao Aula 01 - Intensivo CCP.txt`, ao lado). Os minutos entre colchetes, como `[01:31]`, apontam o ponto no vídeo.
- Marcações: **(aula)** = dito pelo instrutor · **(complemento)** = conhecimento geral, não dito na aula · **(conferir)** = trecho confuso na transcrição.

---

## 1. Como é a prova `[00:08]`

| Item | O que foi dito |
|---|---|
| Questões | **65**; só **50 valem nota**, 15 não são avaliadas (e você não sabe quais) |
| Dica | Responda todas como se valessem ponto |
| Formato | Múltipla escolha (1 resposta) e **múltipla resposta** ("escolha duas"). Marcar só uma certa e uma errada = erro |

**Domínios e peso:**

| Domínio | Peso |
|---|---|
| 1. Conceitos de nuvem | 24% |
| 2. Segurança e conformidade | 30% |
| 3. Tecnologia e serviços de nuvem | 34% |
| 4. Cobrança, preços e suporte | 12% |

**Como estudar:**
- O **Guia do Exame é o norte** até a certificação. Mantenha à mão (impresso, celular ou tablet).
- **Página 15 do guia (Apêndice):** lista de tecnologias e conceitos. Anote ao lado de cada serviço a descrição e as palavras-chave.
- Tudo que está no guia **pode** cair, mas não dá para estudar tudo: a AWS tem **mais de 260 serviços** (mais de 300 com recursos). Foco nos **serviços core**.
- Depois da aula: veja o vídeo, faça **simulados** e use **materiais oficiais da AWS** (documentação), não de terceiros.

---

## 2. Serviços core que mais caem `[00:17]`

**Computação**
- **EC2:** servidores virtuais. É o "carro-chefe". Hospeda sites e sistemas.
- **EC2 Auto Scaling (Auto Scaling Group):** aumenta ou diminui as instâncias automaticamente conforme a demanda.
- **Elastic Beanstalk:** o dev sobe o código e o serviço cria a infraestrutura (instâncias, banco, rede). É PaaS. Já caiu várias vezes nas provas dele.
- **Lambda:** computação **serverless**; executa código sem administrar servidor.

**Redes e entrega de conteúdo**
- **VPC:** rede virtual privada (redes, sub-redes, regras de acesso).
- **Route 53:** DNS; também registra domínios e faz política de roteamento.
- **CloudFront:** **CDN** (rede de distribuição de conteúdo). Entrega vídeo, site, foto ou documento com **menor latência**, usando os pontos de presença.
- **Elastic Load Balancer:** divide o tráfego entre as instâncias para não sobrecarregar nenhuma.

**Gerenciamento e governança**
- **CloudWatch:** monitoramento e **observabilidade** (métricas, logs, alarmes).
- **Trusted Advisor:** o "conselheiro". **Só sugere**, não executa. Aponta melhorias em **custo, limites de serviço, segurança** etc.
- **CloudFormation:** infraestrutura como código.
- **AWS Config:** registra e avalia a configuração dos recursos.
- **CloudTrail:** registra **quem fez o quê, quando** na conta. "O X9": tudo na AWS é registrado.

**Banco de dados**
- **RDS:** banco **relacional** gerenciado pela AWS.
- **DynamoDB:** **NoSQL**, não relacional, chave-valor.
- **Aurora:** relacional criado pela AWS, compatível com **MySQL e PostgreSQL**, alto desempenho (**até 5x mais rápido que o MySQL**, segundo a aula).
- Citados também: Redshift, DocumentDB, Timestream.

**Segurança, identidade e conformidade**
- **IAM:** gerenciamento de identidade e acesso (quem acessa o quê). **Gratuito** a nível de conta. Cai com certeza.
- **WAF:** firewall de aplicações web, **camada 7**. Ex.: bloquear tráfego por país.
- **Shield:** proteção contra **ataques de negação de serviço (DDoS)**.
- **Artifact:** documentos de **conformidade** (compliance) da AWS.

**Custos**
- **Pricing Calculator:** **estima** custos antes de criar (nem exige conta AWS).
- **Cost Explorer:** **analisa** o que você já gastou (dashboards ao longo do tempo).
- **Budgets (Orçamentos):** define um limite (ex.: US$ 500/mês) e **avisa por e-mail** em 20%, 40%, 80%, 100%.

**Armazenamento**
- **S3:** armazenamento de **objetos** (arquivo, imagem, vídeo, backup).
- **EBS:** armazenamento em **blocos** para instâncias EC2 (SSD ou HD).
- **S3 Glacier:** armazenamento "frio", longo prazo, acesso raro, **arquivamento** (palavra-chave). Tem criptografia.
- **Família Snow:** Snowcone, Snowball e Snowmobile. Ele disse que o **Snowmobile foi descontinuado**.

**Outros que podem cair** (ele disse que já caíram nas provas dele: Glue, DataSync, DMS, Migration Hub)
- Análise: Athena, Glue · Containers: ECR, EKS, Fargate · Usuário final: WorkSpaces, AppStream 2.0
- Migração: DataSync, DMS, Migration Hub
- (conferir) Ele mencionou que Kendra e Cloud9 também estariam saindo; a transcrição está confusa neste trecho `[00:52]`.

---

## 3. Domínio 1: Conceitos de nuvem

### 3.1 O que é computação em nuvem `[00:57]`
Entrega **sob demanda** de recursos computacionais (armazenamento, banco, servidores etc.) **via internet**, por um provedor, **sem gerenciamento ativo do usuário**.

### 3.2 As 6 vantagens da computação em nuvem `[01:01]`
O instrutor deu **100% de certeza que cai** na prova.

| # | Vantagem (como ele falou) | Ideia |
|---|---|---|
| 1 | **Economize / Troque despesa de capital por despesa variável** | CapEx → OpEx. Sem comprar servidor, ar-condicionado, segurança antes de começar. **Paga só pelo que usar.** |
| 2 | **Grandes economias de escala** | A AWS atende milhares de clientes, então reduz custo e repassa preço menor. |
| 3 | **Pare de adivinhar a capacidade** | Aumenta e diminui recursos conforme a demanda. |
| 4 | **Pare de gastar dinheiro mantendo data centers** | Foco no cliente/negócio, não na infraestrutura física. |
| 5 | **Aumente a velocidade e a agilidade** | Recurso pronto em minutos (um servidor físico pode levar semanas). |
| 6 | **Torne-se global em minutos** | Implantar em várias Regiões do mundo rapidamente. |

**Extras da aula:**
- Região de **São Paulo é mais cara** que a de **N. Virgínia** por causa de **impostos**. Se latência e conformidade (compliance) não forem problema, dá para usar N. Virgínia.
- Eliminar a equipe de TI **não** é vantagem (alguém precisa operar a nuvem).
- Redundância **não é padrão** em todos os serviços, e a nuvem **não elimina** a necessidade de segurança.

**Questão-modelo (escolha duas):** "Empresa migrando do on-premises para a AWS. Quais as vantagens?" → resposta da aula: **maior capacidade de implementação global em minutos** e **aumento de velocidade e agilidade**.

### 3.3 Modelos de serviço: IaaS, PaaS, SaaS `[01:16]`
Frase da aula: **"Grandes poderes, grandes responsabilidades"** (IaaS = mais controle e mais responsabilidade).

| Modelo | O que a AWS gerencia | O que é seu | Exemplos da aula |
|---|---|---|---|
| **IaaS** | Servidores, armazenamento, rede (infra física) | SO, aplicação, patches, banco | **EC2**, EBS, VPC, Internet Gateway, NAT Gateway |
| **PaaS** | Do SO para baixo | Aplicação e dados | **RDS**, Elastic Beanstalk |
| **SaaS** | Tudo | Só usar | Gmail, Outlook, **Amazon Connect** (central de atendimento), Rekognition |

- **Analogia da pizza:** feita em casa (on-premises), ingredientes comprados (IaaS), forno pronto (PaaS), delivery/pizzaria (SaaS).
- **Banco no EC2** = você atualiza patches do SO e do banco. **Banco no RDS** = a AWS gerencia, você só configura.
- Como identificar IaaS: você tem **controle sobre a infraestrutura**, por exemplo escolher o tipo de EBS (SSD ou HD).
- **Questão-modelo:** empresa quer e-mail e calendário corporativos totalmente gerenciados, sem se preocupar com servidor → **SaaS**.
- (conferir) Sobre o S3 ele deu uma classificação confusa na aula `[01:27]`. O que vale: é um serviço **totalmente gerenciado** de armazenamento de objetos.

### 3.4 Infraestrutura global da AWS `[01:31]`
Cai na prova.

| Componente | Definição |
|---|---|
| **Região** | Área **geográfica** com data centers da AWS (ex.: São Paulo). Contém várias AZs. A AWS abre regiões novas com frequência (citou Chile e Arábia Saudita em breve; México já ativo). |
| **Zona de Disponibilidade (AZ)** | **Um ou mais data centers** dentro de uma região, **separados por distância significativa**, atuando de forma **independente**. Energia, rede, refrigeração e segurança **redundantes**. Isolam falhas e desastres naturais ou provocados pelo homem. |
| **Ponto de presença (edge location)** | Infraestrutura próxima ao usuário que **guarda em cache** o conteúdo mais pedido para entregar com **menor latência**. **Não faz parte da região.** É usado pelo **CloudFront**. |

- Exemplo do cache: o usuário pede um vídeo → se o ponto de presença não tem, busca na origem e **guarda uma cópia** → próximas requisições saem do ponto de presença (mais rápido).
- A região de São Paulo tem **3 AZs** (segundo a aula); há ponto de presença também no Rio de Janeiro.
- **Dica de prova:** descubra se o item da questão é um **serviço** ou uma **localização física**. Região é localização física; Organizations e Connect são serviços.
- **Questão-modelo:** "Componente com data centers discretos, energia e rede redundantes, dentro da região, ligados por rede de baixa latência" → **Zona de Disponibilidade**.

### 3.5 Recursos gerenciados `[01:46]`
A AWS assume parte de administração, manutenção e operação, e você só configura. Exemplo: **RDS** com motores MySQL, PostgreSQL, MariaDB, Oracle, SQL Server e outros.

Opções de implantação do RDS:
- **Single-AZ:** uma zona de disponibilidade.
- **Multi-AZ:** várias zonas.
- **Multi-AZ cluster:** uma instância principal (escrita) e outras de **leitura** (réplicas) distribuídas nas AZs.

Você configura: usuário, senha, frequência do backup automático.

### 3.6 AWS Well-Architected Framework: 6 pilares `[01:54]`
O instrutor disse que é o assunto que **mais cai**: ele viu de 4 a 7 questões por prova. Você precisa saber o **nome**, o **objetivo** e os **princípios de design** de cada pilar.

| Pilar | Objetivo | Princípios de design citados |
|---|---|---|
| **Excelência operacional** | Entregar valor, operar, monitorar e melhorar continuamente | **Mudanças frequentes, pequenas e reversíveis** · antecipar falhas · **aprender com falhas** · operar como código (*operations as code*) |
| **Segurança** | Proteger dados, sistemas e recursos | **Rastreabilidade** (CloudTrail) · **automatizar** práticas de segurança · proteger dados **em trânsito e em repouso** · preparar-se para eventos de segurança |
| **Confiabilidade** | Funcionar mesmo com falhas e **recuperar-se automaticamente** | **Recuperar-se de falhas automaticamente** · **testar procedimentos de recuperação** · parar de adivinhar capacidade · automação |
| **Eficiência de performance** | Usar recursos de forma eficiente e manter desempenho quando a demanda sobe | **Tornar-se global em minutos** · usar **arquitetura serverless** · **experimentar** com frequência |
| **Otimização de custos** | Saber onde o dinheiro vai, evitar gasto desnecessário, entregar valor ao menor custo | Adotar **modelo baseado em consumo** · **medir eficiência** · analisar gastos |
| **Sustentabilidade** | Reduzir o impacto ambiental da carga de trabalho | Usar **serviços gerenciados** · estabelecer metas de sustentabilidade · entender o impacto da arquitetura |

> A AWS atualizou o framework. Hoje há 6 pilares (o de sustentabilidade é o mais recente, de cerca de 2 anos atrás, segundo a aula). Se a prova ou o material oficial citar só 5, confira na versão do guia.

**Outros princípios de design citados:** escalabilidade **vertical e horizontal** · recursos **descartáveis** (nada de "servidor para isso, servidor para aquilo") · automação (CloudFormation, Auto Scaling) · **baixo acoplamento / dependências fracamente acopladas** (falha em um não pode "cascatear") · **não** ao monolito · "sem servidores" (serverless).

**Game Day / Chaos Monkey (Netflix):** teste de falhas de propósito para validar resiliência. Ele sugeriu pesquisar.

**Questões-modelo:**
- "Quais são pilares do Well-Architected?" (escolha duas) → **Eficiência de performance** e **Excelência operacional**. Estabilidade, elasticidade e outros termos inventados são distratores.
- "Melhorar continuamente processos para entregar valor comercial" → **Excelência operacional**.
- "Capacidade de recuperação automática de interrupções" → **Confiabilidade**.
- "Testar procedimentos de recuperação" → princípio do pilar **Confiabilidade**.
- "Fazer alterações frequentes, pequenas e reversíveis" → princípio de **Excelência operacional**.

### 3.7 CAF: AWS Cloud Adoption Framework `[02:19]`
Conjunto de **boas práticas e orientações** para ajudar organizações a criar e executar uma **estratégia eficaz de adoção da nuvem**. A história que ele contou: uma empresa voltou para o on-premises por **custos altos e falta de conhecimento**, não por falha da nuvem.

**6 perspectivas do CAF:**
1. **Negócios**
2. **Pessoas**
3. **Governança**
4. **Plataforma**
5. **Segurança**
6. **Operações**

Para a prova: saber **as perspectivas e o que compõe cada uma**. Ele vai passar material depois.

---

## 4. Conexão e acesso à AWS `[02:23]`

Três maneiras de acessar serviços e recursos:
1. **Console** (interface web)
2. **CLI** (linha de comando)
3. **SDK** (código, via ferramentas de desenvolvimento)

| Conceito | Significado | Analogia da aula |
|---|---|---|
| **Autenticação** | Provar **quem você é** | Mostrar RG, passaporte ou habilitação |
| **Autorização** | Provar que você **tem permissão** de acessar | Placa "acesso permitido somente a pessoas autorizadas" |

---

## 5. Amazon EC2 em detalhe `[02:26]`

- **EC2 = Elastic Compute Cloud.** Servidores virtuais redimensionáveis. Modelo **IaaS** (aluguel de máquinas virtuais).
- Funciona junto com: **EBS** (volumes virtuais, SSD ou HD), **ELB** (distribui carga) e **Auto Scaling Group**.
  - **Scaling out** = aumenta o número de máquinas · **scaling in** = diminui.
- **Sistemas operacionais:** Windows, Linux, macOS etc.

**Tipos de instância (o que saber para a prova: qual família serve para qual caso):**

| Família | Quando usar |
|---|---|
| **Uso geral** | Servidor web, testes, aplicações comuns |
| **Otimizada para computação** | **HPC** (computação de alto desempenho), cargas intensivas de CPU/GPU |
| **Otimizada para memória** | Cargas que usam muita memória |
| **Otimizada para armazenamento** | **Alto IOPS** (entrada/saída por segundo); banco de dados com muita leitura/gravação |

**Anatomia do nome, ex.: `t2.2xlarge`:**
- `t` = **tipo/família** · `2` = **geração** · depois do ponto = **tamanho** (nano, micro, small, medium, large, xlarge…). O tamanho define vCPUs, memória, banda etc.

**Cobrança do EC2 sob demanda (pegadinha da aula):**
- **Linux:** cobra **por segundo**, com **mínimo de 60 segundos**. Um script de 30 s é cobrado como **1 minuto**.
- **Windows:** segundo a aula, é cobrado **por hora**, por causa da **licença** do sistema. Um teste de 30 s foi cobrado como **1 hora**.
- (conferir na documentação oficial) Hoje a AWS cobra por segundo também em muitos casos de Windows. Para a prova, use o que a questão e o material oficial pedirem.

**Questões-modelo:**
- Data lake com carga **HPC** → instância **otimizada para computação**.
- Carga com **GPU** e computação intensiva → **otimizada para computação**.
- Banco de dados com **alta taxa de leitura/gravação (IOPS)** e baixa latência de disco → **otimizada para armazenamento**.

---

## 6. Dicas de prova do instrutor

1. **Palavras-chave no enunciado** eliminam alternativas (ex.: IOPS → armazenamento; arquivamento → Glacier; CDN/latência → CloudFront).
2. Entenda o **que cada serviço faz**, não decore tudo.
3. Em "escolha duas", **acertar uma só é erro**.
4. Responda **todas** as 65 questões.
5. Estude pelos **materiais oficiais** (documentação, Well-Architected, CAF).
6. Faça **simulados**.

---

## 7. Avisos e próximos passos da turma `[02:43]`

- **Lista de presença:** link na descrição do vídeo.
- **Próxima live:** provavelmente **quinta-feira** (confirmar por e-mail/Classroom: "fiquem atentos").
- Ele vai disponibilizar no Classroom: **gravação**, **material do CAF**, **links de documentação oficial** e **2 simulados**.
- Haverá um **simulado valendo voucher** para a prova (para quem atingir a pontuação).
- **Prêmio:** quem tirar a **maior nota na prova oficial** ganha um **notebook** da Escola da Nuvem (e haverá outros prêmios; a regra detalhada ainda não foi explicada).
- Temas ainda por vir: **modelo de responsabilidade compartilhada** e outros (ficaram para outros dias).

---

## 8. Checklist de revisão

- [ ] 6 vantagens da nuvem (em inglês e português)
- [ ] IaaS × PaaS × SaaS, com 1 exemplo de cada (EC2, RDS/Beanstalk, Connect/Gmail)
- [ ] Região × AZ × ponto de presença
- [ ] 6 pilares do Well-Architected e 1 princípio de cada
- [ ] 6 perspectivas do CAF
- [ ] Autenticação × autorização
- [ ] Console × CLI × SDK
- [ ] Famílias de instância EC2 e anatomia do nome
- [ ] CloudWatch × CloudTrail × Config × Trusted Advisor
- [ ] Pricing Calculator × Cost Explorer × Budgets
- [ ] S3 × EBS × Glacier · RDS × DynamoDB × Aurora
- [ ] WAF × Shield × IAM × Artifact
