import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="book/[id]"
          options={{
            title: 'Detalhes',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            title: 'Adicionar Livro',
            presentation: 'modal',
            headerBackTitle: 'Cancelar',
          }}
        />
      </Stack>
    </>
  );
}
