import '../styles/globals.css'

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">OTTER</h1>

      <div>
        <div>
          <div className="flex flex-col items-center justify-content mb-5">
            {/* RNA Icon */}
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