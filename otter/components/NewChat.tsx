import { PlusIcon } from "@heroicons/react/24/solid";

function NewChat() {
  return (
    <div className="border-blue-300 border chatRow">
        <PlusIcon className="h-4 w-4"/>
        <p>New Input</p>
    </div>
  )
}

export default NewChat