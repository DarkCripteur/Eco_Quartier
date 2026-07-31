#  EcoQuartier

Site vitrine d'**EcoQuartier**, association fictive d'écologie urbaine à l'échelle d'un quartier (jardins partagés, compostage collectif, ateliers zéro-déchet, mobilité douce).

Projet réalisé dans le cadre du module *Versioning* — ESITEC Licence 1 Génie Informatique. ceux ci est ume odification de test 

##  Objectif du site

- Présenter l'association et sa mission
- Mettre en valeur les actions et projets en cours
- Permettre l'inscription des bénévoles via un formulaire
- Donner envie de s'engager localement

##  Structure du projet

```
ecoquartier/
├── index.html         # Accueil : présentation, chiffres clés animés, CTA
├── about.html          # À propos : histoire, mission, valeurs de l'association
├── projets.html         # Liste des actions (filtres par catégorie) + agenda des événements
├── contact.html          # Formulaire de bénévolat / contact avec validation
├── style.css              # Feuille de style commune (design system)
├── script.js               # Interactions JavaScript
├── README.md
└── .gitignore
```

## Identité visuelle

>  **Écart avec le cahier des charges.** Le sujet impose une palette verte/beige nature. Sur demande explicite, le site utilise désormais un thème sombre à accent violet (ci-dessous). Si l'évaluation porte sur le respect strict de la palette imposée, revenir à la version verte/beige avant rendu (voir historique Git) ou le signaler à l'enseignant.

| Usage | Couleur | Code |
|---|---|---|
| Violet principal | Accent / boutons | `#8b5cf6` |
| Violet clair | Hover / texte accent | `#a78bfa` |
| Violet foncé | Fonds (footer, stats) | `#4c1d95` |
| Fond de page | Anthracite quasi-noir | `#0d1117` |
| Fond des cartes | Anthracite | `#161b22` |
| Texte principal | Gris clair | `#e6e6e6` |
| Alerte / erreur formulaire | Rouge corail | `#ff6b57` |

Typographie : **Poppins** (titres) / **Nunito** (texte courant).

Deux composants de bouton réutilisables (`.btn-primary`, `.btn-outline`), avec états normal, hover, active, focus clavier et disabled.

### Effets additionnels

- **Orbe qui suit le curseur** (`#cursor-glow`) : halo violet en fondu qui suit le pointeur avec un effet d'inertie, désactivé sur tactile et si `prefers-reduced-motion` est activé.
- **Apparition au scroll** (`.reveal`) : titres et blocs clés apparaissent en fondu + léger décalage vertical via `IntersectionObserver`.
- **Bordure de carte qui se dessine** : les carte (`.card`, `.event-card`, `.form-card`) affichent un contour pointillé qui se trace progressivement à l'apparition.

##  Fonctionnalités JavaScript

| Interaction | Description | Page |
|---|---|---|
| Menu responsive | Le bouton burger ouvre/ferme la navigation sur mobile | Toutes les pages |
| Compteur animé | Les chiffres clés s'incrémentent au chargement (via `IntersectionObserver`) | `index.html` |
| Filtre de projets | Boutons filtres (Tous, Jardins, Compost, Ateliers, Mobilité) qui affichent/masquent les cartes | `projets.html` |
| Compteur animé | Fondation, bénévoles, jardins créés, ateliers/an | `about.html` |
| Validation de formulaire | Le bouton "Envoyer" reste désactivé tant que le formulaire n'est pas valide ; messages d'erreur par champ | `contact.html` |

## Lancer le site

Aucune dépendance ni build : ouvrez simplement `index.html` dans un navigateur, ou servez le dossier avec un petit serveur statique, par exemple :

```bash
npx serve .
# ou
python -m http.server 8000
```

## Répartition du travail (binôme)

| Membre Fustel | Membre Chriss|
|---|---|
| `index.html` + navigation globale | `projets.html` (actions + agenda) |
| `script.js` : menu responsive, compteur animé | `script.js` : filtre de projets, validation formulaire |
| Structure HTML globale + `about.html` | `contact.html` |
| CSS des boutons (`.btn-primary`) | CSS responsive / mise en page |
| — | `README.md` |

*(à adapter selon la répartition réelle retenue par le binôme)*

## Workflow Git

- Développement sur des branches `feature/prenom` (minimum 5 commits par personne)
- Deux conflits volontaires à résoudre (CSS et README) lors de la synchronisation
- Fusion finale propre dans `main`, historique vérifiable avec :

```bash
git log --graph --all --oneline
```

## Contraintes techniques couvertes

- [x] 4 pages HTML minimum, reliées par une navigation fonctionnelle
- [x] 1 fichier CSS commun
- [x] 1 fichier JS avec plusieurs fonctionnalités interactives
- [x] README.md complet
- [x] `.gitignore` avec `.env` et `*.log`
- [ ] Développement sur branches `feature/prenom` (à faire par le binôme)
- [ ] 2 conflits Git volontaires résolus (à faire par le binôme)
- [ ] Fusion finale dans `main` (à faire par le binôme)
