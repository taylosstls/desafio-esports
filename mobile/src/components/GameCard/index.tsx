import React from 'react';
import { Text, ImageBackground, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';

export interface GameCardProps {
    id: string;
    title: string;
    _count: {
      ads: number;
    }
    bannerURL: string;
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps
}

export function GameCard( { data, ...rest } : Props) {
  return (
    <TouchableOpacity style={styles.container} { ...rest }>
        <ImageBackground style={styles.cover} source={{uri: data.bannerURL}}>
          <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
            <Text style={styles.name}>{data.title}</Text>
            <Text style={styles.ads}>{data._count.ads === 0 ? 'Nenhum anúncio encontrado' : `${data._count.ads} anúncio${data._count.ads > 1 ? 's' : ''}`}</Text>
          </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
  );
}