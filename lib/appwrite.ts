import { CreateUserPrams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwrite = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "6908921f00370af33691",
  userCollectionId: "user",
  platform: "com.monte.fastfood",
};

export const client = new Client();
client
  .setEndpoint(appwrite.endpoint)
  .setProject(appwrite.projectId)
  .setPlatform(appwrite.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserPrams) => {
  try {
    console.log("🟡 [createUser] Yeni kullanıcı oluşturuluyor...");

    const newAccount = await account.create(ID.unique(), email, password, name);
    console.log("✅ [createUser] Hesap oluşturuldu:", newAccount);

    if (!newAccount) throw new Error("Hesap oluşturulamadı!");

    const avatarUrl = avatars.getInitialsURL(name);
    console.log("🟢 [createUser] Avatar URL:", avatarUrl);

    try {
      await account.deleteSession("current");
      console.log("🧹 [createUser] Mevcut session temizlendi.");
    } catch {
      console.log("ℹ️ [createUser] Silinecek aktif session yok.");
    }

    console.log("🟡 [createUser] Kullanıcı oturumu başlatılıyor...");
    await account.createEmailPasswordSession(email, password);
    console.log("✅ [createUser] Oturum başarıyla başlatıldı.");

    console.log("🟡 [createUser] Kullanıcı veritabanına kaydediliyor...");
    const newUserDoc = await databases.createDocument(
      appwrite.databaseId,
      appwrite.userCollectionId,
      ID.unique(),
      {
        name,
        email,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    );

    console.log("✅ [createUser] Kullanıcı veritabanına eklendi:", newUserDoc);
    return newUserDoc;
  } catch (error: any) {
    console.error("❌ [createUser] Hata:", error.message || error);
    throw new Error(error.message || "Bilinmeyen hata oluştu");
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    console.log("🟡 [signIn] Oturum açılıyor...");

    // aktif bir session varsa sil
    try {
      await account.deleteSession("current");
      console.log("🧹 [signIn] Eski session temizlendi.");
    } catch {
      console.log("ℹ️ [signIn] Aktif session yok, devam ediliyor.");
    }

    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ [signIn] Oturum başarıyla açıldı:", session);
    return session;
  } catch (error: any) {
    console.error("❌ [signIn] Hata:", error.message || error);
    throw new Error(error.message || "Oturum açma hatası");
  }
};

export const getCurrentUser = async () => {
  try {
    console.log("🟡 [getCurrentUser] Mevcut kullanıcı getiriliyor...");

    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Kullanıcı oturumu bulunamadı");

    const currentUser = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length)
      throw new Error("Kullanıcı veritabanında bulunamadı");

    console.log(
      "✅ [getCurrentUser] Kullanıcı bulundu:",
      currentUser.documents[0]
    );
    return currentUser.documents[0];
  } catch (error: any) {
    console.error("❌ [getCurrentUser] Hata:", error.message || error);
    throw new Error(error.message || "Kullanıcı bilgisi alınamadı");
  }
};
