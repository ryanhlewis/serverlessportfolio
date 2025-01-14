# Serverless React Portfolio

A **serverless portfolio** that can be **edited live** via a web-based code editor. Whenever you’re happy with your changes, you can push updates to a GitHub repository, then **deploy automatically** via a **Cloudflare Worker** or GitHub Pages.

![image](https://github.com/user-attachments/assets/9130c947-50f1-4add-8640-7d9880e3c42e)

To see it live, visit [https://serverlessportfolio.pages.dev/login](https://serverlessportfolio.pages.dev/login), 
login with "password", then go to any page and click the new "Edit" button in the top right!
Press Ctrl-S after editing code to automatically re-render the React component, all client-side.

---

## Light Mode
<img src="https://github.com/user-attachments/assets/f139c430-c22a-40fe-9c14-d55ad22279fc" alt="Light Mode 1" height="150">
<img src="https://github.com/user-attachments/assets/eaaca5d5-b422-4a32-a922-756166ec57f6" alt="Light Mode 2" height="150">
<img src="https://github.com/user-attachments/assets/1a774068-84fa-44dc-b539-cedbcb4292de" alt="Light Mode 3" height="150">
<img src="https://github.com/user-attachments/assets/c7439a5a-73f2-4fe4-a9d4-a97a9c445ca3" alt="Light Mode 4" height="150">

## Dark Mode
<img src="https://github.com/user-attachments/assets/433de846-ed26-4193-bf6c-1e3a31af1da7" alt="Dark Mode 1" height="150">
<img src="https://github.com/user-attachments/assets/59e348ec-f47a-4ab0-9d21-76b4a0f1a419" alt="Dark Mode 2" height="150">
<img src="https://github.com/user-attachments/assets/f8d7cbcc-fe9a-403e-93cf-35028744267e" alt="Dark Mode 3" height="150">
<img src="https://github.com/user-attachments/assets/ebbc6363-59a3-4ded-af77-fd603949eea9" alt="Dark Mode 4" height="150">

## Setting up the Portfolio

1. **Clone or Fork** this repository.  
2. **Install dependencies**:  
   ```bash
   npm install
   ```
3. **Run it locally** using `npm start`.  
   - This opens the app on [http://localhost:3000](http://localhost:3000), where you can preview your portfolio.

### Enabling Live Code Editing

This portfolio includes a **web-based code editor** that lets you edit `.tsx` files right inside your browser, then push the changes back to GitHub. To enable this:

1. **Create a Fine-Grained GitHub Personal Access Token**  
   - Go to [GitHub → Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens).  
   - Choose **fine-grained token** for better security.  
   - Scope it **only** for the repository you forked/cloned, with **read/write** permissions on contents.  

2. **Store the Token**  
   - You can hardcode it in your local `.env` for testing. **(Not recommended for production!)**  
   - For a more secure approach, store it in your Cloudflare Worker (as environment variable) or another secrets manager.

### Automatic Deploy with Cloudflare Worker

You can create a **Cloudflare Worker** that authenticates your “editor” users and returns the GitHub token if they provide a valid password. The Worker code might look like:

```js
export default {
  async fetch(request, env) {
    // Preflight request (OPTIONS method) handling for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      const { password } = await request.json();
      // Secure env vars in Worker
      const CORRECT_PASSWORD = env.SECRET_ADMIN_PASS; // e.g. "password"
      const GITHUB_TOKEN = env.SECRET_GITHUB_TOKEN;   // your GitHub PAT

      if (password === CORRECT_PASSWORD) {
        return new Response(
          JSON.stringify({ success: true, token: GITHUB_TOKEN }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid password' }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            status: 401,
          }
        );
      }
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          status: 400,
        }
      );
    }
  },
};
```

> **Note**: This Worker acts as a secure “gateway” to get your GitHub token if the user supplies the correct password.

---

## Deploying the React App

1. **Build** your project for production:  
   ```bash
   CI=false npm run build
   ```
   - The `CI=false` ensures that build warnings do not block the build on some CI systems.
2. **Deploy the `build` folder** to your hosting solution:
   - **Cloudflare Pages**: Point it to your GitHub repo. In your Pages settings, specify build command: `CI=false npm run build`, and output directory: `build/`.
   - **GitHub Pages**: 
     - Host from the `gh-pages` branch (via a script like `npm run deploy` if you configure `homepage` in `package.json`).
     - Or upload the `build` folder contents to your GitHub Pages environment.
   - **Other Hosts**: Just copy the `build` folder to your desired hosting location.

---

<div align="center">
  <img src="https://github.com/user-attachments/assets/1b76660c-78d5-4558-9c78-24cd658550bc" alt="Example Cloudflare Build Settings">
  <p><em>Example Cloudflare Build Settings</em></p>
</div>

## About the Portfolio Sections

We have various `.tsx` components in `src/sections/`:

- **About:** Showcases a brief introduction, images, or “Vision” text.  
- **Contact:** An embedded Calendly widget for scheduling, plus email and location info.  
- **Portfolio:** A filterable grid of projects with images, videos, or links.  
- **Press:** A list of news articles or external coverage.  
- **Publications:** A list of academic or workshop publications.

You can customize each section in your code editor. Then, push changes to your GitHub repository directly from this web interface.

---

P.S. To log out and get rid of the edit icon, clear your website cache, or visit /login again!

<div align="center">
  <img src="https://github.com/user-attachments/assets/17beef35-9723-4313-bbd1-20bb87fa19ec" alt="Image 1" height="200">
  <img src="https://github.com/user-attachments/assets/9d8d8540-98e5-41ee-a7f9-92ff64f04a9c" alt="Image 2" height="200">
</div>


You can also resize the code and file viewer, as well as close them.

![image](https://github.com/user-attachments/assets/1fbb3f33-b3ac-4bff-b2e9-8e58e431c615)
