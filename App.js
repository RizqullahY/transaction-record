import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission Required');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        console.log(result["assets"]);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
            <Button title="Choose Picture" onPress={pickImage} />
            {image && (
                <Image source={{ uri: image }} style={{ width: '100%', height: 300 }} />
            )}
        </View>
    );
}
