# Bumpify Directory

Annuaire public (façon Disboard) des serveurs Discord qui utilisent Bumpify — données réelles,
en direct, sans connexion requise pour les visiteurs.

## Comment ça marche

- Le bridge (déjà installé pour le dashboard) expose une route publique `GET /public/servers`
  qui renvoie uniquement les serveurs ayant rempli une description ou un lien d'invitation.
- Ce site interroge cette route côté serveur (`app/api/servers/route.js`), donc `BRIDGE_URL`
  reste privé (jamais exposé au navigateur).
- La page se rafraîchit toutes les 15 secondes pour garder les compteurs de bump à jour.

## Déploiement sur Vercel

1. Mettez à jour votre **bridge** (dashboard-bridge) avec la version la plus récente fournie —
   elle contient la nouvelle route `/public/servers`. Redéployez/redémarrez le bridge.
2. `vercel` (ou importer ce dossier comme nouveau projet sur vercel.com).
3. Variable d'environnement à ajouter sur Vercel :
   - `BRIDGE_URL` = l'adresse de votre bridge (ex: `http://de-01.rrhosting.eu:7536`)
4. Redéployez.

## Pourquoi certains serveurs n'apparaissent pas

Un serveur n'apparaît dans l'annuaire que s'il a rempli une **description** ou un **lien
d'invitation** dans le dashboard (section "Bump & Réseau"). C'est volontaire : ça évite de
lister des serveurs qui n'ont pas configuré leur fiche publique.
