<br><br><br>
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,firebase,nodejs" />
</p>

<p align="center">
  <b>Additional Libraries:</b> Radix UI · VAPI · Zod · Sonner · Day.js · clsx · tailwind-merge · Framer Motion · GSAP
</p>
<br><br><br>

# Sidvia AI

**Smart Interactive Digital Voice-based Interview Application**

[Project Repository](https://github.com/PrashantJaybhaye/Ai_Realtime_Agent)

Sidvia AI is an advanced platform for simulating AI-powered, voice-based mock interviews. It helps job seekers improve their interview skills through interactive sessions, instant feedback, and detailed analytics. Built with Next.js 15 and powered by cutting-edge AI technologies.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

### 🎯 Core Interview Features
- **AI-Powered Voice Interviews:** Realistic, adaptive mock interviews using VAPI AI with natural voice conversations
- **Customizable Interview Generation:** Tailor questions by role, experience level, and tech stack using Google Gemini AI
- **Real-time Voice Recognition:** Advanced speech recognition with Deepgram integration for accurate transcription
- **Intelligent Interviewer:** GPT-4 powered interviewer that adapts responses and provides natural conversation flow

### 📊 Analytics & Feedback
- **Comprehensive Feedback System:** Detailed assessment of communication skills, technical knowledge, and performance metrics
- **Performance Analytics:** Track progress over time with detailed analytics dashboards
- **Interview History:** Complete history of all interviews with feedback and scores
- **Achievement System:** Track milestones and improvements with achievement badges

### 👤 User Experience
- **Personalized Dashboard:** Custom dashboard showing interview history, upcoming sessions, and performance metrics
- **Profile Management:** Detailed user profiles with interview statistics and achievements
- **Responsive Design:** Fully functional across all devices with modern UI/UX
- **Secure Authentication:** Firebase Auth integration with route protection

### 🎨 Landing Page & Marketing
- **Engaging Landing Page:** Modern, animated landing page with company showcases
- **Feature Showcase:** Interactive feature sections with animations and testimonials
- **Company Trust Indicators:** Marquee of trusted companies and success stories
- **Call-to-Action Sections:** Strategic CTAs to drive user engagement

### 🔧 Admin Features
- **Comprehensive Admin Dashboard:** Manage users, interviews, and system statistics
- **User Management:** Enable/disable users, view user details, and perform bulk operations
- **Interview Management:** Monitor all interviews, view details, and manage interview data
- **Data Export:** Export user and interview data as CSV files
- **System Statistics:** Real-time system metrics and usage analytics

## Technology Stack

### Frontend
- **Framework:** Next.js 15 with App Router
- **UI Library:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4 with custom animations
- **Components:** Radix UI primitives with custom styling
- **Animations:** Framer Motion, GSAP, and custom CSS animations
- **Icons:** Lucide React icons

### Backend & Services
- **Authentication:** Firebase Auth with custom claims
- **Database:** Firebase Firestore for data storage
- **Admin SDK:** Firebase Admin SDK for server-side operations
- **AI Services:** 
  - VAPI AI for voice interactions and interview management
  - Google Gemini AI for question generation
  - OpenAI GPT-4 for intelligent interviewer responses
- **Voice Processing:** Deepgram for speech-to-text transcription

### Development Tools
- **Validation:** Zod for schema validation
- **Notifications:** Sonner for toast notifications
- **Date Handling:** Day.js for date manipulation
- **Utilities:** clsx, tailwind-merge for conditional styling
- **Form Handling:** React Hook Form with Zod validation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase project with Firestore, Auth, and Admin SDK enabled
- VAPI account and API credentials
- Google Cloud project with Gemini AI API access
- OpenAI API key for GPT-4 access

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
   Create a `.env.local` file in the root directory:
   ```env
   # VAPI Configuration
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   
   # AI Services
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
   OPENAI_API_KEY=your_openai_key
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   ```

4. **Initialize Firebase Admin SDK:**
   - Ensure `firebase/admin.ts` is configured with your service account credentials
   - Set up Firestore security rules for your application

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Access the application at [http://localhost:3000](http://localhost:3000)

## Usage

### 1. Authentication & Onboarding
- Visit the landing page at `/landing` to learn about features
- Sign up at `/sign-up` or log in at `/sign-in`
- After authentication, users are redirected to the main dashboard

### 2. Interview Generation & Practice
- Navigate to `/interview` to create a new interview session
- Configure interview parameters:
  - **Type:** Technical, Behavioral, or Mixed
  - **Role:** Specific job position
  - **Level:** Entry, Mid-Level, Senior, or Executive
  - **Tech Stack:** Relevant technologies
  - **Question Count:** Number of questions (5-20)
- Start the voice interview with AI interviewer
- Participate in real-time conversation with natural voice interaction

### 3. Feedback & Analytics
- View detailed feedback immediately after interview completion
- Access comprehensive analytics at `/profile`
- Review interview history and performance trends
- Track achievements and improvement areas

### 4. Admin Dashboard (Admin Users)
- Access admin panel at `/admin/dashboard`
- Manage user accounts and permissions
- Monitor system statistics and usage
- Export data and manage interviews
- View detailed user and interview analytics

## Project Structure

```
sidvia/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Admin route group
│   │   └── admin/               # Admin dashboard pages
│   ├── (auth)/                  # Authentication route group
│   │   ├── landing/             # Landing page
│   │   ├── sign-in/             # Sign in page
│   │   └── sign-up/             # Sign up page
│   ├── (root)/                  # Main application routes
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── feedback/            # Feedback page
│   │   ├── interview/           # Interview pages
│   │   └── profile/             # User profile
│   └── api/                     # API routes
│       ├── admin/               # Admin API endpoints
│       ├── users/               # User management APIs
│       └── vapi/                # VAPI integration APIs
├── components/                   # React components
│   ├── admin/                   # Admin-specific components
│   ├── landing/                 # Landing page components
│   ├── ui/                      # Reusable UI components
│   └── *.tsx                    # Feature components
├── contexts/                     # React contexts
├── firebase/                     # Firebase configuration
├── lib/                         # Utility functions and actions
├── types/                       # TypeScript type definitions
└── public/                      # Static assets
```

## API Endpoints

### User Management
- `GET /api/users` - List all users (admin only)
- `POST /api/admin/users` - Single user actions (disable, enable, delete, view)
- `POST /api/admin/users/bulk` - Bulk user operations

### Interview Management
- `GET /api/admin/interviews` - List all interviews (admin only)
- `POST /api/admin/interviews` - Single interview actions
- `POST /api/admin/interviews/bulk` - Bulk interview operations

### System Statistics
- `GET /api/admin/stats` - System-wide statistics and metrics

### Interview Generation
- `POST /api/vapi/generate` - Generate custom interview questions
  ```json
  {
    "type": "technical",
    "role": "Software Engineer",
    "level": "Mid-Level",
    "techstack": "React, Node.js, TypeScript",
    "amount": 10,
    "userid": "user-id"
  }
  ```

## Contributing

We welcome contributions to Sidvia AI! Here's how you can help:

1. **Fork the repository** and create a new branch for your feature
2. **Follow the coding standards** and ensure TypeScript compliance
3. **Test your changes** thoroughly before submitting
4. **Update documentation** if you add new features
5. **Submit a pull request** with a clear description of your changes

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component structure and naming conventions
- Ensure responsive design for all UI components
- Add proper error handling and loading states
- Include appropriate tests for new functionality

## Contact

For questions, support, or collaboration opportunities:

- **Email:** [gwscary@gmail.com](mailto:gwscary@gmail.com)
- **Repository:** [GitHub - Sidvia AI](https://github.com/PrashantJaybhaye/Ai_Realtime_Agent)

---

**Built with ❤️ using Next.js, Firebase, and AI technologies**