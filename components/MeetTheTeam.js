import TeamMemberCard from './TeamMemberCard'

export default function MeetTheTeam() {
    return (
        <section id="team">
            <div className="flex flex-col p-24">
                <h2 className="font-lasercorpshalf w-fit text-6xl pb-6 place-self-center">
                    Meet the Team
                </h2>
                <div className="flex justify-evenly space-x-10">
                    <TeamMemberCard
                        name={'Vincent'}
                        job={'Lead Developer'}
                        pic={'/../public/team-pictures/pic1.png'}
                    >
                        <p>
                            A Jack of all trades, and a master of Solidity,
                            Vincent is the swiss army knife of the team when it
                            comes to development, and carries the infrastructure
                            of the tribe on his capable shoulders.
                        </p>
                    </TeamMemberCard>
                    <TeamMemberCard
                        name={'Sarah'}
                        job={'Artist'}
                        pic={'/../public/team-pictures/pic2.png'}
                    >
                        <p>
                            With 8 years of experience in the creative space
                            across a multidisciplinary career, Sarah is the
                            creative rocketfuel that will take the Turbo Runners
                            to the moon.
                        </p>
                    </TeamMemberCard>
                    <TeamMemberCard
                        name={'Gregory'}
                        job={'Marketing'}
                        pic={'/../public/team-pictures/pic3.png'}
                    >
                        <p>
                            Professional digital marketer by day. A catalyst for
                            memorably fun but bad decisions by night.
                        </p>
                    </TeamMemberCard>
                </div>
            </div>
        </section>
    )
}
