# Aula 02 — Intensivo CCP (Escola da Nuvem) · AWS Certified Cloud Practitioner CLF-C02

- **Tema da aula:** Domínio 2, **Segurança e conformidade** (30% da prova).
- **Instrutor:** Anderson Poquete. Moderadora no chat: Jaqueline.
- **Duração:** 2h03 · **Vídeo:** https://www.youtube.com/live/-uzLfcYOIgw
- **Aula anterior:** ver `Resumo Aula 01 - Intensivo CCP (CLF-C02).md`.
- **Fonte deste resumo:** transcrição automática do áudio (arquivo `Transcricao Aula 02 - Intensivo CCP.txt`, ao lado). Os minutos entre colchetes, como `[00:14]`, apontam o ponto no vídeo.
- Marcações: **(aula)** = dito pelo instrutor · **(complemento)** = conhecimento geral, não dito na aula · **(conferir)** = trecho confuso na transcrição.

---

## Mapa da aula

| Bloco | Assunto | Cai na prova? |
|---|---|---|
| 1 | Modelo de responsabilidade compartilhada | **100%**, em geral 3 a 5 questões |
| 2 | IAM (usuários, grupos, funções, políticas, MFA) | Alta |
| 3 | AWS WAF e AWS Shield | Alta |
| 4 | CloudWatch × CloudTrail × Config | Alta, e é fácil confundir os três |
| 5 | AWS Organizations | Alta |
| 6 | AWS Artifact | Média/alta |
| 7 | Trusted Advisor e planos de suporte | Média/alta |

---

## 1. Modelo de responsabilidade compartilhada `[00:08]`

O instrutor deu **certeza absoluta** de que cai: "não tem para onde correr".

**Regra de ouro:**

| Quem | É responsável por |
|---|---|
| **AWS** | Segurança **DA** nuvem |
| **Cliente** | Segurança **NA** nuvem |

**O quadro do modelo** (a imagem é antiga e quase não mudou; **só ela basta** para responder qualquer questão do tema):

| 🟦 Cliente (azul) | 🟧 AWS (laranja) |
|---|---|
| Seus **dados** | **Infraestrutura global**: regiões, zonas de disponibilidade, pontos de presença |
| **Plataforma** e **aplicações** | **Hardware** (servidores, rede física) |
| **Identidades** e gerenciamento de acesso (IAM, **MFA**) | **Software dos serviços** de computação, armazenamento, banco de dados e rede |
| Configuração de **rede e firewall** | **Instalações físicas** (data centers) |
| **Criptografia** de dados (lado cliente e servidor) | Manutenção e patches da infraestrutura |

**Palavras-chave para a prova:**
- Questão com **"infraestrutura"**, **"hardware"** ou **"instalações físicas"** → quase sempre **AWS**.
- Questão com **"permissões de usuário"**, **"MFA"**, **"grupos de segurança"**, **"configuração de firewall/rede"**, **"criptografia dos dados do cliente"** → **cliente**.
- Primeiro leia **de quem** a questão pergunta (cliente ou AWS) e só depois consulte o quadro.

**Questões da aula (respostas):**

| Pergunta | Resposta |
|---|---|
| Qual é responsabilidade do **cliente**? | **Implementar autenticação multifator (MFA) para usuários IAM** |
| Empresa guarda dados no S3. Qual tarefa é da **AWS**? | **Proteger a infraestrutura que suporta o armazenamento do S3** (políticas de bucket e ciclo de vida são do cliente) |
| Pela responsabilidade compartilhada, a **AWS** cuida de… | **Hardware e infraestrutura**. Rede/firewall, criptografia dos dados do cliente e permissões de usuário são do cliente |
| Tarefas da **AWS** (escolha duas) | **Proteger o acesso às instalações físicas da AWS** e **manutenção e patches da infraestrutura**. Configurar IAM e grupos de segurança do EC2 é do cliente |

---

## 2. AWS IAM: identidade e gerenciamento de acesso `[00:29]`

- **Serviço gratuito**, a nível de conta, para todo mundo.
- É aqui que se define **quem** acessa **o quê**. Erro de configuração pode causar um problema grande.

### 2.1 Usuário root `[00:32]`
- É a conta criada no início: **e-mail + senha + cartão de crédito**.
- **Não compartilhe** o usuário root e **não use no dia a dia**.
- Boa prática da AWS: a partir do root, criar um **usuário administrador** (admin) com todas as permissões e usar esse no cotidiano.
- Por quê: se o admin for invadido, você entra com o root e recupera o acesso. Se o root for invadido, você perde tudo ("dor de cabeça").

### 2.2 Princípio do privilégio mínimo `[00:36]`
Dar a cada pessoa **somente o acesso do que ela usa**.
- Exemplo da aula: Bruno (infra) usa **EC2**. João (dev) usa **S3**. Cada um só recebe o acesso do que trabalha. Se alguém roubar a senha, o estrago é limitado.
- Já foi questão de prova do instrutor.

### 2.3 Os recursos do IAM

| Recurso | O que é | Pontos de prova |
|---|---|---|
| **Usuário** | Representa uma **pessoa** ou uma **aplicação/serviço** | Tem **credenciais permanentes** (senha, chave de acesso). Recebe permissões por **políticas** |
| **Grupo** | **Coletivo de usuários** | Um usuário pode estar em **vários grupos**. **Grupos não podem ficar dentro de outros grupos** (não se aninham). Palavra-chave: *organização* |
| **Função (role)** | Dá acesso **temporário** à conta | **Sem credenciais permanentes**. Pode ser assumida por usuário, serviço da AWS ou aplicação. Palavra-chave: *acesso temporário* |
| **Política** | **Documento JSON** que define permissões | Campos: **Effect** (Allow/Deny), **Action** (ação) e **Resource** (recurso) |

**Políticas:**
- `Allow` = permite · `Deny` = **nega** (basta trocar o efeito).
- Exemplo da aula: ação de ver o budget "exemplo_budget" com `Allow`. Mudando para `Deny`, o acesso é negado.
- Política **S3 Full Access** = acesso total ao S3. Política **S3 Read Only** = só leitura.

### 2.4 Autenticação × autorização `[00:44]`

| | Autenticação | Autorização |
|---|---|---|
| Pergunta | **Quem é você?** | **O que você pode fazer?** |
| Como | E-mail, senha, **MFA** | **Políticas e permissões** |
| Analogia | Mostrar RG/passaporte | Placa "acesso permitido só a pessoal autorizado" |

Fluxo: o usuário **se autentica** (prova quem é) → a **política** dá a **autorização** para acessar o recurso (ex.: um bucket S3).

### 2.5 MFA (autenticação multifator) `[00:51]`
- É o **segundo fator de proteção** (além de senha). Ex.: app autenticador (Microsoft, Google), digital.
- É uma **boa prática documentada** pela AWS para quem faz login.
- **Resposta da questão:** "boas práticas de segurança do IAM" → **ativar MFA no processo de login**.

### 2.6 Questão-modelo: privilégio mínimo `[00:55]`
Analista novo só precisa **ler objetos em um bucket S3** → princípio do **privilégio mínimo** → política **S3 Read Only** (somente leitura), e não S3 Full Access.

**Resumo para decorar (aula):**
> Usuários = credenciais permanentes · Funções = credenciais temporárias · Root não se compartilha nem se usa no dia a dia · Privilégio mínimo sempre · Grupos contêm usuários, mas **não** outros grupos.

---

## 3. AWS WAF e AWS Shield `[00:59]`

### 3.1 AWS WAF (Web Application Firewall)
- **Protege aplicações web** contra ataques e tráfego HTTP/HTTPS indesejado.
- Atua na **camada 7** (aplicação) do modelo OSI.
- Você define **regras** para permitir ou bloquear tráfego.
- O que faz (palavras-chave):
  - Bloqueia **SQL injection** e **cross-site scripting (XSS)**.
  - **Bloqueia países** / regiões geográficas.
  - **Limita o tamanho** das requisições.
  - **Limita a quantidade de requisições por segundo** (rate limiting).
- Integra com o **CloudFront** (CDN).
- Exemplo: site que vende para o Brasil e começa a receber acessos de outros países ou 50 mil acessos/s em vez de 300/s → o WAF bloqueia.

### 3.2 AWS Shield
- Proteção contra ataques de **negação de serviço distribuído (DDoS)**: milhares de bots tentando derrubar sua aplicação.

| | **Shield Standard** | **Shield Advanced** |
|---|---|---|
| Custo | **Gratuito**, ativo automaticamente em **toda conta** | **Pago** |
| Proteção | Ataques mais comuns, camadas **3 e 4** | Proteção extra e monitoramento avançado |
| Suporte | — | **24 horas por dia, 7 dias por semana**, com acesso à equipe de resposta a DDoS (**DRT**) |
| Protege | — | EC2, balanceadores de carga, CloudFront, Global Accelerator, Route 53 |

**Questões da aula:**
- Empresa com plano **Business Support** precisa de acesso à **equipe de resposta a DDoS (DRT)** → **Shield Advanced**.
- Empresa de entrega de comida precisa **bloquear usuários de certos países** → **AWS WAF**.

---

## 4. Monitoramento e auditoria: CloudWatch × CloudTrail × Config

Os três são **fáceis de confundir**. Guarde a palavra-chave de cada um.

| Serviço | Pergunta que responde | Palavras-chave |
|---|---|---|
| **CloudWatch** | **Como está o desempenho/saúde?** | Observabilidade, **métricas**, logs, **alarmes**, dashboards |
| **CloudTrail** | **Quem fez o quê, quando e de onde?** | Auditoria, conformidade, **chamadas de API**, "o X9" |
| **Config** | **Como está a configuração dos recursos? Mudou?** | Registro e **avaliação de configuração**, checklist de conformidade |

### 4.1 Amazon CloudWatch `[01:12]`
- Serviço de **observabilidade**: coleta, monitora e atua.
- **Coleta** métricas, logs e eventos de recursos, aplicações e servidores, **na nuvem e no on-premises** (nuvem híbrida, com agente instalado).
- Métrica padrão: a cada **5 minutos**. É possível **detalhar para 1 minuto** (com custo extra).
- Exemplos de métrica: **CPU do EC2**, leitura/gravação de disco em **EBS**, tamanho e quantidade de objetos de um bucket S3, execução/duração do Lambda, tráfego de rede.
- **Não monitora memória RAM por padrão**: precisa de ferramenta/agente específico.
- **Monitora** com **dashboards personalizados** e **alarmes** (limite máximo/mínimo, etc.).
- **Atua:** o alarme pode acionar o **SNS** (notificar) ou o **Auto Scaling** (aumentar/diminuir instâncias).
- **Estados do alarme:** **OK**, **ALARME** e **dados insuficientes** (métrica nova ainda coletando dados).
- Nuvens citadas na aula: **pública** (AWS, Azure, Google Cloud, OCI), **privada** e **híbrida**.

### 4.2 AWS CloudTrail `[01:21]`
- Registra **todas as chamadas de API** na conta: tudo na AWS é chamada de API.
- Mostra **quem**, **quando**, **de onde** (IP, navegador, horário). **"Não existe anônimo na nuvem."**
- Uso: **governança, conformidade, auditoria**.
- Exemplos da aula:
  - Apagaram um **bucket S3** com contracheques → CloudTrail mostra quem foi.
  - Uma instância EC2 importante foi excluída → CloudTrail mostra quem, quando e de onde.
- Analogia: a trilha na lama, "você deixa o rastro".
- Diferença: o **CloudWatch** monitora **desempenho e saúde**; o **CloudTrail** registra **ações de usuários e serviços**.

### 4.3 AWS Config `[01:27]`
- Também é de auditoria, mas **específico para configuração de recursos**.
- Funciona com um **checklist (padrão)**: ele compara a configuração real do recurso com o padrão e acusa a diferença.
- Exemplo da aula: o padrão da máquina do setor de logística era T2 micro, 8 GB, Linux, só porta 22. Alguém mudou para outro tipo, 50 GB, instalou outro SO e abriu portas 80 e 443 → o **Config** registra e avalia a mudança.
- Trabalha com o **SNS** para notificar o administrador e **guarda histórico no S3**.
- **Dicas de prova:**
  - O Config é **regional** (não global): se tem recursos em São Paulo e N. Virgínia, configure nas duas regiões.
  - Serve para auditar alterações para **compliance**.

**Questões da aula:**
- Monitorar a **utilização de CPU** das instâncias EC2 → **CloudWatch**.
- Requisito de conformidade: **registrar e avaliar alterações de configuração** (e executar correção) → **AWS Config**.
- Recursos foram **excluídos ontem**; qual serviço ajuda a descobrir **qual usuário** excluiu → **CloudTrail**. (Na transcrição aparece como "Cloud Prey", mas é o CloudTrail.)

---

## 5. AWS Organizations `[01:37]`

- Serviço para **gerenciar múltiplas contas** de forma centralizada. Útil para empresa grande com várias filiais e áreas.
- Há uma **conta principal (master/management)** e as demais contas membro.
- **Global** (diferente do Config, que é regional).

**As duas características que mais caem:**
1. **Faturamento consolidado (consolidated billing)** `[01:39]`: todas as contas geram **uma fatura só**. Também permite compartilhar **descontos por volume e instâncias reservadas** entre as contas.
2. **Políticas de controle de serviços (SCP)** `[01:40]`: restringem o que as contas podem fazer. Aplicadas na **raiz** e **herdadas** pelos níveis abaixo, ou só a certas **unidades organizacionais**.

**Outros pontos:**
- **OUs (unidades organizacionais):** agrupam contas.
- Existe **API para criar contas**, e você cria novas contas **em segundos**.
- Para a prova, o termo costuma vir traduzido: **"faturamento consolidado"** = consolidated billing.

**Questão da aula:** empresa com várias contas precisa de **fatura consolidada** e **gerenciar centralmente segurança e conformidade** → **AWS Organizations**.

---

## 6. AWS Artifact `[01:43]`

- Portal que dá acesso a **documentos de segurança e conformidade** da AWS.
- Os documentos se chamam **artefatos**.
- Exemplos: relatórios e certificações **ISO**, **PCI**, **SOC**; acordos como **BAA** e **HIPAA** (saúde). Tudo útil para **auditorias internas**.
- Cenário: empresa quer migrar para a nuvem e precisa saber se a AWS tem certificados de conformidade para o seu setor (ex.: clínica de saúde/estética, cartão de crédito). Ela consulta o Artifact, baixa e envia ao auditor.
- Palavras-chave: **relatórios, certificações, acreditações, atestados de terceiros**.

**Questão da aula:** "qual serviço fornece relatórios, certificações, acreditações e atestados de terceiros emitidos pela AWS?" → **AWS Artifact**.

---

## 7. AWS Trusted Advisor e planos de suporte `[01:48]`

- O **"conselheiro"**: **só recomenda**, **não executa** nada sozinho.
- Analisa a conta e aconselha em categorias (a aula citou "6"):
  1. **Otimização de custos**, ex.: instância ligada há 3 meses sem uso, numa região que você não usa.
  2. **Desempenho**, ex.: sugere trocar uma instância T2 micro por uma maior.
  3. **Segurança**, ex.: porta 80 aberta no grupo de segurança sem necessidade; chaves de acesso do IAM sem rotação.
  4. **Tolerância a falhas**, ex.: banco RDS em Single-AZ → sugere Multi-AZ.
  5. **Limites de serviço**, ex.: você está perto do limite de EC2 da conta; abra solicitação ao suporte.
  6. **Excelência operacional** (mais recente).
- **Importante:** as verificações disponíveis **dependem do plano de suporte** da conta. **Os planos mais caros dão acesso a mais verificações.** Um aluno disse que caiu pergunta sobre esse quadro de planos.
- **Atenção da aula:** os planos de suporte do material são os **antigos**, mas **ainda caem** nesta versão da prova. A partir de 2027 a certificação deve ser atualizada (o plano Enterprise On-Ramp, por exemplo, já mudou). Confira no guia atual.

**Questão da aula:** empresa precisa verificar **chaves de acesso do IAM que não foram rotacionadas recentemente** → a resposta marcada foi a **letra D**, mas a transcrição não traz as alternativas. **(complemento)** O serviço que faz essa verificação de segurança é o **Trusted Advisor**. **(conferir)** com o material.

---

## 8. Dicas de prova do instrutor

1. **Foco nos serviços core**, aqueles com alta probabilidade de cair. Ele deu quase 100% para: **WAF**, **CAF** (da aula 1), **modelo de responsabilidade compartilhada** e **Well-Architected**.
2. Antes de responder responsabilidade compartilhada, **olhe o quadro** (azul = cliente, laranja = AWS).
3. **Infraestrutura/hardware/instalações físicas → AWS.**
4. Em segurança, **procure a palavra-chave** do enunciado (bloquear países → WAF; quem apagou → CloudTrail; configuração mudou → Config; CPU → CloudWatch; relatórios de conformidade → Artifact).
5. Em **MFA**, **privilégio mínimo** e **root**, a resposta quase sempre é a mais segura.
6. Estude pelo **Guia do Exame** e documentação oficial da AWS.

---

## 9. Avisos da turma `[02:00]`

- **Material e presença:** o Classroom foi atualizado. Registre a **lista de presença** (link no chat).
- O instrutor **ainda vai entregar** o material de **Well-Architected e CAF** (reunidos num documento só), além de quadros, PDF e vídeos das lives. Ele está estudando a melhor forma, porque são várias turmas.
- **Próxima live:** fique atenta ao aviso no Classroom/e-mail.
- Fim do **Domínio 2**.

---

## 10. Checklist de revisão

- [ ] Quadro da responsabilidade compartilhada (AWS × cliente) e a regra "DA nuvem × NA nuvem"
- [ ] IAM: usuário × grupo × função × política (e que grupos não se aninham)
- [ ] Root: não compartilhar e não usar no dia a dia · MFA · privilégio mínimo
- [ ] Autenticação × autorização
- [ ] WAF (camada 7, SQL injection, XSS, bloqueio de país, rate limit) × Shield
- [ ] Shield Standard (grátis, camadas 3 e 4) × Shield Advanced (pago, 24/7, DRT)
- [ ] CloudWatch × CloudTrail × Config (uma palavra-chave para cada um)
- [ ] Config é **regional** · Organizations é **global**
- [ ] Organizations: faturamento consolidado + SCP + OUs
- [ ] Artifact = documentos de conformidade (ISO, PCI, SOC)
- [ ] Trusted Advisor: só recomenda · categorias · depende do plano de suporte
