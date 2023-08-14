import React from 'react';
import '../styles/globals.css';
import { QuestionMarkCircleIcon, CheckIcon, BeakerIcon } from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-white text-black">
      <h1 className="text-5xl font-bold mb-8">Welcome to OTTER</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="border p-6 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg bg-white text-black">
          <BeakerIcon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold mb-2">Dive into <span className="text-blue-500">Examples</span></h2>
          <p className="text-gray-600">Get started with these RNA sequences:</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">"AUGCUUGAAUCG"</p>
            <p className="text-gray-600">"5'-GCAUCGAGAUUCCG-3'"</p>
            <p className="text-gray-600">"3'-AAUCCGUUUCGAUUG-5'"</p>
          </div>
        </div>

        <div className="border p-6 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg bg-white text-black">
          <CheckIcon className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold mb-2">Uncover <span className="text-green-500">OTTER's Power</span></h2>
          <p className="text-gray-600">Discover the capabilities of OTTER:</p>
          <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
            <li>Choose from multiple models</li>
            <li>Interactive model selection</li>
            <li>Efficient calculation process</li>
          </ul>
        </div>

        <div className="border p-6 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg bg-white text-black">
          <QuestionMarkCircleIcon className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
          <h2 className="text-xl font-semibold mb-2">Embark on a <span className="text-yellow-500">Journey</span></h2>
          <p className="text-gray-600">Unlock the potential of OTTER:</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">1. Select a model to use</p>
            <p className="text-gray-600">2. Input your RNA sequence</p>
            <p className="text-gray-600">3. Let OTTER generate insights for you</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;


