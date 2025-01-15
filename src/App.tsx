import { ReactNode, useState } from "react";
import "./App.css";
import DndKit1 from "./demos/Dndkit1";
import classNames from "classnames";

interface Demo {
  name: string;
  desc?: string;
  vNode: ReactNode;
}

const demos: Array<Demo> = [
  {
    name: "DndKit 1",
    desc: "拖放保留原有位置信息",
    vNode: <DndKit1 />,
  },
];

function App() {
  const [activeDemo, setActiveDemo] = useState(demos.at(0));

  return (
    <div className="p-10">
      <div>
        {demos.map((v) => (
          <button
            className={classNames("p-1 text-blue-800 border", activeDemo === v && "bg-fuchsia-300")}
            onClick={() => setActiveDemo(v)}
          >
            {v.name}
          </button>
        ))}
      </div>

      <hr className="my-2" />

      {activeDemo?.vNode}
    </div>
  );
}

export default App;
