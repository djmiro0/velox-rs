import 'dotenv/config';

export default {
  expo: {
    name: "VeloxRS",
    slug: "VeloxRS",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo-png.png",
    scheme: "veloxrs",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/logo-png.png",
      resizeMode: "contain",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.VeloxRS"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo-png.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.VeloxRS"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo-png.png"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
};
