import CustomerButton from "@/components/CustomerButton";
import CustomHeader from "@/components/CustomHeader";
import ProfileInputRow from "@/components/Profile";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const [name, setName] = useState("Monte Kristo");
  const [email, setEmail] = useState("monte@gmail.com");
  const [phone, setPhone] = useState("555 222 33 44");
  const [address, setAddress] = useState(
    "123 Main Street, Springfield, IL 62704"
  );

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  return (
    <AlertNotificationRoot>
      <SafeAreaView className="bg-white-100 h-full">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 pt-5 font-semibold">
            <CustomHeader title="Profile" />
          </View>

          <View className="flex justify-center items-center">
            <Image
              source={require("@/assets/profile/profilee.png")}
              style={{ width: 100, height: 100 }}
              className="rounded-2xl"
            />
          </View>

          <ProfileInputRow
            icon={require("@/assets/profile/Vector.png")}
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <ProfileInputRow
            icon={require("@/assets/profile/mail.png")}
            label="E-Mail"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={!isValidEmail && "Please enter a valid email address"}
          />

          <ProfileInputRow
            icon={require("@/assets/profile/phone.png")}
            label="Phone Number"
            placeholder="555 222 33 44"
            value={phone}
            onChangeText={setPhone}
          />

          <ProfileInputRow
            icon={require("@/assets/profile/location.png")}
            label="Address"
            placeholder="Your address"
            value={address}
            onChangeText={setAddress}
          />

          <View className="flex justify-center items-center mt-10 gap-3 pb-10">
            <CustomerButton
              title="Edit Profile"
              style="bg-primary w-[90%] py-3 rounded-xl"
              onPress={() => {
                Dialog.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Success",
                  textBody: "Congrats! Profile success",
                  button: "Close",
                });
              }}
            />

            <CustomerButton
              title="Logout"
              style="bg-red-500 w-[90%] py-3 rounded-xl"
              textStyle="text-white"
              onPress={() => {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Logged Out",
                  textBody: "You have successfully logged out.",
                });

                setTimeout(() => {
                  router.push("/");
                }, 1000);
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default ProfileTab;
