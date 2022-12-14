import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles';

export function Home() {
    const [game, setGames] = useState<GameCardProps[]>([])
    useEffect(() => {
        fetch('http://192.168.1.23:3333/games')
            .then(res => res.json())
            .then(data => setGames(data))
    }, [])

    const navigation = useNavigation()
    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Heading
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />
                <FlatList
                    data={game}
                    keyExtractor={item => item.id}
                    renderItem={({ item }: any) =>
                        <GameCard
                            key={item.id}
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    );
}