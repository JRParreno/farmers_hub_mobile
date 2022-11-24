import * as React from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import TextField from '../TextInput/TextField';
import { DefaultColor } from '../../constants/Colors';
import { ButtonComponent } from '../Button/StyledButton';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UpdateInformation } from '../../repository/UserRepository';
import { ErrorMessage } from '../../utils/ErrorMessage';
import { storeData } from '../../database/StoreData';
import Profile from "../../models/Profile";
import { ProfileContext } from "../../context/UserContext";


interface IProps {
    setLoading: (value: boolean) => void;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
}

export default function ProfileForm(props: IProps) {
    const { setLoading } = props;
    const navigation = useNavigation();
    const profileContext = useContext(ProfileContext);

    const registerSchema = yup.object({
        email: yup.string().required('Email address is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, 'Invalid email address format'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        mobile_number: yup.string().required('Mobile Number address is required').matches(/^9\d{9}$/, 'Invalid phone number format'),
    });

    const handleUpdateProfile = (
        email: string,
        first_name: string,
        last_name: string,
        mobile_number: string,
    ) => {
        setLoading(true);

        UpdateInformation(email, first_name, last_name, `+63${mobile_number}`,
        )
            .then(async (data: Profile) => {
                profileContext?.setProfile(data);
                await storeData('user', JSON.stringify(data));
                return Alert.alert("System", "Successfully updated your profile");

            })
            .catch((error: any) => {
                if (error.response) {
                    return Alert.alert("Error", error.response.data.error_message);
                }
                return ErrorMessage(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    email: props.email ?? '',
                    firstName: props.firstName ?? '',
                    lastName: props.lastName ?? '',
                    mobile_number: props.mobileNumber.slice(3) ?? '',
                }}
                validationSchema={registerSchema}
                onSubmit={async (values, actions) => {
                    const { email, firstName, lastName, mobile_number, } = values;
                    handleUpdateProfile(email, firstName, lastName, mobile_number,);
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
