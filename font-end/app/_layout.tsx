import { Stack } from 'expo-router';
import { ThemeProvider } from './ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="login" options={{ title: "Login", headerBackVisible: false }} />
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
        <Stack.Screen name="index" options={{ title: "Home", headerBackVisible: false }} />
        <Stack.Screen name="tasks" options={{ title: "My Tasks" }} />
        <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
        <Stack.Screen name="update-task" options={{ title: "Update Task" }} />
      </Stack>
    </ThemeProvider>
  );
}