import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
    return(
        <div className="bg-nlw-gradient pt-1 mt-8 w-full self-stretch rounded-xl">
            <div className='bg-[#2A2634] px-8 py-6 w-full rounded-lg flex justify-between items-center gap-3'>
            <div>
                <h2 className='text-2xl text-white font-extrabold block'>Não encontrou seu duo?</h2>
                <p className='text-zinc-400'>Publique um anúncio para encontrar novos players!</p>
            </div>
            <Dialog.Trigger className='py-3 px-4 transition-all bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
                <MagnifyingGlassPlus size={24} />
                Publicar anúncio
            </Dialog.Trigger>
            </div>
        </div>
    )
}