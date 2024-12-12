import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { FavoritesProvider } from '@/context/FavoritesContext';

// Root Layout. Här Hämtar jag och laddar fonter, omslutet av min FavoritesProvider som gör att funktionaliteten att favoritmarkera recept 
// (lagra dom lokalt) är tillgängligt hos barnkomponenter
// Även Navigeringsstruktur med Stack från expo-router och global felhantering

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Laddar mina fonter
export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
 
  // Använt mig av tabs-struktur, flikar för att navigera i appen och en detaljsida för att visa upp information om recepten.
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ headerTitle: 'Instructions', headerTintColor: '#000', headerBackTitle: 'Back', }} />
      </Stack>
      </FavoritesProvider>
  );
}
