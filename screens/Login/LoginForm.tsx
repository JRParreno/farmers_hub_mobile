import * as React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorMessage } from "../../utils/ErrorMessage";
import { ProfileContext } from "../../context/UserContext";
import { getProfile, login } from "../../repository/UserRepository";
import { storeData } from "../../database/StoreData";
import Profile from "../../models/Profile";
import { StackActions } from "@react-navigation/native";
import TextField from "../../components/TextInput/TextField";
import { PoppinText } from "../../components/StyledText";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { DefaultColor } from "../../constants/Colors";
import TouchableLink from "../../components/Touchable/TouchableLink";


interface IProps {
    setLoading: (value: boolean) => void;
}

export default function LoginForm(props: IProps) {
    // navigation
    const { setLoading } = props;
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const profileContext = useContext(ProfileContext);

    const loginSchema = yup.object({
        mobile_number: yup.string().required('Mobile Number address is required').matches(/^9\d{9}$/, 'Invalid phone number format'),
        password: yup.string().required('Password is required')
    });

    const handleProceedLogout = async () => {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
        props.setLoading(false);
    }

    const handleLogin = (mobile_number: string, password: string) => {
        // TODO login
        setLoading(true);
        login(`+63${mobile_number}`, password)
            .then((data: { accessToken: string, refreshToken: string, }) => {
                storeNavigate(data);
                handleGetProfile();
            })
            .catch((error: any) => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data.error_description) return Alert.alert("Error", error.response.data.error_description);
                    if (error.response.data.error_message) return Alert.alert("Error", error.response.data.error_message);
                    return Alert.alert("Error", error.response.data.error);
                }
                return ErrorMessage(error);
            });
    }

    const storeNavigate = async (token: any) => {
        await storeData('accessToken', token.accessToken);
        await storeData('refreshToken', token.refreshToken);
    }

    const handleGetProfile = () => {
        getProfile()
            .then(async (data: Profile) => {
                profileContext?.setProfile(data);
                await storeData('user', JSON.stringify(data));
                navigation.dispatch(StackActions.replace("Root"));
            })
            .catch((error: any) => {
                if (error.response) {
                    if (error.response.data.error_message) return Alert.alert("Error", error.response.data.error_message);
                    return Alert.alert("Error", error.response.data.error);
                }
                ErrorMessage(error);
            })
            .finally(() => {
                setLoading(false);
                navigation.dispatch(StackActions.replace('Root'));
            });
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Formik
                    initialValues={{
                        mobile_number: '9321764095',
                        password: '2020Rtutest@'
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (values, actions) => {
                        handleLogin(values.mobile_number, values.password);
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1, marginTop: 30 }}>
                            <TextField
                                text={values.mobile_number}
                                setText={handleChange('mobile_number')}
                                label={"Phone Number"}
                                errorMessage={errors.mobile_number}
                                touched={touched.mobile_number}
                                placeholder={"Enter Phone"}
                                phoneCode="+63"
                                keyboardType="number-pad"
                            />
                            <TextField
                                text={values.password}
                                setText={handleChange('password')}
                                label={"Password"}
                                secureEntry={showPassword}
                                toggleEye={() => setShowPassword(!showPassword)}
                                showPassword={showPassword}
                                errorMessage={errors.password}
                                touched={touched.password}
                                placeholder={"Enter Password"}
                            />
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end'
                                }}
                                onPress={() => {
                                    // @ts-ignore
                                    navigation.navigate("ForgotPassword")
                                }}
                            >
                                <PoppinText style={{
                                    color: DefaultColor.main
                                }}>Forgot Password</PoppinText>
                            </TouchableOpacity>

                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ButtonComponent
                                    title={"LOGIN"}
                                    onPress={handleSubmit}
                                    backgroundColor={DefaultColor.main}
                                />
                                <View style={{ flex: 0, alignItems: 'center', marginTop: 20 }}>
                                    <TouchableLink
                                        title={"Don't Have an Account yet? "}
                                        underlineText={"Sign up"}
                                        onPress={() => {
                                            // @ts-ignore
                                            navigation.navigate("Register")
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    linkContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
});


