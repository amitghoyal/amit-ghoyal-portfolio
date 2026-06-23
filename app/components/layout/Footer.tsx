export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">

        <div className="footer-logo">
          Amit.dev
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#memories">Memories</a>
          <a href="#contact">Contact</a>

          <a
            href="/resume.pdf"
            download
          >
            Résumé
          </a>
        </div>

        <div>
          © {new Date().getFullYear()} Amit Ghoyal.
          Built with <strong>Next.js</strong> &
          curiosity.
        </div>

      </div>
    </footer>
  );
}