import * as React from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import TextField from '../TextInput/TextField';
import { DefaultColor } from '../../constants/Colors';
import { ButtonComponent } from '../Button/StyledButton';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { getProfile, register } from '../../repository/UserRepository';
import { ErrorMessage } from '../../utils/ErrorMessage';
import { storeData } from '../../database/StoreData';
import moment from 'moment';
import TouchableLink from '../Touchable/TouchableLink';
import Profile from "../../models/Profile";
import { ProfileContext } from "../../context/UserContext";


interface IProps {
    setLoading: (value: boolean) => void;
}

export default function RegisterForm(props: IProps) {
    const { setLoading } = props;
    const navigation = useNavigation();
    const profileContext = useContext(ProfileContext);
    const passwordError = "Your password must contain at least 8 to 16 characters, a combination of upper and lowercase letters, and at least one number or symbol.";
    const [passwordShow, setPasswordShow] = useState<boolean>(true);
    const [retypePasswordShow, setRetypePasswordShow] = useState<boolean>(true);

    const registerSchema = yup.object({
        email: yup.string().required('Email address is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, 'Invalid email address format'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        password: yup.string().required('Password is required').matches(/^(?:(?=.*[0-9])(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)).*$/, passwordError),
        retypePassword: yup.string().required('Retype is required').oneOf([yup.ref('password'), null], 'Retype Password must match'),
        mobile_number: yup.string().required('Mobile Number address is required').matches(/^9\d{9}$/, 'Invalid phone number format'),
    });

    const getUserProfile = () => {
        getProfile()
            .then(async (data: Profile) => {
                profileContext?.setProfile(data);
                await storeData('user', JSON.stringify(data));
            })
            .catch((error: any) => {
                ErrorMessage(error);
            })
            .finally(() => {
                setLoading(false);
                navigation.dispatch(StackActions.replace('Root'));
            });
    }

    const handleRegister = (
        email: string,
        first_name: string,
        last_name: string,
        password: string,
        confirm_password: string,
        mobile_number: string,
    ) => {
        setLoading(true);

        register(email, first_name, last_name,
            password, confirm_password,
            `+63${mobile_number}`,
        )
            .then(async (data: { accessToken: string, refreshToken: string }) => {
                await storeData('accessToken', data.accessToken);
                await storeData('refreshToken', data.refreshToken);
                getUserProfile();
            })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
                if (error.response) {
                    return Alert.alert("Error", error.response.data.error_message);
                }
                return ErrorMessage(error);
            });
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    mobile_number: '',
                    password: '',
                    retypePassword: '',
                }}
                validationSchema={registerSchema}
                onSubmit={async (values, actions) => {
                    const { email, firstName, lastName, password, retypePassword, mobile_number, } = values;
                    handleRegister(email, firstName, lastName, password, retypePassword, mobile_number,);
                }}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1, }}>
                        <TextField
                            text={values.firstName}
                            setText={handleChange('firstName')}
                            label={"First name"}
                            errorMessage={errors.firstName}
                            touched={touched.firstName}
                        />
                        <TextField
                            text={values.lastName}
                            setText={handleChange('lastName')}
                            label={"Last name"}
                            errorMessage={errors.lastName}
                            touched={touched.lastName}
                        />
                        <TextField
                            text={values.mobile_number}
                            setText={handleChange('mobile_number')}
                            label={"Phone Number"}
                            errorMessage={errors.mobile_number}
                            touched={touched.mobile_number}
                            phoneCode="+63"
                        />
                        <TextField
                            text={values.email}
                            setText={handleChange('email')}
                            label={"Email"}
                            errorMessage={errors.email}
                            touched={touched.email}
                        />
                        <TextField
                            text={values.password}
                            setText={handleChange('password')}
                            label={"Password"}
                            errorMessage={errors.password}
                            touched={touched.password}
                            secureEntry={passwordShow}
                            toggleEye={() => {
                                setPasswordShow(!passwordShow)
                            }}
                            showPassword={passwordShow}
                        />
                        <TextField
                            text={values.retypePassword}
                            setText={handleChange('retypePassword')}
                            label={"Retype Password"}
                            errorMessage={errors.retypePassword}
                            touched={touched.retypePassword}
                            secureEntry={retypePasswordShow}
                            toggleEye={() => {
                                setRetypePasswordShow(!retypePasswordShow)
                            }}
                            showPassword={retypePasswordShow}
                        />
                        <View style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, marginBottom: 20 }}>
                            <TouchableLink
                                title={"By signing up, you agree to the "}
                                onPress={() => navigation.navigate('PrivacyPolicy')}
                                styleText={{
                                    fontFamily: "poppins-regular",
                                    fontSize: 14,
                                }}
                                style={{ alignSelf: 'flex-start' }}
                                underlineText={'Terms of Use and Privacy Policy '}
                            />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <TouchableLink
                                title={""}
                                onPress={() => navigation.navigate('Login')}
                                styleText={{
                                    fontFamily: "poppins-regular",
                                    fontSize: 14,
                                }}
                                style={{ alignSelf: 'center' }}
                                underlineText={'Login here'}
                            />
                        </View>

                        <View style={{ flex: 0, justifyContent: 'center', marginTop: 20 }}>
                            <ButtonComponent
                                title={"SUBMIT"}
                                onPress={handleSubmit}
                                backgroundColor={DefaultColor.main}
                            />

                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
