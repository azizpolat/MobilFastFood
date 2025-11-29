import cn from "clsx";
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

const ProfileInputRow = ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error,
}: {
  icon: any;
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  error?: string | boolean;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View className="flex flex-row items-center mt-8 px-2">
      <View className="cart-btn-new flex items-center justify-center rounded-xl bg-[#FFF9F2] w-12 h-12 mr-4">
        <Image
          source={icon}
          style={{ width: 22, height: 22 }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1">
        <Text className="text-gray-500 text-sm mb-1">{label}</Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "rounded-xl px-3 py-2 border",
            focused ? "border-orange-500" : "border-gray-300",
            error && "border-red-500"
          )}
        />

        {error && (
          <Text className="text-red-500 text-xs mt-1">
            {typeof error === "string" ? error : "Invalid value"}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfileInputRow;
