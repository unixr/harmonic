# harmonic 
HARMONIC - VIS Cybersecurity Dashboard 
**Versão:** 1.0  
**Data da Última Atualização:** 6 de outubro de 2025  

> **Aviso de Licença**  
> Este programa é software livre: você pode redistribuí-lo e/ou modificá-lo sob os termos da **Licença Pública Geral GNU**, conforme publicada pela **Free Software Foundation**, versão 3 da Licença, ou (a seu critério) qualquer versão posterior.  
>
> Este programa é distribuído na esperança de que seja útil, mas **SEM QUALQUER GARANTIA**; sem mesmo a garantia implícita de **COMERCIABILIDADE** ou **ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO**.  
> Consulte a **Licença Pública Geral GNU** para mais detalhes.  
>
> Você deve ter recebido uma cópia da **Licença Pública Geral GNU** junto com este programa.  
> Caso contrário, consulte: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)  

---

## Visão Geral  

Bem-vindo ao **HARMONIC**. Estes termos e condições definem as regras para o uso da nossa ferramenta computacional.  
Ao utilizar o HARMONIC, você concorda integralmente com estes termos. Caso discorde de qualquer parte, não utilize a ferramenta.  

O **HARMONIC** é disponibilizado sob a **Licença Pública Geral GNU, versão 3 (GNU General Public License v3.0)**.  

---

## 1. Licença de Uso  

O HARMONIC está licenciado sob a **GNU General Public License v3.0 (GPLv3)**.  
Isso significa que você tem a liberdade de:  

- **Executar** o programa para qualquer propósito.  
- **Estudar** como o programa funciona e adaptá-lo às suas necessidades.  
- **Redistribuir** cópias para ajudar outras pessoas.  
- **Melhorar** o programa e liberar suas modificações ao público.  

Desde que você siga os seguintes termos:  

- **Manter a mesma licença:** Qualquer redistribuição ou trabalho derivado do HARMONIC deve ser licenciado também sob a GNU GPL v3.0.  
- **Disponibilizar o código-fonte:** Se você distribuir cópias modificadas do HARMONIC, deve disponibilizar o código-fonte correspondente.  
- **Preservar avisos de direitos autorais:** Todos os avisos de copyright e a referência à licença original devem ser mantidos.  
- **Sem garantias:** O software é fornecido “como está”, sem garantias.  

 **Leia a licença completa:**  
[https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)  

---

### 1.1. Atribuição e Créditos  

Ao utilizar, modificar ou redistribuir o HARMONIC, ou qualquer trabalho derivado, inclua o seguinte aviso:  

> “Este trabalho utiliza a ferramenta computacional **HARMONIC 1.0**, desenvolvida por **Ricardo Conde Camillo Silva/UNESP** e **Kelton Augusto Pontara da Costa/UNESP**, licenciada sob a **GNU General Public License v3.0**.”

---

## 2. Isenção de Garantia  

O **HARMONIC** é fornecido **“COMO ESTÁ”**, sem qualquer tipo de garantia, expressa ou implícita.  
Isso inclui, mas não se limita a, garantias de comercialização, adequação a um propósito específico e não violação de direitos de terceiros.  

Os desenvolvedores e contribuidores **não garantem** que a ferramenta atenderá às suas necessidades, que seu funcionamento será ininterrupto ou livre de erros, ou que quaisquer defeitos serão corrigidos.  
Todo o risco relacionado à qualidade e ao desempenho da ferramenta é assumido por você.  

---

## 3. Limitação de Responsabilidade  

Em nenhuma circunstância, os autores, detentores dos direitos autorais ou contribuidores do HARMONIC serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, exemplares ou consequenciais (incluindo, mas não se limitando a, aquisição de bens ou serviços substitutos; perda de uso, dados ou lucros; ou interrupção de negócios), sob qualquer teoria de responsabilidade — seja contratual, objetiva ou extracontratual — decorrentes do uso desta ferramenta, mesmo que avisados da possibilidade de tais danos.  

---

## 4. Uso da Ferramenta  

Você concorda em **não utilizar** o HARMONIC para qualquer finalidade ilegal, difamatória ou que infrinja direitos de terceiros.  
Você é o único responsável pelos resultados obtidos com o uso da ferramenta e por quaisquer dados processados com ela.  

---

## 5. Modificações nos Termos  

Os desenvolvedores do HARMONIC reservam-se o direito de modificar estes termos e condições a qualquer momento.  
É sua responsabilidade verificar periodicamente se há alterações.  
O uso continuado da ferramenta após a publicação de alterações constitui aceitação dos novos termos.  

---

## 6. Contato  

Para mais informações, dúvidas ou para reportar problemas, entre em contato:  
**unixconde@gmail.com**  

---

# Utilização  

A ferramenta **HARMONIC**, em sua primeira versão, está dimensionada para a **comparação de resultados de treinamentos de redes neurais** entre dois experimentos que contemplem **8 classes**.  

Experimentos com número diferente de classes **demandarão refatoração no código** por parte do usuário — o que é permitido e incentivado sob a **GNU GPL v3.0**, desde que as modificações também sejam distribuídas sob a mesma licença.  

---

## 1. Estrutura dos Arquivos CSVs  

O HARMONIC realiza comparações entre resultados obtidos de dois modelos de redes neurais, salvos em arquivos CSV, independentemente da arquitetura das redes.  

Os arquivos devem seguir as seguintes convenções:  

- `Model1_Results.csv` e `Model2_Results.csv`: resultados das métricas de cada modelo.  
- `Model1_Logits.csv` e `Model2_Logits.csv`: resultados brutos dos **logits** de cada modelo.  

---

## 2. Estrutura dos Arquivos `Model1_Results.csv` e `Model2_Results.csv`  

Epoch   Phase   Loss   Accuracy   Precision   Recall   AUC   MSE   Confusion Matrix

---

## 3. Estrutura dos Arquivos `Model1_Logits.csv` e `Model2_Logits.csv`

Epoch   Phase   Target   logit_0   logit_1   logit_2   logit_3   logit_4   logit_5   logit_6   logit_7

---

## 4. Execução da Ferramenta

A ferramenta pode ser executada em um servidor Apache ou no Visual Studio Code com a extensão Live Server.

---

## 5. Funcionalidades Interativas

O dashboard do HARMONIC foi projetado para oferecer uma análise dinâmica e focada dos resultados.

 Gráficos Interativos

Os gráficos Accuracy per Epoch, Loss per Epoch e o gráfico Radar são interativos.
Para isolar a visualização e analisar o comportamento de um modelo ou fase específica (Treino/Validação), basta clicar na legenda correspondente.
Um novo clique retorna à visualização completa.

Visualização de Logits

Como os arquivos de logits podem conter milhares de registros, a ferramenta otimiza a exibição para garantir bom desempenho.
A cada carregamento, o painel exibe automaticamente 7 exemplos aleatórios de cada modelo.

Para visualizar novas amostras, basta recarregar a página (pressionando F5).
Novos logits serão sorteados e exibidos no dashboard.

---

Licença

© 2025 Ricardo Conde Camillo Silva / Kelton Augusto Pontara da Costa – UNESP
Licenciado sob a GNU General Public License v3.0 (GPLv3)
Consulte o arquivo LICENSE  para a versão oficial em inglês ou LICENSE_pt_BR  para a tradução não oficial em português.
Consulte também: https://www.gnu.org/licenses/gpl-3.0.html

