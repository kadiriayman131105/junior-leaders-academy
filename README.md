# Junior Leaders Academy

Site de l'école privée **Junior Leaders Academy**, à la Deroua (province de Nouaceur). Préscolaire et primaire, en arabe, français et anglais.

Le but du site est simple : un parent écrit, appelle, ou envoie un WhatsApp. Le slogan de l'école est *Where Leaders Begin Their Journey* — en arabe, **حيث يبدأ القادة مسيرتهم**.

Site en ligne : [https://jla-gamma.vercel.app/fr](https://jla-gamma.vercel.app/fr)

| Langue | Adresse |
| --- | --- |
| Français | [/fr](https://jla-gamma.vercel.app/fr) |
| English | [/en](https://jla-gamma.vercel.app/en) |
| العربية | [/ar](https://jla-gamma.vercel.app/ar) |

## Ce que le site contient

- Page d'accueil : présentation, cycles, photos des activités, étapes d'inscription, questions fréquentes, formulaire et carte.
- Page [Recrutement](https://jla-gamma.vercel.app/fr/recrutement) pour les enseignants (3 ans d'expérience minimum).
- Mentions légales.
- Bouton d'appel et WhatsApp, y compris sur téléphone.
- Textes en français, anglais et arabe. L'arabe s'affiche de droite à gauche.

Les frais, le transport et les fournitures ne sont pas publiés. Le site invite à les demander à l'administration.

**Adresse.** Lotissement Al Tayssir, n° 01, derrière la mosquée Al Madina, Deroua.  
**Horaires.** Lundi–samedi, 9h00–18h30.  
**Téléphone / WhatsApp.** 06 61 10 75 11.

## Lancer le site en local

Il faut [Node.js](https://nodejs.org/) 20 ou plus récent.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). La page d'accueil redirige vers `/fr`.

```bash
npm run build
npm start
```

## Formulaires

Deux boutons sur chaque formulaire : **e-mail** et **WhatsApp**.

WhatsApp ouvre une conversation déjà remplie. Il fonctionne sans aucune clé.

L'e-mail part vers la boîte de l'école seulement si ces variables sont remplies. Copier `.env.example` vers `.env.local` :

```bash
RESEND_API_KEY=
SCHOOL_EMAIL=
MAIL_FROM="Junior Leaders Academy <onboarding@resend.dev>"
NEXT_PUBLIC_SITE_URL=https://jla-gamma.vercel.app
```

`RESEND_API_KEY` vient de [Resend](https://resend.com). `SCHOOL_EMAIL` est la boîte qui reçoit les inscriptions et les candidatures. Tant que le domaine n'est pas vérifié chez Resend, l'expéditeur reste `onboarding@resend.dev`.

Sans ces clés, le formulaire ne perd pas la demande : il propose le même message sur WhatsApp.

## Photos

Les six photos d'activités sont dans `public/activities`. Elles s'affichent dans le cadre au-dessus d'Instagram et Facebook.

Pour en ajouter d'autres, déposer des fichiers JPG, PNG ou WEBP dans `public/gallery`. Les plus récentes apparaissent en premier, jusqu'à 12. Le détail est dans `public/gallery/LISEZMOI.txt`.

Les dernières publications Instagram peuvent s'afficher toutes seules avec un jeton de la Graph API :

```bash
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
```

Sans jeton, le site garde les photos locales et les liens vers [Instagram](https://www.instagram.com/juniorleadersacademy/) et [Facebook](https://www.facebook.com/people/Junior-Leaders-Academy/61590663478248/).

## Mettre à jour le site en ligne

Le code est sur GitHub : [kadiriayman131105/junior-leaders-academy](https://github.com/kadiriayman131105/junior-leaders-academy).

Vercel publie le site à chaque envoi sur `master`. Après un changement, commit, push, puis attendre la fin du déploiement. Les nouvelles photos de `public/gallery` apparaissent après ce déploiement.

Dans Vercel, renseigner les mêmes variables que dans `.env.local`, avec :

```bash
NEXT_PUBLIC_SITE_URL=https://jla-gamma.vercel.app
```
