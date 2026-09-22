import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <TouchableOpacity
            onPress={toggleTheme}
            style={{
                padding: 10,
                backgroundColor: isDark ? '#334155' : '#F1F5F9',
                borderRadius: 12
            }}
        >
            <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={24}
                color={isDark ? "#FDE047" : "#6366F1"}
            />
        </TouchableOpacity>
    );
};