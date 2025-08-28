<br><br><br>
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,firebase,nodejs" />
</p>

<p align="center">
  <b>Additional Libraries:</b> Radix UI · VAPI · Zod · Sonner · Day.js · clsx · tailwind-merge
</p>
<br><br><br>

# Sidvia AI

**Smart Interactive Digital Voice-based Interview Application**

[Project Repository](https://github.com/PrashantJaybhaye/Ai_Realtime_Agent)

Sidvia AI is an advanced platform for simulating AI-powered, voice-based mock interviews. It helps job seekers improve their interview skills through interactive sessions, instant feedback, and detailed analytics.



## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)



## Features

- **AI-Powered Voice Interviews:** Realistic, adaptive mock interviews using `@vapi-ai/web` and VAPI.
- **Customizable Interview Generation:** Tailor questions by role, experience, and tech stack. Configurable via `/app/api/vapi/generate/route.ts`.
- **Real-time Feedback:** Immediate assessment of communication, technical skills, and performance, stored in Firebase.
- **Performance Analytics:** Track progress and review detailed analytics dashboards.
- **Admin Panel:** Manage users, interviews, and system stats at `/admin/dashboard`.
- **User Authentication:** Secure login via Firebase Auth, with route guards for protected pages.
- **Responsive Design:** Fully functional across devices.
- **Landing Page:** Engaging introduction and marketing using Next.js components.



## Technology Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Radix UI, Framer Motion, styled-components
- **Backend:** Firebase (Auth, Firestore, Admin SDK), @vapi-ai/web, @ai-sdk/google
- **Utilities:** Zod, Sonner, Day.js, clsx, tailwind-merge



## Prerequisites

- Node.js (v18+)
- npm
- Firebase project (Firestore, Auth, Admin SDK)
- VAPI account and API token



## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PrashantJaybhaye/Ai_Realtime_Agent.git
    cd Ai_Realtime_Agent
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    - Create a `.env.local` file in the root directory:
      ```
      NEXT_PUBLIC_VAPI_WORKFLOW_ID=
      NEXT_PUBLIC_VAPI_WEB_TOKEN=
      GOOGLE_GENERATIVE_AI_API_KEY=
      NEXT_PUBLIC_FIREBASE_API_KEY=
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
      NEXT_PUBLIC_FIREBASE_APP_ID=
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
      FIREBASE_PROJECT_ID=
      FIREBASE_PRIVATE_KEY=
      FIREBASE_CLIENT_EMAIL=
      ```

4. **Initialize Firebase Admin SDK:**
    - Ensure `firebase/admin.ts` is set up with your service account credentials.

5. **Start the development server:**
    ```bash
    npm run dev
    ```
    - Access the app at [http://localhost:3000](http://localhost:3000).



## Usage

### 1. Authentication

- Sign up at `/sign-up` or log in at `/sign-in`.
- After login, users are redirected to the dashboard (`/`).

### 2. Interview Simulation

- Go to `/interview` to generate a new interview (`components/GenerationAgent.tsx`).
- Participate in voice-based interviews (`components/Agent.tsx`).
- Receive real-time feedback and analytics (`lib/actions/general.action.ts`).

### 3. Feedback Review

- View past interviews and feedback at `/profile`.
- Detailed reports are available at `/interview/[id]/feedback`.

### 4. Admin Dashboard

- Admins access `/admin/dashboard` (guarded by `app/(admin)/layout.tsx`).
- Manage users, interviews, and export data as CSV.



## API Endpoints

- **Users**
  - `GET /api/users`: List all users (admin dashboard).
  - `POST /api/admin/users`: Single user actions (disable, enable, delete, view).
  - `POST /api/admin/users/bulk`: Bulk user actions.

- **Stats**
  - `GET /api/admin/stats`: System statistics.

- **Interviews**
  - `GET /api/admin/interviews`: List all interviews.
  - `POST /api/admin/interviews`: Single interview actions.
  - `POST /api/admin/interviews/bulk`: Bulk interview actions.

- **Interview Generation**
  - `POST /app/api/vapi/generate`: Generate interview questions.
    ```json
    {
      "type": "technical",
      "role": "Software Engineer",
      "level": "Mid-Level",
      "techstack": "React, Node.js",
      "amount": 10,
      "userid": "some-user-id"
    }
    ```



## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement and test your changes.
4. Submit a pull request with a clear description.



## Contact

For questions or support, contact: [gwscary@gmail.com](mailto:gwscary@gmail.com)
