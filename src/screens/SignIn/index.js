import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from './../../assets/lock.svg';

export default () => {
    const [emailField, setEmailField] = useState('');
    const [passwordlField, setpasswordlField] = useState('');

    const navigation = useNavigation();

    const handleSignClick = async () => {
        if (emailField != '' && passwordlField != '') {

            let json = await Api.signIn(emailField, passwordlField);
            
            if (json.token) {
                alert("Deu certo!");
            } else {
                alert("E-mail e/ou senha incorretos!");
            }
        } else {
            alert("Preencha os campos!");
        }
    }
    
    const handleMessageButtomClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
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
                    <CustomButtonText>Entrar</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessageButtomClick}>
                <SignMessageButtonText>Ainda não possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}