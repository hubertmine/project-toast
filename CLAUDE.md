# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Lance le serveur de développement (vide le cache Parcel avant)
npm run build        # Build de production
npm run new-component [Name]  # Génère un nouveau composant (fichiers + boilerplate)
```

Si le serveur plante avec des erreurs bizarres, supprimer `.parcel-cache/` règle souvent le problème.

## Architecture

L'application est un système de notifications toast pour le cours "Joy of React".

**Flux de données (Context API) :**

- `ToastProvider` (`src/components/ToastProvider/`) est le keeper d'état. Il expose `ToastContext` avec `{ toasts, addToast, hideToast }`. Il monte aussi le listener clavier via `useEscapeKey` pour vider tous les toasts sur Escape.
- `ToastShelf` (`src/components/ToastShelf/`) consomme `ToastContext` et rend la liste des toasts dans un `<ol>` positionné en coin d'écran.
- `Toast` (`src/components/Toast/`) est un composant individuel qui reçoit `variant`, `hideToast`, et `children`. Il gère sa propre animation de sortie (`isLeaving`) et un auto-dismiss après 3 secondes.
- `ToastPlayground` (`src/components/ToastPlayground/`) est l'UI de démo (formulaire) qui appelle `addToast` via le contexte.

**Hook custom :**

- `useEscapeKey` est dans `src/hooks/useEscapeKey.js`.

**Styling :** CSS Modules (`.module.css`) pour chaque composant. Les variantes de Toast (`notice`, `warning`, `success`, `error`) correspondent à des classes CSS du même nom dans `Toast.module.css`.

**Bundler :** Parcel 2. L'entrée est `public/index.html`, les assets statiques (ex: `assets/toast.png`) sont copiés via `parcel-reporter-static-files-copy`.
