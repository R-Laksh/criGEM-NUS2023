import '../styles/globals.css'
import { QuestionMarkCircleIcon, CheckIcon, BeakerIcon } from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">OTTER</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-content mb-5">
            <BeakerIcon className="h-8 w-8" />
            <h2>Example Inputs</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"AUGCUUGAAUCG"</p>
            <p className="infoText">"5'-GCAUCGAGAUUCCG-3'"</p>
            <p className="infoText">"3'-AAUCCGUUUCGAUUG-5'"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-content mb-5">
            <QuestionMarkCircleIcon className="h-8 w-8" />
            <h2>How to Use?</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">1. Input your RNA sequence</p>
            <p className="infoText">2. Select a model to use</p>
            <p className="infoText">3. Let OTTER generate for you!</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-content mb-5">
            <CheckIcon className="h-8 w-8" />
            <h2>Features</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Multiple models to choose from</p>
            <p className="infoText">RNA sequences are stored in Firebase's Firestore</p>
            <p className="infoText">Hot Toast notifications when OTTER is thinking!</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage