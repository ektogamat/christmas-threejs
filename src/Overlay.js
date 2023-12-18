export default function Overlay({ inside, setInside }) {
  return (
    <>
      <header>
        <img draggable={false} width="100%" src="/merry_xmas.svg" />
      </header>
      <footer className="footer">
        <button
          className="button--explore"
          onClick={() => {
            setInside(!inside)
          }}>
          SCROLL TO LOOK INSIDE
        </button>
        <br />
        Created with love by Anderson Mancini. Using LumaAI for the outside Gaussian Splatting and BlockadeLabs for internal snow globe.
      </footer>
    </>
  )
}
