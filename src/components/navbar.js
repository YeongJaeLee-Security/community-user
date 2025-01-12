import Link from "next/link";
import AuthButton from "./authbutton";
import { useAuth } from "@/context/authcontext";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            href={"/"}
          >
          Home
          </Link>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form action="/search">
              <input name="query"></input>
              <button type="submit">Search</button>
            </form>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li> */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
                </a>
                <ul className="dropdown-menu">
                  {isLoggedIn &&
                    <li>
                      <Link className="dropdown-item" href="/settings">
                        Settings
                      </Link>
                    </li>
                  }
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <AuthButton/>
                  </li>
                </ul>
              </li>
              {isLoggedIn &&
                <li>
                    <Link href="/submit">
                      Create Post
                    </Link>
                </li>
              }
              <li className="nav-item">
                {/* <Link className="nav-link disabled"  */}
                <a className="nav-link disabled" aria-disabled="true">Maybe admin</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}