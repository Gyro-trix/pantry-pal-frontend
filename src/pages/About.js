function About() {

    return (
        <div>

            <div id="carouselExampleIndicators" className="carousel carousel-dark slide" style = {{minHeight:320}}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ paddingLeft: 64, paddingRight: 64, marginBottom: 32}}>
                        <div >
                            <ul> Demo Accounts:
                                <li>Level 3 Account: Username, Password, and Email: Admin </li>
                                <li>Level 2 Account: Username, Password, and Email: Demo2 </li>
                                <li>Level 1 Account: Username, Password, and Email: Demo1 </li>
                            </ul>
                            <p>Note: email is used only for invites to message system in app, app does not send emails</p>
                        </div>
                    </div>
                    <div className="carousel-item " style={{ paddingLeft: 64, paddingRight: 64, marginBottom: 32}}>
                        <div >
                            <p>Pantry Pal is a small scale inventory web app demo that allows users to keep seperate lists of items based on user defined locations. This project was developed using React.</p>

                            <p>Please be aware that this demo uses local storage for all saved data and as such using fake usernames, passwords and emails when creating accounts is advised. Also please be aware that local storage has a small limit that can cause saving issues with too many users, storages or messages.</p>

                        </div>
                    </div>
                    <div className="carousel-item " style={{ paddingLeft: 64, paddingRight: 64, marginBottom: 32 }}>
                        <div>
                            <p>Aside from storing information about small scale inventories, Pantry Pal also has other features geared toward small cafe businesses.</p>

                            <p>Features include:
                                <li>Recipe editing and saving through Jodit rich text editor</li>
                                <li>Expiry and Quantity Notifications</li>
                                <li>Nutritional Lookup/Entry with Calorie Ninja </li>
                                <li>Multiple User Accounts with three access levels</li>
                                <li>User Message System</li>
                            </p>

                        </div>
                    </div>
                    <div className="carousel-item " style={{ paddingLeft: 64, paddingRight: 64, marginBottom: 32 }}>
                        <div>
                            <p>
                                The main motivation I have for undertaking this project was the obstacles I once faced while working in a localy run cafe.
                                With a small group of staff and just a many different freezers, cupboards and fridges keeping things organized and stocked was difficult.
                                To top it off my mother always had trouble remebering what was in freezers filled with goods that had various expiry dates.
                            </p>
                            <p>
                                Upon discussing this topic with the next owner of the cafe I decided to work towards something that would allow smaller margins for error while hopefully not being to difficult to use.

                            </p>
                            <br></br>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container" style={{ paddingLeft: 64, paddingRight: 64 }}>
                <div style={{ marginTop: 16, marginBottom: 16, textAlign: "center" }}>
                    <h3>Credits/Links</h3>
                </div>
                <p>Project coaching from <a href="https://www.getcoding.ca" target="_blank" rel="noreferrer">Get Coding</a></p>
                <p>APIs, Components and Frameworks used in this project:
                    <li>API: <a href="https://calorieninjas.com" target="_blank" rel="noreferrer">Calorie Ninja for Nutritional Information</a></li>
                    <li>API: <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB for fetching random recipes</a></li>
                    <li>Component: <a href="https://xdsoft.net/jodit/" target="_blank" rel="noreferrer">Jodit Rich Text Editor</a></li>
                    <li>Component: <a href="https://github.com/Hacker0x01/react-datepicker" target="_blank" rel="noreferrer">React Date Picker</a></li>
                    <li>Component: <a href="https://github.com/fkhadra/react-toastify#readme" target="_blank" rel="noreferrer">React Toastify</a></li>
                    <li>Component: <a href="https://ambassify.github.io/react-avatar/" target="_blank" rel="noreferrer">React Avatar</a></li>
                    <li>Framework: Bootstrap and Bootstrap Icons</li>
                </p>
            </div>
        </div>
    )

} export default About