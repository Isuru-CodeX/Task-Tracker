import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUser, getUser, clearUser, AuthUser } from "./authStorage";

// Mock the AsyncStorage module
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("authStorage", () => {
  const KEY = "auth_user";
  const mockUser: AuthUser = {
    userId: 1,
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("saveUser", () => {
    it("should save the user to AsyncStorage", async () => {
      await saveUser(mockUser);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        KEY,
        JSON.stringify(mockUser)
      );
    });
  });

  describe("getUser", () => {
    it("should return the user if data exists in AsyncStorage", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockUser)
      );

      const user = await getUser();

      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(KEY);
      expect(user).toEqual(mockUser);
    });

    it("should return null if no data exists in AsyncStorage", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const user = await getUser();

      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(KEY);
      expect(user).toBeNull();
    });
  });

  describe("clearUser", () => {
    it("should remove the user from AsyncStorage", async () => {
      await clearUser();

      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(KEY);
    });
  });
});
