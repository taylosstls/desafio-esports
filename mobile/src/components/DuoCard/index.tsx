import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';
import { DuoInfo } from '../DuoInfo';
import { THEME } from '../../theme';

export interface DuoCardProps {
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label='Nome' value={data.name} />
      <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying === 0 ? 'Menos de 1 ano' : data.yearsPlaying === 1 ? `${data.yearsPlaying} ano` : `${data.yearsPlaying} anos`}`} />
      <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
      <DuoInfo label='Chamada de áudio?' value={data.useVoiceChannel ? "Sim" : "Não"} colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}