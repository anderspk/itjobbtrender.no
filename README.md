# ITJobbtrender 💪💪💪

ITJobbtrender er en nettjeneste som søker gjennom de nye IT-jobbannonsene på Finn.no hver dag, og teller hvor mange av de nevner visse nøkkelord.

[Live side](https://itjobbtrender.web.app/)

Nøkkelordene kommer fra en liste som alle kan bidra til.
[Listen finner du her](https://github.com/anderspk/itjobbtrender/blob/master/functions/keywordsList.txt)

Obs! Vennligst legg merke til de to retningslinjene for å utvide nøkkelord-listen:

1. Nøkkelord skal være i alfabetisk rekkefølge
2. Dersom du vil legge til varianter av et nøkkelord så må du følge dette formatet:
```nøkkelord == variant || variant || variant...``` der `nøkkelord` er "hovedvarianten" som også vises i frontenden og brukes til søk.
Husk også å inkludere "hovedvarianten" som en `variant`

👨‍💻👩‍💻👨‍💻👩‍💻👨‍💻👩‍💻👨‍💻👩‍💻👨‍💻👩‍💻

## Frontend

Frontenden er bygget i React og ligger i /src mappen.

## Backend

Backenden er en "scheduled" Cloud Function ligger i /functions mappen.
Funksjonen kjøres kl 10 hver morgen, og finner alle Finn.no it-annonsene som ble lagt ut for "1 dag siden". Disse blir da brukt som utgangspunkt for å finne hvilke nøkkelord blir nevnt.

##CI/CD

Hver gang en ny commit pushes inn i master-branchen kjøres en build i Google Cloud Platform via Cloud Build. Dette tar ca 3 minutter.
