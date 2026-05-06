# Spec — Section Annales BTS SIO

## Objectif

Ajouter une section "Annales" à BTSSIO.DEV permettant aux étudiants de consulter les anciens sujets d'examen BTS SIO (2019–2024) par épreuve et spécialité, avec corrections indicatives reformulées et liens vers les PDFs officiels.

---

## Périmètre

### Épreuves couvertes
- **E4** — Support et mise à disposition de services informatiques (tronc commun)
- **E5 SISR** — Administration des systèmes et des réseaux
- **E5 SLAM** — Conception et développement d'applications
- **E6** — Cybersécurité des services informatiques (SISR + SLAM)
- **Tronc Commun** — CGE, Mathématiques, Anglais

### Années : 2019, 2020, 2021, 2022, 2023, 2024

### Contenu de chaque annale
- Lien PDF officiel (Eduscol / banque nationale de sujets)
- Questions reformulées (pas copiées mot pour mot — reformulation pédagogique)
- Correction indicative par question (accordéon dépliable)
- Thèmes principaux abordés (badges)

---

## Architecture

### Nouvelles routes
| Route | Type | Description |
|-------|------|-------------|
| `/annales` | Client page | Liste filtrée de toutes les annales |
| `/annales/[id]` | Server page | Détail d'un sujet : questions + corrections |

### Fichiers à créer
```
lib/annales-data.ts          — données structurées de toutes les annales
app/annales/page.tsx         — page liste avec filtres
app/annales/[id]/page.tsx    — page détail sujet + correction
components/AnnaleCard.tsx    — card résumé (liste)
components/AnnaleFilter.tsx  — filtres année/épreuve/option (client)
```

### Fichiers à modifier
```
app/examens/page.tsx         — ajouter widget "Annales récentes" (6 dernières)
components/Navbar.tsx        — ajouter lien "Annales"
```

---

## Structure des données (`lib/annales-data.ts`)

```typescript
export interface Annale {
  id: string;                          // ex: "e4-2024"
  year: number;                        // 2019..2024
  epreuve: "E4" | "E5" | "E6" | "TC"; // TC = Tronc Commun
  option: "SISR" | "SLAM" | "Commun"; // Commun = toutes options
  title: string;                       // ex: "E4 2024 — Support et mise à disposition"
  themes: string[];                    // ex: ["Gestion des incidents", "ITIL", "GLPI"]
  pdfUrl: string;                      // lien Eduscol ou banque nationale sujets
  questions: AnnaleQuestion[];
}

export interface AnnaleQuestion {
  id: string;                // ex: "e4-2024-q1"
  numero: string;            // ex: "Question 1"
  intitule: string;          // question reformulée
  bareme: number;            // points (ex: 4)
  correction: string;        // corrigé indicatif (markdown)
}
```

Toutes les annales exportées dans `export const annales: Annale[]`.

---

## Page `/annales`

**Client component** avec :
- En-tête : titre + description
- `AnnaleFilter` : filtres par année (2019–2024), épreuve (E4/E5/E6/TC), option (SISR/SLAM/Commun)
- Grille de `AnnaleCard` filtrés dynamiquement côté client
- Compteur : "X sujets trouvés"

### `AnnaleCard`
- Badge épreuve (couleur par épreuve)
- Badge option (bleu/vert SISR, violet/orange SLAM, gris commun)
- Année en grand
- Liste des thèmes (3 max + "...")
- Bouton "📄 PDF officiel" (lien externe, target="_blank")
- Bouton "Réviser →" (lien interne vers `/annales/[id]`)

---

## Page `/annales/[id]`

**Server component** avec metadata dynamique.

Structure :
1. Breadcrumb : Accueil > Annales > E4 2024
2. En-tête : titre, année, option badges, lien PDF
3. Thèmes couverts (badges)
4. Liste des questions :
   - Intitulé reformulé
   - Barème
   - Accordéon "Voir la correction" → correction indicative (markdown rendu)

---

## Widget dans `/examens`

Section "📋 Annales récentes" ajoutée à la fin de la page `/examens` :
- 6 cards les plus récentes (tri par année desc)
- Lien "Voir toutes les annales →" vers `/annales`

---

## Navbar

Ajout du lien `{ label: "Annales", href: "/annales" }` dans `navLinks`, après "Examens".

---

## Contenu des annales

Les questions sont **reformulées** (pas reproduites mot pour mot) sur la base du référentiel BTS SIO et des types de questions typiques par épreuve. Chaque correction est indicative et pédagogique.

### E4 (tronc commun) — thèmes récurrents
Gestion des incidents (ITIL), déploiement de postes, GLPI, rédaction de procédures, infrastructure réseau de base.

### E5 SISR — thèmes récurrents
Topologie réseau, adressage IP / sous-réseaux, routage OSPF, VLAN, Windows Server AD/DNS/DHCP, Linux services, haute disponibilité.

### E5 SLAM — thèmes récurrents
Modélisation BDD (MCD/MLD), requêtes SQL avancées, POO PHP/Java, architecture MVC, API REST, tests unitaires.

### E6 — thèmes récurrents
Analyse de risques, PSSI, failles OWASP, sécurisation Linux/Windows, VPN, chiffrement, RGPD, PRA/PCA.

### Tronc Commun
- CGE : synthèse de documents, écriture personnelle
- Mathématiques : graphes, cryptographie, probabilités, suites
- Anglais : compréhension de document technique, expression

---

## Contraintes

- Pas de reproduction verbatim des sujets officiels — reformulation obligatoire
- Les liens PDF pointent vers les sources officielles (Eduscol / banque nationale)
- Corrections marquées "Corrigé indicatif — non officiel"
- 0 erreurs TypeScript, 0 erreurs ESLint

---

## Non-inclus (hors périmètre)

- Téléchargement / hébergement des PDFs sur le serveur (liens externes uniquement)
- Système de notation ou de soumission de réponses
- Commentaires ou forum par sujet
