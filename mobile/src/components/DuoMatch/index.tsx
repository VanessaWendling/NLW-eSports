import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native'
import { styles } from './styles';
import { Heading } from '../Heading';

import Clipboard from '@react-native-community/clipboard'

interface Props extends ModalProps {
    discord: string,
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [copping, setIsCopping] = useState<boolean>(false)


    function handleCopyDiscordToClipboard() {
        setIsCopping(true)
        Clipboard.setString(discord)

        Alert.alert("Discord copiado", "Usuário na área de transferência! Pesquise no seu discord")
        setIsCopping(false)
    }


    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />
                    <Heading
                        title="Let's play!"
                        subtitle='Agora é só começar a jogar!'
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />
                    <Text style={styles.label}>Adicione no discord</Text>
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={copping}
                    >
                        <Text style={styles.discord}>
                            {copping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}