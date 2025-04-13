import { useColorScheme, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedView = ({ style, safe = false, children, ...props }: { style?: any; safe?: boolean; children: any, [key: string]: any }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // If safe is false, use a regular View
  if (!safe) {
    return (
      <View
        style={[
          {
            backgroundColor: theme.background,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
  
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    >
        {children}
    </View>
  );
};

export default ThemedView;
