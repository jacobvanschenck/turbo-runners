export default function RoadmapItem(props) {
    return (
        <div className="flex flex-col h-80 border-2 rounded-md p-4">
            <h3 className="uppercase text-2xl mt-4">{props.title}</h3>
            <div className="border-b-2 my-2" />
            <ul className="list-disc ml-6">{props.children}</ul>
        </div>
    )
}
