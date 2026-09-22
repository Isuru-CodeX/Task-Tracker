import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../models/Task";
import { getTasks as apiGetTasks, deleteTask } from "../services/api";
import { clearUser, getUser } from "../services/authStorage";
import { getGlobalStyles } from "./Theme";
import { useTheme } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

export default function TaskListScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const { isDark } = useTheme();
    const { Colors, styles: gStyles } = getGlobalStyles(isDark);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const user = await getUser();
            if (!user) {
                router.replace("/login");
                return;
            }
            const data = await apiGetTasks(user.userId);
            setTasks(data);
        } catch (e: any) {
            Alert.alert("Error", e.message || "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (value?: string) => {
        if (!value) return "";
        const normalized = value.replace(" ", "T").replace(".0", "");
        const d = new Date(normalized);
        if (isNaN(d.getTime())) return value;

        return d.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleDelete = (id: number) => {
        Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
            { text: "No", style: "cancel" },
            {
                text: "Yes",
                style: "destructive",
                onPress: async () => {
                    try {
                        const user = await getUser();
                        if (!user) return router.replace("/login");
                        await deleteTask(id, user.userId);
                        loadTasks();
                    } catch (e: any) {
                        Alert.alert("Error", e.message || "Failed to delete");
                    }
                },
            },
        ]);
    };

    const logout = async () => {
        await clearUser();
        router.replace("/login");
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    return (
        <View style={gStyles.container}>
            <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                    <Text style={[gStyles.header, { color: Colors.text }]}>My Tasks</Text>
                    <TouchableOpacity onPress={logout}>
                        <Text style={{ color: Colors.primary, fontWeight: "700", marginTop: 4 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <ThemeToggle />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                refreshing={loading}
                onRefresh={loadTasks}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                ListEmptyComponent={
                    !loading ? (
                        <Text style={[styles.empty, { color: Colors.subtext }]}>
                            No tasks found. Tap + to add one!
                        </Text>
                    ) : null
                }
                renderItem={({ item }) => (
                    <View style={gStyles.card}>
                        <View style={styles.cardContent}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.itemTitle, { color: Colors.text }]}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.itemDesc, { color: Colors.subtext }]} numberOfLines={2}>
                                    {item.description}
                                </Text>

                                {/* Created Date Display */}
                                {item.createdDate && (
                                    <View style={styles.dateContainer}>
                                        <Ionicons name="calendar-outline" size={12} color={Colors.subtext} />
                                        <Text style={[styles.dateText, { color: Colors.subtext }]}>
                                            {formatDate(item.createdDate)}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <View style={[styles.actionColumn, { borderLeftColor: Colors.border }]}>
                                <TouchableOpacity onPress={() => router.push(`/update-task?id=${item.id}`)}>
                                    <Ionicons name="pencil" size={20} color={Colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginTop: 15 }}>
                                    <Ionicons name="trash-outline" size={20} color={Colors.danger} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity
                style={[styles.fab, { backgroundColor: Colors.primary, shadowColor: Colors.primary }]}
                onPress={() => router.push("/add-task")}
            >
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 25,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4
    },
    itemDesc: {
        fontSize: 14,
        lineHeight: 20
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    dateText: {
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500'
    },
    actionColumn: {
        marginLeft: 15,
        alignItems: "center",
        borderLeftWidth: 1,
        paddingLeft: 15
    },
    empty: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16
    },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
});