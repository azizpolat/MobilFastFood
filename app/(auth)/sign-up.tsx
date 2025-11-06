import CustomerButton from "@/components/CustomerButton";
import CustomerInput from "@/components/CustomerInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SingUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password)
      return Alert.alert(
        "Error",
        "Please enter valid name & email address & password."
      );

    setIsSubmitting(true);

    try {
      await createUser({
        email: email,
        password: password,
        name: form.name,
      });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomerInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Name"
      />

      <CustomerInput
        placeholder="Enter your mail"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
        label="Email"
      />

      <CustomerInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry={true}
        label="Password"
      />
      <CustomerButton
        title=" Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex justify-center mt-5 flex-row gap-3">
        <Text className="base-regular text-gray-100">
          Already have an account
        </Text>
        <Link href="/(auth)/sign-in" className="base-bold text-primary">
          Sing In
        </Link>
      </View>
    </View>
  );
};

export default SingUp;
