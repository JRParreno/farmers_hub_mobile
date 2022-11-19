import * as React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    Linking,
} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { drawerData } from './DrawerItems';
import {
    Ionicons, MaterialCommunityIcons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { Drawer, Title, Caption } from 'react-native-paper';
import { useContext } from 'react';
import { Avatar } from 'react-native-elements';
import { DefaultColor } from '../constants/Colors';
import { ProfileContext } from '../context/UserContext';

const DrawerContent = (props: any) => {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const navigation = props.navigation;
    const [alertPresent, setAlertPresent] = React.useState<boolean>(false);
    const userContext = useContext(ProfileContext);


    const handleLogout = async () => {
        Alert.alert("Farm Hub", "Are you sure you want to logout?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { }
                },
                {
                    text: 'Ok',
                    style: 'destructive',
                    onPress: () => handleProceedLogout()
                },
            ]
        )
    };

    const handleProceedLogout = async () => {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']).finally(() => {
            userContext?.setProfile(null);
            navigation.dispatch(StackActions.replace('Root'));
        });
    }

    const handleHelpUrl = async () => {
        await Linking.openURL('google.com');
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.userInfoSection, {
                    backgroundColor: props.state.index === props.state.routes.findIndex((e: any) => e.name === 'ProfileDrawer') ? DefaultColor.main : DefaultColor.main
                }]}>
                    <TouchableOpacity onPress={() => {
                        if (userContext?.profile) {
                            // navigate profile
                            return;
                        }
                        // @ts-ignore
                        return navigation.navigate('Login')
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                            {userContext?.profile?.profilePhoto ?
                                <Avatar
                                    size={'large'}
                                    source={{ uri: userContext.profile!.profilePhoto }}
                                    rounded
                                    containerStyle={{ padding: 5, borderWidth: 1, borderColor: DefaultColor.white }}
                                />
                                :
                                <Ionicons
                                    name={"person-circle"}
                                    size={55}
                                    style={{ alignSelf: 'center' }}
                                    color={DefaultColor.white}
                                />
                            }

                            <View style={{ flex: 0, width: '60%', marginLeft: 15, justifyContent: 'center' }}>
                                {userContext?.profile && (
                                    <Title
                                        style={[styles.title, { color: DefaultColor.white }]}
                                        numberOfLines={1}
                                    >{userContext.profile.getFullName}</Title>
                                )}
                                <Caption style={[styles.caption, { color: DefaultColor.white }]}>
                                    {userContext?.profile ? "View Profle" : "Login"}</Caption>
                                <Caption style={[styles.caption, { color: DefaultColor.white }]}>V1.0.6</Caption>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    {drawerData.map((data) => {
                        if (data.name === "Community") {
                            if (userContext?.profile) {
                                return <View key={data.name}>
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Ionicons
                                                name={data.icon as any}
                                                color={props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen) ? DefaultColor.white : DefaultColor.main}
                                                size={30}
                                            />
                                        )}
                                        label={data.name}
                                        onPress={() => {
                                            navigation.navigate(data.screen);
                                        }}
                                        labelStyle={{ fontFamily: 'poppins-regular', fontSize: 14, color: props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen) ? DefaultColor.white : DefaultColor.black }}
                                        focused={props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen)}
                                        activeBackgroundColor={props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen) ? DefaultColor.main : undefined}
                                    />
                                </View>
                            } else {
                                return <View key={data.name} />;
                            }
                        }
                        return <View key={data.name}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name={data.icon as any}
                                        color={props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen) ? DefaultColor.white : DefaultColor.main}
                                        size={30}
                                    />
                                )}
                                label={data.name}
                                onPress={() => {
                                    if (data.name === 'Help') {
                                        Alert.alert("Farm Hub", "Help");
                                    } else if (data.name === 'Privacy Policy') {
                                        Alert.alert("Farm Hub", "Privacy Policy");
                                    } else {
                                        navigation.navigate(data.screen);
                                    }
                                }}
                                labelStyle={{ marginLeft: data.icon === 'bike-fast' ? 3 : 0, fontFamily: 'poppins-regular', fontSize: 14, color: props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen) ? DefaultColor.white : DefaultColor.black }}
                                focused={props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen)}
                                activeBackgroundColor={props.state.index === props.state.routes.findIndex((e: any) => e.name === data.screen) ? DefaultColor.main : undefined}
                            />
                        </View>
                    })}
                </Drawer.Section>
            </ScrollView>
            {userContext?.profile ?
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="log-out"
                                color={DefaultColor.main}
                                size={30}
                            />
                        )}
                        label="Log Out"
                        onPress={handleLogout}
                        labelStyle={{ fontFamily: 'poppins-regular', fontSize: 14, color: DefaultColor.black }}
                    />
                </Drawer.Section>
                :
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="people"
                                color={DefaultColor.main}
                                size={30}
                            />
                        )}
                        label="Join our community"
                        onPress={() => {
                            // REGISTER
                            navigation.navigate("Register");
                        }}
                        labelStyle={{ fontFamily: 'poppins-regular', fontSize: 14, color: DefaultColor.black }}
                    />
                </Drawer.Section>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerSection: {
        marginTop: 15,
        backgroundColor: DefaultColor.white
    },
    userInfoSection: {
        flex: 0,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DefaultColor.main
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    topDrawerSection: {
        flex: 1,
        backgroundColor: DefaultColor.main
    }
});

export default DrawerContent;