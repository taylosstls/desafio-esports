import { useEffect, useState, FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { GameController, Check, CaretDown } from 'phosphor-react'
import { Input } from '../components/Form/Input'
import axios from 'axios'

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => {
            const sortTitleGames = response.data.slice().sort((a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title))
            setGames(sortTitleGames)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name) {
            return
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,

            })
            alert('Anúncio criado com sucesso!')
        } catch (error) {
            console.log(error)
            alert('Erro ao criar o anúncio!')
        }
    }

    return(
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed z-10 grid place-items-center overflow-y-auto'>
            <Dialog.Content className='bg-[#2A2634] py-8 px-10 text-white w-full max-w-[500px] rounded-lg z-20 shadow-lg shadow-black/25'>
              <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='font-semibold' htmlFor='game'>Qual o game?</label>
                    <div className='relative'>
                        <CaretDown size={20} className='absolute pointer-events-none right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
                        <select id='game' name='game' className='bg-zinc-900 w-full py-3 px-4 rounded text-sm disabled:text-zinc-500 appearance-none' defaultValue=''>
                            <option disabled value="" className="text-gray-400 cursor-not-allowed">Selecione o game que deseja jogar</option>
                            {games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)}
                        </select>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='name'>Seu nome (ou nickname)</label>
                    <Input id='name' name='name' type='text' placeholder='Como te chamam dentro do game?' />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                      <Input id='yearsPlaying' name='yearsPlaying' type='number' min={0} max={20} maxLength={2} placeholder='Tudo bem ser ZERO' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='discord'>Qual seu Discord?</label>
                      <Input id='discord' name='discord' type='text' placeholder='Usuario#0000' />
                    </div>
                  </div>

                  <div className='flex gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label>Quando costuma jogar?</label>
                        <ToggleGroup.Root type='multiple' id='weekDays' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>
                        {daysOfWeek.map((day, index) => (
                            <ToggleGroup.Item key={index} className='w-8 h-8 rounded bg-zinc-900 transition-all data-[state="on"]:bg-violet-500' value={index.toString()} >
                            {day}
                            </ToggleGroup.Item>
                        ))}
                        </ToggleGroup.Root>
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                      <label htmlFor='hourStart'>Qual horário do dia?</label>
                      <div className='grid grid-cols-2 gap-2'>
                        <Input id='hourStart' name='hourStart' type='time' placeholder='De' />
                        <Input id='hourEnd' name='hourEnd' type='time' placeholder='Até' />
                      </div>
                    </div>
                  </div>

                  <div className='mt-2 flex items-center gap-2 text-sm'>
                    <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                        checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
                    }} className="w-6 h-6 p-1 rounded bg-zinc-900" defaultChecked id="voiceChat">
                        <Checkbox.Indicator>
                            <Check className='w-4 h-4 text-emerald-400' />
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label htmlFor="voiceChat">
                        Costumo me conectar ao chat de voz
                    </label>
                  </div>

                  <footer className='mt-4 flex justify-end gap-4'>
                    <Dialog.Close className='bg-zinc-500 hover:bg-zinc-600 transition-all px-5 h-12 rounded-md font-semibold' type='button'>Cancelar</Dialog.Close>
                    <button className='bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3' type='submit'>
                      <GameController size={24} />Encontrar duo
                    </button>
                  </footer>

                </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
    )
}