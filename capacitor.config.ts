import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kane.music',
  appName: 'Kane',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
