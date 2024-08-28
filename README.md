# Anonymous QnA App

## Overview

Anonymous QnA is an application that allows users to receive and answer anonymous questions from people worldwide, common more across friends!

## Features

### For Registered Users:

1. **User Authentication**: Secure login system using Google authentication.
2. **Personal Dashboard**: 
   - View questions received from anonymous users.
   - Answer questions directly from the dashboard.
   - Delete unwanted questions.
3. **Profile Sharing**: 
   - Unique profile link for each user.
   - Easy sharing options to invite others to ask questions.
4. **Theme Toggle**: Switch between light and dark modes for comfortable viewing.

### For Anonymous Users:

1. **Ask Questions**: Submit anonymous questions to registered users.
2. **View Profiles**: Browse user profiles and see their answered questions.
3. **User Search**: Search for registered users by name.

### General Features:

1. **Responsive Design**: Works seamlessly on desktop and mobile devices.
2. **Real-time Updates**: Instant feedback on actions like submitting questions or answers.

## Tech Stack

- **Frontend**: 
  - Next.js 14 (React framework)
  - TypeScript
  - Tailwind CSS for styling
  - shadcn/ui for UI components

- **Backend**: 
  - Next.js API Routes
  - Prisma ORM

- **Database**: 
  - PostgreSQL hosted on vercel

- **Authentication**: 
  - NextAuth.js with Google provider

- **Deployment**: 
  - Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/anonymous-qna.git
   cd anonymous-qna
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   AUTH_SECRET="your_nextauth_secret"
   AUTH_GOOGLE_ID="your_google_client_id"
   AUTH_GOOGLE_SECRET="your_google_client_secret"
   ```

4. Set up the database:
   ```
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The easiest way to deploy this app is using the [Vercel Platform](https://vercel.com). Follow these steps:

1. Push your code to a GitHub repository.
2. Connect your GitHub account to Vercel.
3. Import the project from GitHub to Vercel.
4. Set up the environment variables in Vercel's dashboard.
5. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
