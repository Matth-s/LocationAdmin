import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex__alignCenter">
      <nav>
        <ul className="flex">
          <li>
            <NavLink to="/">Materiels</NavLink>
          </li>
          <li>
            <NavLink to="/ajouter-une-annonce">Ajouter une annonce</NavLink>
          </li>
          <li>
            <a
              href="https://console.firebase.google.com/u/0/project/test-62e62/firestore/data/~2Fmateriel~2F3XWFM8WQk0bSnwQBZ7bu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le site
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
