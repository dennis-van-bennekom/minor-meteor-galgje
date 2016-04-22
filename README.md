# Meteor Galgje

Voor de eindopdracht van het vak Real Time Web heb ik galgje gemaakt in Meteor. In mijn applicatie is het mogelijk om spelers die online zijn op de site uit te dagen voor een potje galgje. Het enige wat de gebruiker hoeft te doen is een woord invullen en op de challenge button klikken. Beide spelers worden dan naar het spel scherm gebracht waar de uitgedaagte speler letters kan gokken. Als hij of zij tien keer een verkeerde letter heeft geraden dan wint de uitdager. Lukt het wel om het woord te raden dan wint de uitgedaagte speler.

## Features
- Users met online status.
- Games collection, hierin wordt de state van de games bijgehouden, zoals hoeveel kansen er over zijn en welke spelers er in die game zitten.
- [Meteor User Status](https://github.com/mizzao/meteor-user-status), met deze package wordt er een `online` field toegevoegd aan de user collection die aangeeft of deze gebruiker op het moment op de site is. Dit gebruik ik om de lijst met online gebruikers te laten zien.
- [React](https://facebook.github.io/react/), ik heb react gebruikt in plaats van Blaze voor de views, omdat ik hier goede dingen van had gehoord en het gewoon een keer wou uitproberen. Dit werkte erg fijn en vrij simpel. Ik heb de [Meteor React tutorial](https://www.meteor.com/tutorials/react/creating-an-app) op de Meteor site gebruikt om te kijken hoe het combineren van deze twee frameworks werkt.

## Future plans
- Styling (css).
- Checken of een woord echt bestaat.
- Notificatie als je uitgedaagd wordt.
- Score bijhouden (stats).
