# AWS Amplify Next.js (App Router) Starter Template

![AWS Amplify + Next.js](https://github.com/G1anpierre/amplify-next-template/raw/main/public/amplify-next.png)

A modern, full-stack starter template for building scalable web applications using Next.js (App Router) and AWS Amplify Gen 2.

## Overview

This template provides a solid foundation for developing cloud-powered web applications with Next.js and AWS Amplify. Designed for developers who want to quickly build applications with authentication, API, and database capabilities without extensive cloud infrastructure knowledge.

## Features

- **Authentication**: Pre-configured Amazon Cognito authentication with social providers
- **GraphQL API**: Ready-to-use AWS AppSync GraphQL endpoint
- **Database**: Real-time DynamoDB database with data modeling
- **Storage**: File uploads and downloads with Amazon S3
- **Styling**: Modern UI with Tailwind CSS
- **TypeScript**: Full type-safety throughout the application
- **Responsive Design**: Mobile-first approach for all components

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/G1anpierre/amplify-next-template.git
   cd amplify-next-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize Amplify:
   ```bash
   npx ampx sandbox
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app` - Next.js App Router components and pages
- `/amplify` - Amplify backend configuration and resources
- `/components` - Reusable UI components
- `/lib` - Utility functions and hooks
- `/public` - Static assets
- `/styles` - Global CSS and Tailwind configuration

## Database Schema

The application includes a sample Todo model with the following schema:

```typescript
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});
```

## Deploying to AWS

For deploying your application to AWS:

1. Configure the AWS account:
   ```bash
   ampx configure
   ```

2. Deploy the backend:
   ```bash
   ampx deploy
   ```

3. Deploy the frontend to Amplify Hosting:
   ```bash
   npx amplify add hosting
   npx amplify publish
   ```

For detailed instructions, refer to the [deployment documentation](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws).

## Contributing

Contributions are welcome! See [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for security issue reporting.

## License

This project is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file for details.