import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import Entypo from 'react-native-vector-icons/Entypo'
import { GameParams } from '../../@types/navigation';
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardsProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
    const [duos, setDuos] = useState<DuoCardsProps[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('')

    const route = useRoute();
    const game = route.params as GameParams
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack()
    }

    async function getDiscordUser(adsId: string) {
        fetch(`http://192.168.1.23:3333/ads/${adsId}/discord`)
            .then(res => res.json())
            .then(data => setDiscordDuoSelected(data.discord))

    }

    useEffect(() => {
        fetch(`http://192.168.1.23:3333/games/${game.id}/ads`)
            .then(res => res.json())
            .then(data => setDuos(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right} />
                </View>
                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode='cover'
                />
                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />
                <FlatList
                    data={duos}
                    horizontal
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() =>
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>}
                    renderItem={({ item }) =>
                        <DuoCard
                            data={item}
                            onConnect={() => getDiscordUser(item.id)}
                        />
                    }
                />
                <DuoMatch
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    );
}