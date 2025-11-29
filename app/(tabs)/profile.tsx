import CustomerButton from "@/components/CustomerButton";
import CustomHeader from "@/components/CustomHeader";
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <SafeAreaView className="bg-white-100 h-full">
      <View className="px-5 pt-5">
        <CustomHeader title="Profile" />
      </View>
      <View className="flex justify-center items-center">
        <Image
          source={require("@/assets/profile/profilee.png")}
          style={{ width: 100, height: 100 }}
          className="rounded-2xl"
        />
      </View>
      <View className="flex flex-row items-center mt-8 px-2">
        <View className="cart-btn-new flex items-center justify-center rounded-xl bg-[#FFF9F2] w-12 h-12 mr-4">
          <Image
            source={require("@/assets/profile/Vector.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1">
          <Text className="text-gray-500 text-sm mb-1">Full Name</Text>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Aziz Polat"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      <View className="flex flex-row items-center mt-8 px-2">
        <View className="cart-btn-new flex items-center justify-center rounded-xl bg-[#FFF9F2] w-12 h-12 mr-4">
          <Image
            source={require("@/assets/profile/mail.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1">
          <Text className="text-gray-500 text-sm mb-1">E-Mail</Text>

          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            autoCorrect={false}
            placeholder="monte@gmail.com"
            placeholderTextColor="#888"
          />
        </View>
      </View>
      <View className="flex flex-row items-center mt-8 px-2">
        <View className="cart-btn-new flex items-center justify-center rounded-xl bg-[#FFF9F2] w-12 h-12 mr-4">
          <Image
            source={require("@/assets/profile/phone.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1">
          <Text className="text-gray-500 text-sm mb-1">Phone Number</Text>

          <TextInput
            autoCapitalize="none"
            textContentType="emailAddress"
            autoCorrect={false}
            placeholder="+09 555 222 33 44"
            placeholderTextColor="#888"
          />
        </View>
      </View>
      <View className="flex flex-row items-center mt-8 px-2">
        <View className="cart-btn-new flex items-center justify-center rounded-xl bg-[#FFF9F2] w-12 h-12 mr-4">
          <Image
            source={require("@/assets/profile/location.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1">
          <Text className="text-gray-500 text-sm mb-1">Address</Text>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="123 Main Street, Springfield, IL 62704"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      <View className="flex justify-center items-center mt-10 gap-3">
        <CustomerButton title="Edit Profile" />
        <CustomerButton title="Logout" style="bg-red-400" />
      </View>
    </SafeAreaView>
  );
};

export default ProfileTab;
