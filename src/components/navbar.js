import Link from "next/link";
import AuthButton from "./authbutton";

export default function Navbar() {


  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link
            className="navbar-brand"
            href={"/"}
          >
          Home
          </Link>
          {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form action="/search">
              <input name="query"></input>
              <button type="submit">Search</button>
            </form>
            {/* <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li> */}
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/settings">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <AuthButton/>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/submit">
                  Create Post
                </Link>
              </li>
              <li class="nav-item">
                {/* <Link className="nav-link disabled"  */}
                <a class="nav-link disabled" aria-disabled="true">Maybe admin</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}