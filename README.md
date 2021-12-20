# OpenClassrooms - Projet n°6 - Piiquante

Réalisation d'une API pour Piiquante. Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes.

## Exigences de sécurité

- Le mot de passe de l'utilisateur doit être hashé
- L'authentification doit être renforcée sur toutes les routes sauce requises
- Les emails dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs
- La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur
- Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données.
- Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés.
- Le contenu du dossier images ne doit pas être téléchargé sur GitHub.


## API Reference

#### Signup and Login
```http
  POST /api/auth/signup
  POST /api/auth/login
```

#### Get one sauce
```http
  GET /api/sauces/:id
```

#### Get all sauces
```http
  GET /api/sauces
```

#### Create a sauce
```http
  POST /api/sauces
```

#### Modify a sauce
```http
  PUT /api/sauces/:id
```

#### Delete a sauce
```http
  DELETE /api/sauces/:id
```

#### Like or dislike a sauce
```http
  POST /api/sauces/:id/like
```


## Installation

Backend (Node-Express-MongoDB)
```bash
  cd back
  npm install
  nodemon index
```

Frontend (Angular)
```bash
  cd front
  npm install
  npm run start
```
    
