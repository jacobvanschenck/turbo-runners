import RoadmapItem from './RoadmapItem'

export default function Roadmap() {
    return (
        <section
            id="roadmap"
            className="flex flex-col justify-center items-center p-24 mt-4 bg-[#321450]"
        >
            <h2 className="font-lasercorpshalf w-fit text-6xl pb-6">
                Launch Roadmap
            </h2>
            <div className="grid gap-x-10 gap-y-14 grid-cols-3">
                <RoadmapItem title={'Pre-Mint Phase'}>
                    <li>Official website launch</li>
                    <li>Marketing and awareness</li>
                    <li>
                        Amplification via collaboration with Twitter verified
                        influencers
                    </li>
                </RoadmapItem>
                <RoadmapItem title={'Pre-Mint Phase'}>
                    <li>10 max supply</li>
                    <li>
                        Launch of secondary marketplace on OpenSea and LooksRare
                    </li>
                    fluencers
                </RoadmapItem>
                <RoadmapItem title={'Periodical Floor Sweeps'}>
                    <li>
                        25% Mint ETH will Periodically Floor Sweep to maintain
                        the floor price Above Minting Price.
                    </li>
                    <li>
                        We want to ensure our early Trubo Runner Holder to be
                        profitable.
                    </li>
                </RoadmapItem>
                <RoadmapItem title={'Weekly Potential 10X NFT Recommendation'}>
                    <li>
                        We use tools to Monitor NFT Whales to find out trending
                        Potential 10X NFT Project.
                    </li>
                    <li>
                        As BAYC and MAYC OG Investor, Our team knows how to
                        invest potential NFT Project at Early Stage.
                    </li>
                </RoadmapItem>
                <RoadmapItem title={'50% – SOLD'}>
                    <li>
                        All Turbo Runners Holder get put in a raffle for 2 x
                        Arcade Land NFT
                    </li>
                    <li>
                        Turbo Runners must be listed above 0.5E to qualify for
                        raffle
                    </li>
                </RoadmapItem>
                <RoadmapItem title={'75% – SOLD'}>
                    <li>
                        All Turbo Runners Holder get put in a raffle for 2 x
                        Cool Pet NFT
                    </li>
                    <li>
                        Turbo Runners must be listed above 0.5E to qualify for
                        raffle
                    </li>
                </RoadmapItem>
                <RoadmapItem title={'100% – SOLD OUT'}>
                    <li>
                        All Turbo Runners get put in a raffle for 1 x Azuki NFT
                    </li>
                    <li>
                        Turbo Runners must not listed for sell or be listed
                        above 0.5E to qualify for raffle
                    </li>
                </RoadmapItem>
            </div>
        </section>
    )
}
