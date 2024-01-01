import './App.css';
const nm = "Pantry Pal";

function App() {
  return (
    <div className="container pt-5" style={{ height: 'auto', backgroundColor: 'lightgreen' }}>
      <header >
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <br></br>
      <div className="container text-center" style={{ height: 'auto', background: 'powderblue' }}>
        <div className="container text-center">
          <div className="row text-center">
            <div className="col-sm-4">
              <div className="card" style={{ width: 'auto' }}>
                <img src="..." className="card-img-top" alt="...">
                </img>
                <div className="card-body">
                  <h5 className="card-title">Kitchen Fridge</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Check Fridge</a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card" style={{ width: 'auto' }}>
                <img src="..." className="card-img-top" alt="...">
                </img>
                <div className="card-body">
                  <h5 className="card-title">Stove Cupboard</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Check Cupboard</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">col-sm</div>
            <div className="col-sm">col-sm</div>
            <div className="col-sm">col-sm</div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
