import React from "react";
import { Button, View } from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
const Alert = () => {
  return (
    <AlertNotificationRoot>
      <View>
        <Button
          title={"Profile Success"}
          onPress={() =>
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Congrats! Profile success",
              button: "close",
            })
          }
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default Alert;
