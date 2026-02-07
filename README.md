# Portfolio Website

A retro Windows-styled portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🖥️ Retro Windows UI with taskbar and Start menu
- 📧 Contact form with EmailJS integration
- 🎨 Responsive design with dark/light mode support
- ⌨️ Keyboard accessible navigation

## Structure
src/
├── assets/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   └── feature/
│
├── hooks/
│
├── integrations/
│   └── supabase/
│
├── lib/
│
├── providers/
│
├── config/
│
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── utilities.css
│
├── types/
│
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts

## Environment Variables

This project requires the following environment variables for the contact form:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key | Yes |
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID | Yes |

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and note the **Service ID**
3. Create an email template with ID `template_p8p58qv` (or update the template ID in `ContactForm.tsx`)
4. Get your **Public Key** from Account > API Keys
5. Add the environment variables to your project

### Template Variables

Your EmailJS template should include these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Message content

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- EmailJS

---

## Project Info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
