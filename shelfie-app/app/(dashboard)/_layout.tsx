import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import UserOnly from "../../components/auth/UserOnly";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <UserOnly>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: theme.navBackground,
                paddingTop: 10,
                height: 70,
                alignItems: "center",
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
          }}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="books"
                options={{
                    title: 'Books',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "create" : "create-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="books/[id]"
                options={{ href: null }}
            />
        </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;
