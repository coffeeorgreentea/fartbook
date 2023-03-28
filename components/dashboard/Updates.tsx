import UpdateModal from "../modals/UpdateModal";
import { useState } from "react";
import Transition from "../motion/Transition";
import { fade } from "@/constants/transitions";

const updates = [
  {
    id: 1,
    subject: "v0.1",
    sender: "Synthx is now live!",
    time: "1w ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 2,
    subject: "Photorealism, anime and more!",
    sender: "10+ new models added.",
    time: "6d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 3,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 4,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 5,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 6,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 7,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 8,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
].reverse();

const Updates = () => {
  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(updates[0]);
  return (
    <>
      <UpdateModal
        open={open}
        setOpen={setOpen}
        title={selectedUpdate.subject}
        subTitle="test"
      >
        {selectedUpdate.preview}
      </UpdateModal>

      <Transition
        variants={fade}
        name="welcome-history"
        className="divide-y divide-purple-700"
      >
        {updates.map((update) => (
          <li
            onClick={() => {
              setSelectedUpdate(update);
              setOpen(true);
            }}
            key={update.id}
            className="relative px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-700"
          >
            <div className="flex justify-between space-x-3">
              <div className="flex-1 min-w-0">
                <a href="#" className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-purple-500 truncate">
                    {update.sender}
                  </p>
                  <p className="text-sm text-indigo-500 truncate">
                    {update.subject}
                  </p>
                </a>
              </div>
              <time
                dateTime={update.datetime}
                className="flex-shrink-0 text-sm text-purple-700 whitespace-nowrap"
              >
                {update.time}
              </time>
            </div>
            <div className="mt-1">
              <p className="text-sm text-white line-clamp-3">
                {update.preview}
              </p>
            </div>
          </li>
        ))}
      </Transition>
    </>
  );
};

export default Updates;
