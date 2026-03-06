# 🌱 HydroTrack

HydroTrack est une plateforme IoT permettant de surveiller l'humidité du sol et d'assister l'utilisateur dans l'arrosage manuel grâce à des notifications intelligentes.

Ce projet a été réalisé dans le cadre d'un **projet transversal EPSI B1** afin de démontrer la mise en place d'une **architecture IoT complète** combinant capteurs, backend et interface web.

---

# 🎯 Objectif du projet

L'objectif de HydroTrack est de :

- surveiller l'humidité du sol en temps réel
- analyser les données météorologiques
- informer l'utilisateur quand il doit arroser
- éviter d'arroser inutilement lorsqu'il pleut

Le système repose sur un capteur d'humidité connecté à un **ESP32** qui envoie les données vers une plateforme web.

---

# 🧠 Architecture du projet

Le projet suit une architecture IoT simple :
Capteur humidité
↓
ESP32
↓
Node-RED (API + logique)
↓
OpenWeather API
↓
Supabase (base de données)
↓
Application Web HydroTrack

### Composants

| Composant | Rôle |
|-----------|------|
ESP32 | Lecture du capteur d'humidité
Node-RED | Traitement des données et logique métier
Supabase | Base de données (historique des mesures)
OpenWeather | Données météo en temps réel
Frontend Web | Interface utilisateur

---

# 📱 Fonctionnalités principales

HydroTrack permet de :

### 📊 Dashboard
- affichage de l'humidité actuelle
- affichage de la météo
- affichage du statut d'arrosage

### 📈 Historique
- consultation des mesures précédentes
- suivi de l'évolution de l'humidité du sol

### ⚙️ Paramètres
- modification du seuil d'humidité
- activation / désactivation des notifications

### 👤 Compte utilisateur
- gestion du profil
- configuration du terrain

---

# 🚦 Logique d'alerte

HydroTrack utilise une logique simple basée sur **3 états** :

| État | Condition |
|-----|----------|
🟢 Humidité correcte | humidité ≥ seuil
🔴 Temps d'arroser | humidité < seuil ET pas de pluie
🌧️ Pluie détectée | humidité < seuil ET pluie

Cette logique est traitée côté **Node-RED**.

---

# 🗄️ Base de données

La base de données Supabase contient deux tables principales.

### Table `utilisateurs`

| Champ | Description |
|------|-------------|
id | identifiant utilisateur
nom_utilisateur | nom du compte
mot_de_passe | mot de passe
superficie | surface du terrain
ville | localisation
frequence | mode d'arrosage
created_at | date de création

### Table `mesures`

| Champ | Description |
|------|-------------|
id | identifiant mesure
user_id | utilisateur lié
humidite | taux d'humidité
meteo_main | météo (Rain, Clear...)
alerte | statut d'alerte
created_at | date de la mesure

---

# 📡 API

Le backend expose plusieurs endpoints :

| Méthode | Route | Description |
|--------|------|-------------|
POST | /hydrotrack/data | réception données ESP32
GET | /hydrotrack/latest | dernière mesure
GET | /hydrotrack/history | historique
GET | /hydrotrack/user | données utilisateur
PUT | /hydrotrack/user | modification paramètres

---

# 🧰 Technologies utilisées

Frontend :

- HTML5
- CSS3
- JavaScript

Backend :

- Node-RED

Base de données :

- Supabase (PostgreSQL)

IoT :

- ESP32
- Capteur d'humidité du sol

API externe :

- OpenWeather API

---

# 📂 Structure du projet
hydrotrack-PT
IMG/
images du projet
Style/
app.css
index.css
app.html
app.js
bdd.php
connexion.html
inscription.html
index.html
script.js
README.md

---

# 🚀 Installation

1. Cloner le projet
git clone https://github.com/votre-repository/hydrotrack.git

2. Lancer un serveur local

exemple :
live-server

ou
python -m http.server

3. Configurer :

- Supabase
- Node-RED
- API OpenWeather

---

# 🧪 Tests

Scénarios testés :

| Test | Résultat attendu |
|----|----|
Humidité >= seuil | statut OK
Humidité < seuil | alerte arrosage
Humidité < seuil + pluie | arrosage suspendu
notifications désactivées | aucune alerte

---

# 📷 Démonstration

HydroTrack est conçu pour fonctionner sur **mobile uniquement** afin de simuler une application utilisateur terrain.

---

# 📚 Contexte académique

Projet réalisé dans le cadre de la formation :

**EPSI – Bachelor Informatique (B1)**

Objectif pédagogique :

- comprendre l'architecture IoT
- manipuler des API
- concevoir une application web
- intégrer capteurs et backend

---

# 👨‍💻 Auteur

Adel Redjemi  
Étudiant en informatique – EPSI Paris

---

# 🔮 Évolutions possibles

Améliorations envisagées :

- arrosage automatique
- notifications push mobile
- gestion multi-parcelles
- analyse prédictive
- application mobile native

---

# 📜 Licence

Projet académique réalisé dans le cadre d'un travail étudiant.

## Membres du groupe :
- Adel REDJEMI
- Dany BREL
- Amadou TALL
- ULLOA Ilian