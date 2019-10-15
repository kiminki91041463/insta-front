import React, { useState } from "react"
import { TouchableWithoutFeedback, Keyboard } from "react-native"
import styled from "styled-components"
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native"
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
    justify-content : center;
    align-items : center;
    flex:1;
`;

const Text = styled.Text`

`;

export default ({ navigation }) => {
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    });
    const handleLogin = async () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === "") {
            return Alert.alert("Email can't be Empty");
        } else if (!value.includes("@") || !value.includes(".")) {
            return Alert.alert("Please write an email address");
        } else if (!emailRegex.test(value)) {
            return Alert.alert("That email is invalid")
        }
        try {
            setLoading(true);
            const { data } = await requestSecretMutation();
            console.log(data)
            // if (requestSecret) {
            Alert.alert("Check your email");
            navigation.navigate("Confirm")
            return;
            // } else {
            // Alert.alert("Account not found")
            // navigation.navigate("Signup")
            // }
        } catch (error) {
            Alert.alert("Can't log In now")
        } finally {
            setLoading(false)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...emailInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="send"
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                ></AuthInput>
                <AuthButton onPress={handleLogin} loading={loading} text={"Log In"}></AuthButton>
            </View>
        </TouchableWithoutFeedback>
    )
}

