import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedTextInput = ({ style, ...props }: { style?: any, [key: string]: any }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    return (
        <TextInput 
            style={
                [
                    {
                        backgroundColor: theme.uiBackground,
                        color: theme.text,
                        padding: 20,
                        borderRadius: 6,
                    },
                    style
                ]
            }
            {...props}
        />
    )
}

export default ThemedTextInput