# Deploy MatriBhumi on Hostinger

Canonical domain: **https://matribhumi.me**

This app is a **Next.js Node.js server** (not a static HTML export). On Hostinger, deploy it as a **Node.js web app** from GitHub — not the generic **Advanced → Git** file sync.

You need a **Business Web Hosting** or **Cloud** plan (Startup / Professional / Enterprise). Shared starter plans cannot run Next.js.

## 1. Point the domain

In hPanel, attach **matribhumi.me** to the hosting account.

- If the domain is registered at Hostinger, use Hostinger nameservers.
- If it is registered elsewhere, set the A record to the Hostinger server IP shown in hPanel.
- Add **www.matribhumi.me** as an alias. The app redirects `www` to the apex domain.

Wait until DNS resolves before the first deploy.

## 2. Create the Node.js web app from GitHub

1. hPanel → **Websites** → **Add Website**.
2. Choose **Node.js web app** (sometimes labelled **Web Apps**).
3. **Import Git repository** → **Connect with GitHub**.
4. Authorise the Hostinger GitHub App and select **`apchowdhury25/matribhumi-me`**.
5. Branch: **`main`**.

If Hostinger asks you to remove an existing website on `matribhumi.me` first, do that — the Node.js flow needs a fresh slot for the domain.

## 3. Build settings

Confirm (or set) these values:

| Field | Value |
| --- | --- |
| Framework | Next.js |
| Branch | `main` |
| Node.js version | **22** (LTS) |
| Package manager | npm |
| Build command | `build` |
| Output directory | `.next` |
| Entry file | leave blank (Hostinger starts Next.js itself) |

Do **not** use the generic Git tool under **Advanced → Git**. That copies files as-is and will not run `npm run build`.

## 4. Environment variables

In the deploy screen (or **Environment variables** after the first deploy), set:

```env
DATABASE_URL=file:/home/YOUR_USERNAME/domains/matribhumi.me/data/matribhumi.db
SESSION_SECRET=generate-a-random-string-at-least-32-characters
NEXTAUTH_SECRET=generate-a-random-string-at-least-32-characters
NEXT_PUBLIC_SITE_URL=https://matribhumi.me
ADMIN_EMAIL=admin@matribhumi.me
ADMIN_PASSWORD=choose-a-strong-password-and-change-the-demo-one
```

Replace `YOUR_USERNAME` with the hPanel system user (shown under **SSH Access** or **FTP**).

Optional:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_ANALYTICS_ID=
UPLOAD_DIR=/home/YOUR_USERNAME/domains/matribhumi.me/data/uploads
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

Create the data folder once in File Manager:

`domains/matribhumi.me/data/`

The SQLite file must live **outside** `hbuilds/` so a new deploy does not wipe properties, leads, and admin users.

Saving environment variables triggers a rebuild.

## 5. First build

Click **Deploy**. Hostinger will:

1. Install npm packages (`postinstall` runs `prisma generate`).
2. Run `npm run build`, which creates the database schema and seeds demonstration content **only if the database is empty**.
3. Start the Next.js server on the port Hostinger assigns (`PORT`).

When the deployment is **Current** and the process badge is **Running**, open **https://matribhumi.me**.

Staff console: **https://matribhumi.me/admin**

Change the admin password after the first login.

## 6. Later updates

Push to `main` on GitHub. Hostinger rebuilds automatically.

If the site is up but stale, use **Redeploy** on the Deployments page.

## 7. SSL

hPanel → **SSL** → install the free certificate for `matribhumi.me` and `www.matribhumi.me`. Force HTTPS.

## 8. Troubleshooting

| Symptom | What to check |
| --- | --- |
| Build failed | Deployments → build log. Confirm Node 22 and that `DATABASE_URL` is set. |
| Green build, site 502 / not responding | Runtime Logs. Usually a missing `SESSION_SECRET` (must be 32+ characters) or a bad `DATABASE_URL`. Restart the process from the Running badge. |
| 403 after redeploy | Do not edit `.htaccess` in `public_html`. Redeploy so Hostinger regenerates it. |
| Empty properties after a deploy | `DATABASE_URL` pointed at a file inside `hbuilds/`. Move it to `domains/matribhumi.me/data/`. |
| Images missing | Confirm `public/media` is in the Git repo and the build succeeded. |

## 9. MySQL instead of SQLite (optional)

Business plans include MySQL. To use it, change `prisma/schema.prisma` datasource `provider` to `"mysql"`, set `DATABASE_URL` to the hPanel MySQL connection string, commit, and redeploy. Do this only if you are ready to stop using the local SQLite file.
