# Expo Nhost Auth Template 🔐

This is a minimal authentication starter template using **Expo Router** and **Nhost**.

## 🚀 Features

- Email/password login & sign-up
- Expo Router navigation
- Simple and clean UI
- Nhost authentication
  
## 📁 Project Structure
```
app/
│
├── (auth)/                 # Authentication screens
│   ├── _layout.tsx         # Auth stack navigator
│   ├── login.tsx           # Login screen
│   └── signup.tsx          # Signup screen
│
├── (main)/                 # Authenticated app
│   ├── _layout.tsx         # Main stack navigator
│   └── index.tsx           # Protected home screen / dummy home screen
│
├── _layout.tsx             # Root layout with auth provider
├── index.tsx               # Root redirect
└── +not-found.tsx          # 404 page

lib/
└── nhost/
    └── client.ts           # Nhost configuration
 ```   
## 🛠️ Setup

1. **Clone the repo:**

```bash
git clone https://github.com/hazmi-badrunsham/expo-nhost-auth-template.git
cd expo-nhost-auth-template
npm install
npx expo start
```
## 🔧 Configuration: `lib/nhost/client.ts`

Make sure to **add your `nhostSubdomain` and `nhostRegion`** in the `lib/nhost/client.ts` file before running the application.

This is necessary for the Nhost client to properly initialize and connect to your backend.

### 📘 References

- 🔐 Nhost Auth Documentation: [https://docs.nhost.io/products/auth/overview](https://docs.nhost.io/products/auth/overview)
- 🌐 Expo Router Guide: [https://docs.expo.dev/versions/latest/sdk/router/](https://docs.expo.dev/versions/latest/sdk/router/)
