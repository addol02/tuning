import bgHeader from '@/assets/bg_home.png'

export default function HomeHeader({ headTitle }: { headTitle: string }) {

    return (
        <div className="relative flex flex-col flex-wrap items-center lg:min-h-fit xs:bg-[#000] lg:bg-none">
                <div className="w-full xs:overlayimg-black lg:overlayimg-black xs:h-[auto] md:h-[auto]" style={{overflow: 'hidden'}}>
                    <img className="w-full" src={bgHeader}/>
                </div>
                <div className="absolute xs:top-[30%] lg:top-[40%] w-3/4 text-left text-white">
                    <p className="xs:text-[6vw] lg:text-[6vw] leading-tight font-bold">{headTitle}</p>
                    <span className="opacity-[0.6] text-[14px]">Your running story, perfectly archived. Chart your progress, celebrate your triumphs.</span>
                </div>
            </div>
    )

}