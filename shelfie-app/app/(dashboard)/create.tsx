import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useBooks } from "../../hooks/useBooks";
import { useRouter } from "expo-router";
import { useState } from "react";

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";

const Create = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const { createBook } = useBooks();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !description.trim()) {
            return;
        }

        setLoading(true);
        await createBook({ title, author, description });

        // reset fields
        setTitle("");
        setAuthor("");
        setDescription("");

        // redirect
        router.replace("/books")

        // reset loading state
        setLoading(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>

                <ThemedText title={true} style={styles.heading}>
                    Add a New Book
                </ThemedText>
                <Spacer />

                <ThemedTextInput
                    placeholder="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    autoCorrect={false}
                />
                <Spacer />

                <ThemedTextInput
                    placeholder="Author"
                    style={styles.input}
                    value={author}
                    onChangeText={setAuthor}
                    autoCorrect={false}
                />
                <Spacer />

                <ThemedTextInput
                    placeholder="Description"
                    style={styles.multiline}
                    value={description}
                    onChangeText={setDescription}
                    autoCorrect={false}
                    multiline
                />
                <Spacer />

                <ThemedButton onPress={handleSubmit} disabled={loading}>
                    <Text style={{ color: "#fff" }}>
                        {loading ? "Saving..." : "Create Book"}
                    </Text>
                </ThemedButton>
            </ThemedView>
        </TouchableWithoutFeedback>
    )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    input: {
        padding: 20,
        borderRadius: 6,
        alignSelf: "stretch",
        marginHorizontal: 40,
    },
    multiline: {
        padding: 20,
        borderRadius: 6,
        minHeight: 100,
        alignSelf: "stretch",
        marginHorizontal: 40,
    }
})