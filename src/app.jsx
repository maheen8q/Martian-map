import MapView from "./map/MapView";

function App() {
  return (
    <main className="app">
      <header>
        <h1>MARS NAVIGATOR</h1>
        <p>PLANETARY EXPLORATION SYSTEM</p>
        <span>JEZERO CRATER · MARS</span>
      </header>

      <section className="workspace">
        <MapView />
      </section>
    </main>
  );
}

export default App;