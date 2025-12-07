# Arquitetura da Solução – Auto-Generated Blog (AWS + Docker)

## DM

![DM](architecture/DM-Auto_Generated_Blog.png)

>Central entity: `Article`  
>Main fields:
>- id, title, text, date
>>Persistence in PostgreSQL 

## UCD

![UCD](architecture/UCD-Use_Case_Diagram.png)

>Main actors and functionalities:
>>- Anonymous user: view article list and full article content
>>- Anonymous user: manually trigger generation of a new AI article
>>- System (automated): generate 1 new article per day via AI


## Vista Lógica

#### Vista Lógica N1

![VLN1](architecture/Vista_Logica/VLN1-Logic_View_Level_1.png)

>High-level layered architecture of the Auto-Generated Blog solution.

#### Vista Lógica N2

![VLN2](architecture/Vista_Logica/VLN2-Logic_View_Level_2.png)

>Detailed layered architecture:
>>- Frontend: React
>>- Backend: Node.js
>>- Persistence: PostgreSQL
>>- External Service: HuggingFace Inference API
## Vista Fisica

#### Vista Fisica N2
 
![VFN2](architecture/Vista_Fisica/VFN2-Auto_Generated_Blog.png)

> Current deployment 1x EC2  (free-tier)
>>   - `frontend` → React static build  
>>   - `backend` → Node.js + PostgreSQL client
>>   - `db` → Postgres 15

# Vista de Processo
### Vista de Processo de Nivel 1

>Sendo que todas as Vista  de processo serao semelhantes a esta so a representamos uma vez 

![VPN1](architecture/Vista_Processo/VPN1.svg)

### Vista de Processo de Nivel 2
##### Vista de Processo de Nivel 2 US15

>Vista de Processo de nivel 2 da User Story 015 "As a Librarian i want to lend a book to a reader."

![VPN2](architecture/Vista_Processo/VPN2US15.svg)
######  Vistas de Processo NV3 da US15

>Vista de Processo de nivel 3 da User Story 015 "As a Librarian i want to lend a book to a reader."

![VPN3](architecture/Vista_Processo/VPN3US15.svg)
##### Vista de Processo de Nivel 2 US011

>Vista de Processo de nivel 2 da User Story 011 "As a Anonymous i want to register as a reader."

![VPN2](architecture/Vista_Processo/VPN2US11.svg)

##### Vistas de Processo US04

>User Story 04 "As a Librarian I want to update an author’s data."

######  Vistas de Processo NV2 da US04

![VPN2](architecture/Vista_Processo/VPN2US04.svg)

######  Vistas de Processo NV3 da US04



![VPN3US04](architecture/Vista_Processo/VPN3US04.svg)

