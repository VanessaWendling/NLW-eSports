import React from 'react';
import { StatusBar } from 'react-native';
import { Background } from './components/Background';
import { Routes } from './routes/';


export function App() {
    return (
        <Background>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Routes />
        </Background>
    );
}