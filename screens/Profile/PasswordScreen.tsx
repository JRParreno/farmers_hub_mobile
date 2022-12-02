import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { ButtonComponent } from "../../components/Button/StyledButton";
import TextField from "../../components/TextInput/TextField";
import ViewWithLoading from "../../components/ViewWithLoading";
import { updateProfilePassword } from "../../repository/UserRepository";
import { ErrorMessage } from "../../utils/ErrorMessage";

export default function PasswordScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();

    const passwordError =
        "Your password must contain at least 8 to 16 characters, a combination of upper and lowercase letters, and at least one number or symbol.";
    const [oldPasswordShow, setOldPasswordShow] = useState<boolean>(true);
    const [passwordShow, setPasswordShow] = useState<boolean>(true);
    const [retypePasswordShow, setRetypePasswordShow] = useState<boolean>(true);

    const passwordSchema = yup.object({
        oldPassword: yup.string().required("Old password is required"),
        newPassword: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?:(?=.*[0-9])(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)).*$/,
                passwordError
            ),
        confirmPassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
    });

    const handleChangePassword = (oldPassowrd: string, newPassword: string) => {
        setLoading(true);
        updateProfilePassword(oldPassowrd, newPassword)
            .then(() => {
                Alert.alert("Farm Hub", "Successfully update your password", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]);
            })
            .catch((error: any) => {
                console.log(error);
                if (error.response) {
                    return Alert.alert("Error", error.response.data.error_message);
                }

                ErrorMessage(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ViewWithLoading loading={loading}>
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={passwordSchema}
                    onSubmit={(values, actions) => {
                        handleChangePassword(values.oldPassword, values.newPassword);
                    }}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextField
                                    text={values.oldPassword}
                                    setText={handleChange("oldPassword")}
                                    label={"Old Password"}
                                    errorMessage={errors.oldPassword}
                                    touched={touched.oldPassword}
                                    secureEntry={oldPasswordShow}
                                    toggleEye={() => {
                                        setOldPasswordShow(!oldPasswordShow);
                                    }}
                                    showPassword={oldPasswordShow}
                                />
                                <TextField
                                    text={values.newPassword}
                                    setText={handleChange("newPassword")}
                                    label={"Retype Password"}
                                    errorMessage={errors.newPassword}
                                    touched={touched.newPassword}
                                    secureEntry={passwordShow}
                                    toggleEye={() => {
                                        setPasswordShow(!passwordShow);
                                    }}
                                    showPassword={passwordShow}
                                />
                                <TextField
                                    text={values.confirmPassword}
                                    setText={handleChange("confirmPassword")}
                                    label={"Confirm Password"}
                                    errorMessage={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                    secureEntry={retypePasswordShow}
                                    toggleEye={() => {
                                        setRetypePasswordShow(!retypePasswordShow);
                                    }}
                                    showPassword={retypePasswordShow}
                                />
                            </View>

                            <View
                                style={{ flex: 0, justifyContent: "center", marginTop: 20 }}
                            >
                                <ButtonComponent title={"SUBMIT"} onPress={handleSubmit} />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
    },
});
