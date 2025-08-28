</br></br></br>
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,firebase,nodejs" />
</p>

<p align="center">
  <b>Additional Libraries:</b> Radix UI · VAPI · Zod · Sonner · Day.js · clsx · tailwind-merge
</p>
</br></br></br>

# Sidvia Ai

**Smart Interactive Digital Voice-based Interview Application**

[https://github.com/PrashantJaybhaye/Ai_Realtime_Agent](https://github.com/PrashantJaybhaye/Ai_Realtime_Agent)

This project is a cutting-edge interview simulation platform that leverages AI to conduct interactive, voice-based mock interviews and provide instant feedback. Designed to help job seekers enhance their interview skills, the application offers personalized coaching and performance analytics to boost confidence and preparedness.

## Features and Functionality

-   **AI-Powered Voice Interviews:** Conduct realistic mock interviews with an AI interviewer capable of adapting to user responses in real-time using `@vapi-ai/web` and VAPI.
-   **Customizable Interview Generation:** Generate interview questions tailored to specific roles, experience levels, and technology stacks, driven by AI.  Configuration through the `/app/api/vapi/generate/route.ts` endpoint.
-   **Real-time Feedback:** Get immediate assessments on communication skills, technical knowledge, and overall performance, which are saved using Firebase.
-   **Performance Analytics:** Track progress, review past performances, and identify areas for improvement using detailed analytics dashboards.
-   **Admin Panel:** Manage users, interviews, and system statistics through a dedicated admin dashboard (accessible at `/admin/dashboard`).
-   **User Authentication:** Secure user authentication and authorization using Firebase Auth.  Guards are present in `app/(root)/layout.tsx` and `app/(admin)/layout.tsx` to control access.
-   **Landing Page:** Marketing and introduction of the platform using Next.js components.
-   **Responsive Design:** Functional across devices.

## Technology Stack

-   **Next.js:** React framework for building server-rendered applications and API routes.
-   **React:** JavaScript library for building user interfaces.
-   **TypeScript:** Superset of JavaScript that adds static typing.
-   **Tailwind CSS:** Utility-first CSS framework for styling the user interface.
-   **Radix UI:**  A library of unstyled, accessible React primitives for building design systems and high-quality web apps.
-   **Firebase:** Backend-as-a-Service (BaaS) providing authentication, database (Firestore), and cloud functions.
-   **@vapi-ai/web:** Voice API library for enabling real-time voice interaction.
-   **@ai-sdk/google:** AI SDK for interacting with Google's AI models (Gemini).
-   **Framer Motion:** A production-ready motion library for React.
-   **Zod:** TypeScript-first schema validation with static type inference.
-   **Sonner:**  A library for toast notifications.
-   **Dayjs:**  Immutable date library for parsing, validating, manipulating, and formatting dates.
-   **clsx and tailwind-merge:** Utility functions for conditional CSS class names and Tailwind CSS class merging.
-   **styled-components:** CSS-in-JS library (used for Loader.tsx).

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js (v18 or higher) and npm installed.
-   Firebase project set up with Firestore, Authentication enabled, and Firebase Admin SDK service account configured.
-   VAPI account and API token obtained from VAPI.
-   Environment variables configured for Firebase and VAPI.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/PrashantJaybhaye/Ai_Realtime_Agent.git
    cd Ai_Realtime_Agent
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add the following variables:

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

4.  **Initialize Firebase Admin SDK:**

    Ensure the Firebase Admin SDK is properly initialized in `firebase/admin.ts`. Verify that the `credential` is correctly configured using the service account key.

5.  **Run the application:**

    ```bash
    npm run dev
    ```

    This will start the Next.js development server, and you can access the application at `http://localhost:3000`.

## Usage Guide

1.  **User Authentication:**

    -   Sign up for a new account via the `/sign-up` route.
    -   Log in with existing credentials via the `/sign-in` route.
    -   Users will be redirected to the main dashboard (`/`) after successful login.

2.  **Interview Simulation:**

    -   Navigate to `/interview` to generate a new interview.  This uses `components/GenerationAgent.tsx` to initiate an AI interview.
    -   Participate in voice-based interviews.  `components/Agent.tsx` handles this process.
    -   After the interview, receive real-time feedback and analytics.  This functionality is invoked by `lib/actions/general.action.ts`.

3.  **Feedback Review:**

    -   Review past interview performances and feedback scores on your profile page at `/profile`.
    -   Detailed feedback reports are available at `/interview/[id]/feedback` for each completed interview.

4.  **Admin Dashboard:**

    -   Administrators can access the admin dashboard at `/admin/dashboard`.  This is guarded by `app/(admin)/layout.tsx` and `lib/actions/auth.action.ts`.
    -   Manage users, enable/disable accounts, and view system statistics.
    -   Manage interview data, finalize drafts, and export data as CSV files through the `/admin/interviews` page.

## API Documentation

The application utilizes several API endpoints for managing users, interviews, and statistics.

-   `/api/users`:
    -   `GET`: Retrieves a list of all users. Used by `app/(admin)/admin/dashboard/page.tsx`.

-   `/api/admin/users`:
    -   `POST`: Performs actions on a single user (disable, enable, delete, view).
        Example usage:

        ```json
        {
            "action": "disable",
            "userId": "some-user-id"
        }
        ```

-   `/api/admin/users/bulk`:
    -   `POST`: Performs bulk actions on users (disable, enable, delete).
        Example usage:

        ```json
        {
            "action": "delete",
            "userIds": ["user1", "user2"]
        }
        ```

-   `/api/admin/stats`:
    -   `GET`: Retrieves statistics about users, interviews, and feedback.  Used by `app/(admin)/admin/dashboard/page.tsx`.

-   `/api/admin/interviews`:
    -   `GET`: Retrieves a list of all interviews.
    -   `POST`: Performs actions on a single interview (delete, update, view).
        Example usage:

        ```json
        {
            "action": "delete",
            "interviewId": "some-interview-id"
        }
        ```

-   `/api/admin/interviews/bulk`:
    -   `POST`: Performs bulk actions on interviews (delete, finalize, unfinalize).
        Example usage:

        ```json
        {
            "action": "finalize",
            "interviewIds": ["interview1", "interview2"]
        }
        ```

-   `/app/api/vapi/generate`:
    -   `POST`: Generates interview questions based on the provided parameters.

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

## Contributing Guidelines

Contributions are welcome! To contribute to this project:

```
1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Test your changes thoroughly.
5.  Submit a pull request with a clear description of your changes and the problem they solve.

```

## Contact/Support Information

For any questions or support, please contact: gwscary@gmail.com
