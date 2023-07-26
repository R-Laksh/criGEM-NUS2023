import '../styles/globals.css'
import { BeakerIcon } from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">OTTER</h1>

      <div>
        <div>
          <div className="flex flex-col items-center justify-content mb-5">
            <BeakerIcon className="h-8 w-8" />
            <h2>Example Inputs</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">AUGCUUGAAUCG</p>
            <p className="infoText">5'-GCAUCGAGAUUCCG-3'</p>
            <p className="infoText">3'-AAUCCGUUUCGAUUG-5'</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage