import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "auth_user";

export type AuthUser = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
};

export const saveUser = async (user: AuthUser) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<AuthUser | null> => {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(KEY);
};
