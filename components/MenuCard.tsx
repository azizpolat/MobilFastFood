import { MenuItem } from "@/type";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const [loading, setLoading] = useState(true);
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <View className="size-32 absolute -top-5 justify-center items-center rounded">
        {loading && <ActivityIndicator size="small" color="text-primary" />}
        <Image
          source={{ uri: item?.item?.image_url }}
          className="size-32 absolute -top-10"
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {item?.item?.name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">
        From ${item?.item?.price}
      </Text>
      <TouchableOpacity
      // onPress={() =>
      //   addItem({
      //     id: $id,
      //     name,
      //     price,
      //     image_url: imageUrl,
      //     customizations: [],
      //   })
      // }
      >
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
