import * as React from "react";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { resize } from "../../utils/ImageResize";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { checkCameraPermission, checkMediaPermission } from "../../permissions/mediaPermission";
import { Image } from "react-native-elements";
import { createPost } from "../../repository/PostRepository";
import { ErrorMessage } from "../../utils/ErrorMessage";

export default function PostCreateScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [image, setImage] = useState("");
    const navigation = useNavigation();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            resize(result.uri!)
                .then((photo: any) => {
                    const newImage = "data:image/jpeg;base64," + photo.base64;
                    setImage(newImage);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const takePhoto = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            resize(result.uri!)
                .then((photo: any) => {
                    const newImage = "data:image/jpeg;base64," + photo.base64;
                    setImage(newImage);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleCreatePost = () => {
        setLoading(true);
        createPost(image, text).catch((error: any) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.detail
            ) {
                return true;
            }
            ErrorMessage(error);
        })
            .finally(() => {
                setLoading(false);
                navigation.goBack();
            });
    }

    return <ViewWithLoading loading={loading}>
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <PoppinText
                    style={{ fontFamily: "poppins-semibold", fontSize: 30 }}
                >Create Post</PoppinText>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    multiline={true}
                    placeholder={"What's on your mind?"}
                    style={styles.inputStyle}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    clearButtonMode={'while-editing'}
                    placeholderTextColor={"#C9C9C9"}
                />

                {image.length !== 0 &&
                    <Image
                        resizeMode="cover"
                        source={{ uri: image }}
                        PlaceholderContent={<ActivityIndicator />}
                        height={200}
                        width={"100%"}
                        containerStyle={{
                            flex: 1,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: DefaultColor.white,
                            borderRadius: 10,
                            elevation: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}
                    />
                }
                {image.length === 0 ?
                    <React.Fragment>
                        <ButtonComponent title="Upload Photo"
                            backgroundColor={DefaultColor.secondary}
                            onPress={async () => {
                                const permission = await checkMediaPermission();

                                if (permission) {
                                    pickImage();
                                }
                            }}
                        />
                        <ButtonComponent
                            backgroundColor={DefaultColor.secondary}
                            title="Take Photo" onPress={async () => {
                                const permission = await checkCameraPermission();

                                if (permission) {
                                    takePhoto();
                                }
                            }} />
                    </React.Fragment>
                    :
                    <ButtonComponent
                        backgroundColor={DefaultColor.secondary}
                        title="Change Photo" onPress={async () => {
                            setImage("");
                        }} />
                }
            </ScrollView>
            <ButtonComponent title="Post" onPress={async () => {
                handleCreatePost();
            }} />
        </View>
    </ViewWithLoading>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultColor.bgList,
        padding: 10
    },
    inputStyle: {
        maxHeight: 300,
        minHeight: 100,
        backgroundColor: DefaultColor.white,
        borderWidth: 1,
        borderColor: DefaultColor.white,
        borderRadius: 5,
        padding: 10
    }
});
