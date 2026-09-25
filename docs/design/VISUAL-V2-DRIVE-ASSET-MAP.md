# Visual V2 — Google Drive Asset Map

**Source folder:** `12q5_LJcTQt8GJW9HO2OpndfetaqE8Slf`  
**Validated:** 2026-09-25  
**Role:** canonical creative-reference source for Visual V2 until production binaries are copied into the repository.

## Primary references

| Role | Drive file | File ID |
|---|---|---|
| Public home wide | Maquete_Site_PaginadeChegada.png | `1dVGyDVnn-u27C40kpMcKdrtUT9Dq2jr4` |
| Command Center | Maquete_Dasboard.png | `1qcxfNQcQjyjseI49AvuekOQT6RGPqjWk` |
| Team banner | Banner_Equipe.png | `1s4pcINTT40mZaQuE-ZmlqqtGb6x68PBK` |
| Community cover | Cover_GrupoFacebook.png | `1WwYdyvvntn2TTnfEAXTNcfCKK6FGpB0i` |
| LinkedIn cover | Cover_Linkdin.png | `1RaETZSOWAmWP4vMK9p1T5oC1KbUa2G1-` |
| Entry/onboarding banner | Banner_Entrada.png | `1U3kvzypXo-RiQJTnyjl0oVYo6y22yOPO` |
| X/favicon master | Logo_Favicon.png | `1-2V4W8my9L6ycL0QMatZhgu8njbosaUi` |

## Sara approved set

| Role | Drive file | File ID |
|---|---|---|
| Welcome banner | Sara_Banner_Bem-Vindos.png | `1c5Bb2KgNtKYR1AuVwUxZH6NJAqnRNLj3` |
| Reception portrait | Sara_Receçao001.png | `1VTLv7G2bUchKFHsBG8QHbkgkk-061IXt` |
| Waiting-room portrait | Sara_SaladeEspera.png | `1O-Ko_QqJGSCmcybTnrCz9OwPfnfZis8X` |
| Receiving member | Sara_Recebeumaluno.png | `1zvEEwa6dwkvLeO-xinhYpcVbyXGE9ZJs` |
| Profile/avatar | Sara_PerfilRedondo.png | `1tSbenNZPt-6AYSlWKL91Xw5Z4r9R9kwE` |
| Social creative 001 | Pack_Pub_Sara001.png | `1S-L7UgsHzMcmXN5mPFBYes8I3KWix3YY` |

## Additional social/creative set

- PackPub002.png — `12tnE18iebUP2eqJ4-Wo7uXMoek1TvIh-`
- PackPub003.png — `1uhyO5xwzS8qdbq29JY5eoMdyfuw_aPPB`
- PackPub004.png — `1JwhQK8vL32u4TsTdM7gszaXlXCrW5ag3`
- PackPub005.png — `1W-eqc4H2-8Qwrdt4mOkqCkZAJNFKJ6a_`
- PackPub006.png — `1hBMO_wl1WU4S-Pdsi9-tqV0k697x0k_o`

## Production policy

Google Drive is accepted as the **reference/source repository** for the validated creative assets.

For final production UI, preferred order is:

1. copy approved binaries into `public/media/v2/`; or
2. move them to an approved production CDN/storage layer.

Do not depend indefinitely on Google Drive share URLs as critical website assets because permissions, redirects, caching and image optimization are outside the application contract.

## Current implementation rule

The Visual V2 branch may proceed using these files as visual references immediately.

Before production merge, required assets used by the UI must have a stable production path.
