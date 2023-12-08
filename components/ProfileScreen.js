// ProfileScreen.js
import React from "react";

const ProfileScreen = ({ navigation, route }) => {
  return (
    <div>
      <text>This is {route.params.name}'s profile</text>;
      <button
        text="Go back to home screen"
        onClick={() => navigation.navigate("Home")}
      />
    </div>
  );
};

export default ProfileScreen;
