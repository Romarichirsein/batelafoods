# Batela Foods — Application Web

> Application Next.js 14 production-ready pour **Batela Foods**, entreprise alimentaire camerounaise.
> Design neon premium adapté des maquettes Google Stitch.

## Stack Technique

| Outil | Rôle |
|---|---|
| **Next.js 14** (App Router) | Framework React SSR/SSG |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles utilitaires |
| **shadcn/ui** | Composants UI accessibles |
| **next-intl** | Internationalisation FR/EN |
| **next-themes** | Thème Dark/Light |
| **Sanity.io** | CMS headless |
| **React Hook Form + Zod** | Formulaires validés |
| **Embla Carousel** | Carousel produits |

---

## 🚀 Démarrage Rapide

### 1. Cloner et Installer

```bash
# Installer les dépendances Next.js
npm install

# Ou avec pnpm
pnpm install
```

### 2. Variables d'environnement

```bash
# Copier le fichier exemple
cp .env.local.example .env.local
```

Ouvrez `.env.local` et remplissez :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=votre_token_api
SANITY_STUDIO_PROJECT_ID=votre_project_id
SANITY_STUDIO_DATASET=production
```

#### Obtenir les identifiants Sanity

1. Créez un compte sur [sanity.io](https://www.sanity.io) (gratuit)
2. Créez un nouveau projet → nommez-le "Batela Foods"
3. Copiez le **Project ID** affiché
4. Allez dans **API** → **Tokens** → **Add API token**
   - Nom: `Seed Token`
   - Permissions: `Editor`
5. Copiez le token dans `SANITY_API_TOKEN`

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).
→ Redirection automatique vers `/fr`

### 4. Ajouter des produits de démo (seed)

```bash
npm run seed
```

Insère 6 produits exemple dans Sanity. Vous verrez les confirmations dans le terminal.

### 5. Lancer Sanity Studio

Le Studio est le dashboard CMS pour gérer les produits depuis une interface graphique.

```bash
cd studio
npm install
npm run dev
```

Ouvrez [http://localhost:3333](http://localhost:3333).

> ⚠️ Créez un fichier `studio/.env` avec :
> ```
> SANITY_STUDIO_PROJECT_ID=votre_project_id
> SANITY_STUDIO_DATASET=production
> ```

---

## 📁 Structure du Projet

```
batela-foods/
├── app/
│   ├── layout.tsx              # Root layout (fonts)
│   ├── globals.css             # CSS global + tokens neon
│   └── [locale]/
│       ├── layout.tsx          # Locale layout (i18n + theme)
│       ├── page.tsx            # Page d'accueil
│       ├── contact/
│       │   └── page.tsx        # Page de contact
│       └── products/
│           └── [slug]/
│               └── page.tsx    # Détail produit
├── components/
│   ├── layout/                 # Navbar, Footer, toggles
│   ├── sections/               # Hero, ProductGrid, DeliveryStrip, WholesaleTeaser
│   ├── products/               # QuantitySelector, RelatedCarousel
│   ├── contact/                # ContactForm
│   └── providers/              # ThemeProvider
├── lib/
│   ├── sanity/
│   │   ├── client.ts           # Client Sanity + imageUrlBuilder
│   │   ├── queries.ts          # Requêtes GROQ
│   │   └── types.ts            # Types TypeScript Sanity
│   └── utils.ts                # cn(), formatPrice()
├── i18n/
│   ├── request.ts              # Config next-intl serveur
│   └── routing.ts              # Locales: fr (défaut), en
├── messages/
│   ├── fr.json                 # Traductions françaises
│   └── en.json                 # Traductions anglaises
├── middleware.ts               # Routing i18n (next-intl)
├── sanity/
│   └── seed.ts                 # Script de seed (6 produits)
├── studio/                     # Sanity Studio
│   ├── sanity.config.ts
│   ├── package.json
│   └── schemas/
│       ├── product.ts          # Schéma produit (localisé)
│       └── index.ts
├── tailwind.config.ts          # Tokens brand Batela
├── next.config.ts
└── .env.local.example
```

---

## 🎨 Brand & Design

| Token | Valeur | Usage |
|---|---|---|
| `--neon-red` | `#bf0e15` | CTAs principaux, prix, accents |
| `--neon-green` | `#006b37` | CTAs secondaires, livraison, focus rings |
| Font Heading | **Montserrat** | Titres, navigation |
| Font Body | **Open Sans** | Corps de texte, formulaires |

### Thèmes
- **Dark** (défaut) : fond `#0a0a0a`, surfaces `#141414`
- **Light** : fond `#ffffff`, surfaces `#f9f9f9`
- Toggle via bouton Sun/Moon dans la navbar

### i18n
- **Français** par défaut (`/fr`)
- **Anglais** disponible (`/en`)
- Toggle langue dans la navbar

---

## 🗄️ Schéma Sanity — Produit

| Champ | Type | Description |
|---|---|---|
| `name` | `{fr, en}` | Nom localisé |
| `slug` | slug | URL produit |
| `price` | number | Prix en FCFA |
| `featured` | boolean | Affiche dans "Best-Sellers" |
| `image` | image | Photo avec hotspot |
| `category` | `animal\|plant` | Catégorie principale |
| `subcategory` | string | Ex: Légumes-feuilles |
| `description` | `{fr, en}` | Description localisée |
| `ingredients` | `{fr, en}` | Liste ingrédients |
| `storageInfo` | `{fr, en}` | Conditions de conservation |

---

## 📦 Déploiement

### Next.js — Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

Ajoutez les variables d'environnement dans le dashboard Vercel :
`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`

### Sanity Studio

```bash
cd studio
npm run deploy
```

Le Studio sera accessible sur `https://votre-projet.sanity.studio`

---

## 📋 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de dev Next.js |
| `npm run build` | Build production |
| `npm run seed` | Insère 6 produits démo dans Sanity |
| `npm run studio` | Lance Sanity Studio (depuis /studio) |

---

## ✅ Checklist mise en ligne

- [ ] Compte Sanity créé et Project ID configuré
- [ ] `.env.local` rempli avec les vraies valeurs
- [ ] `npm run seed` exécuté pour avoir des produits
- [ ] Images des produits uploadées dans le Studio
- [ ] Numéros de téléphone mis à jour dans le code
- [ ] Liens réseaux sociaux mis à jour dans `Footer.tsx`
- [ ] Déployé sur Vercel

---

*Fait avec ❤️ au Cameroun · Batela Foods 2025*
