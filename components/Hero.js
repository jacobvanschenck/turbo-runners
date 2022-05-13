import Image from 'next/image'

export default function Hero() {
    return (
        <section className="h-[110vh] relative flex w-screen justify-center items-center">
            <div className="">
                <Image
                    className="object-cover object-top absolute opacity-60"
                    src="/metrocity.png"
                    alt="Metrocity"
                    layout="fill"
                    quality={100}
                />
            </div>
            <div className="flex-col w-1/2 max-w-3xl justify-center items-center z-10 p-10">
                <div>
                    <h1 className="font-lasercorps text-7xl">Welcome to</h1>
                    <h1 className="font-lasercorps text-7xl pb-5">Metrocity</h1>
                </div>
                <p className="text-lg">
                    In a future of control and oppression, Turbo Runners fight
                    for independance and freedom
                </p>
            </div>
        </section>
    )
}
