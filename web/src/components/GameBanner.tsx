interface GameBannerProps {
    bannerURL: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <div className="keen-slider__slide relative rounded-lg overflow-hidden">
            <img className='w-full h-[240px] object-cover' src={props.bannerURL} alt={props.title} />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <p className='p-0 text-white'>
                    <strong className='font-bold block'>{props.title}</strong>
                    <span className='text-zinc-300 text-sm block'>
                        {props.adsCount === 0 ? 'Nenhum anúncio encontrado' : `${props.adsCount} anúncio${props.adsCount > 1 ? 's' : ''}`}
                    </span>
                </p>
            </div>
        </div>
    )
}