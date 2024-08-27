# PlannerTaskDownload

**PlannerTaskDownload** is a web application built with Next.js and Microsoft Graph API that allows authenticated users to download a list of tasks from a Microsoft Planner plan in CSV format. The application is ideal for developers or administrators who want to quickly extract tasks from a Microsoft Planner tenant.

## Features

- Authentication via Azure Active Directory (Azure AD)
- Access to Microsoft Planner plans within the tenant
- Download selected tasks in CSV format

## Requirements

- Node.js (version 14 or higher)
- An Azure AD account with access to Microsoft Planner
- A registered app in Azure AD with the necessary permissions

## Setup

### 1. Register the App in Azure AD

1. Sign in to the [Azure Portal](https://portal.azure.com) with your credentials.
2. Go to **Azure Active Directory > App registrations** and register a new application.
3. Configure the API permissions for your app:
   - **Microsoft Graph**:
     - `Group.Read.All` (Delegated)
     - `offline_access`
     - `User.Read`
4. Grant admin consent for the API permissions.
5. Set up the redirect URI as `http://localhost:3000/api/auth/callback/azure-ad`.

### 2. Clone the Project

Clone this repository to your local environment:

git clone https://github.com/your-github-username/PlannerTaskDownload.git
cd PlannerTaskDownload
3. Install Dependencies
Ensure you have Node.js installed and then install the project dependencies with npm:

bash
Copy code
npm install

### 4. Configure Environment Variables
Create a .env.local file in the root of the project with the following content:


# Application name
NEXT_PUBLIC_APP_DISPLAY_NAME=PlannerTaskDownload

# Application ID (client ID)
NEXT_PUBLIC_APP_CLIENT_ID=your_azure_client_id

# Directory (tenant) ID
NEXT_PUBLIC_APP_TENANT_ID=your_azure_tenant_id

# Azure AD client secret (find this in the Azure portal)
AZURE_AD_CLIENT_SECRET=your_azure_client_secret

# Secret generated for next-auth
NEXTAUTH_SECRET=your_nextauth_secret

### 5. Run the Application
Start the application in development mode:

npm run dev
The app will be available at http://localhost:3000

### 6. How to Use the Application
Authenticate via Azure AD.
Select a Planner plan from the available options.
Download the associated tasks in CSV format by clicking the "Download Tasks in CSV" button.
Contributing
We welcome contributions! If you would like to contribute, follow these steps:

### 7. Project forked:
This was just simple base for my development team at https://github.com/3FESTO, we need it in our custom application...

Feel free to contact us if you wanna go deeper on 3D PRINTING!
Cheers, Michele Miky Monti