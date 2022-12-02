import Side from "../components/Side";
import Header from "../components/Header";
import Today from "../components/Today";

const Home = () => {    
    return (
        <div className={`page home`}>
            <Side />
            <div className="container">
                <Header />
                <Today />
            </div>
        </div>
    )
}

export default Home