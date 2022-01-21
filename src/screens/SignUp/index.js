import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../contexts/UserContext';

import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import SignInput from '../../components/SignInput';

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from './../../assets/lock.svg';
import PersonIcon from './../../assets/person.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const [emailField, setEmailField] = useState('');
    const [passwordlField, setpasswordlField] = useState('');
    const [nameField, setnameField] = useState('');

    const navigation = useNavigation();

    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordlField != '') {
            let res = await Api.signUp(nameField, emailField, passwordlField);
            if(res.token) {
                await AsyncStorage.setItem('token', res.token)
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                });
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });
            } else {
                alert('Erro: ' + res.error);
            }
        } else {
            alert("Preencha os campos.")
        }
    }
    
    const handleMessageButtomClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setnameField(t)}
                />
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordlField}
                    onChangeText={t => setpasswordlField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessageButtomClick}>
                <SignMessageButtonText>Já possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça o login.</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}