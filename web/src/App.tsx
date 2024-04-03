import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import './styles/main.css'
import logoNLW from './assets/logo-nlw-esports.svg'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img className='max-w-64' src={logoNLW} alt='Logo NLW eSports' />

      <h1 className='text-6xl text-center text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>
      
      {/**TO DO https://keen-slider.io/docs */}
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map(game => {
            return (
            <GameBanner key={game.id} bannerURL={game.bannerURL} title={game.title} adsCount={game._count.ads} />
            )
          })
        }
        
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />

      </Dialog.Root>

    </div>
  )
}

export default App
