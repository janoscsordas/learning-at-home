import { useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    // Add options to every screen in the stack by this method
    <UserProvider>
      <BooksProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
              headerStyle: {
              backgroundColor: theme.navBackground
              },
              headerTintColor: theme.title,
              headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen
              name="index"
              options={{
              title: "Home",
              }}
          />
        </Stack>
      </BooksProvider>
    </UserProvider>
  );
};

export default RootLayout;