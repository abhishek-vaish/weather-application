import React, { useState } from "react"
import unirest from "unirest"
import Base from "./Base"

const Home = () => {

        const [query, setQuery] = useState('');

        const [data, setData] = useState({
            main : {
                temp : "",
                humidity : ""
            },
            weather : [{
                main : "",
            }],
            sys : {
                country : ""
            },
            name : ""
        });

        const valueCheck = () => {
            if(query === ''){
                return true;
            }
        }

        const dataCheck = () => {
            if(data.main.temp !== ''){
                return true;
            }
        }

        const onSubmit = event => {
            event.preventDefault();
            unirest.get("https://community-open-weather-map.p.rapidapi.com/weather")
            .header({"access-control-request-headers" : true})
            .query({"rapidapi-key": "d347549ae9msh861b9e1b1538501p1cc382jsnaeb1894f49a9" ,"q": query})
            .then(response => {setData(response.body)})
            .catch(error => (console.log(error)))
            setQuery("")
        }
    
    return(
        <Base>
        <div id="main">
            <div className="container">
                <div className="data-entry">
                    <input type="text" className="search-input" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button className="btn search-btn" onClick={onSubmit} disabled={valueCheck()}><i class="fas fa-search"></i></button>
                </div>
                {dataCheck() && (
                    <div className="record">
                        <h2>{data.name}<sup className="badge-danger sup">{data.sys.country}</sup></h2>
                        <div className="data">
                            <p className="badge-success">Temperature</p>
                            <h6>{data.main.temp}&deg;F</h6>  
                            <p className="badge-success">Humidity</p>
                            <h6>{data.main.humidity}%</h6>
                            <p className="badge-success">Weather</p>
                            <h6>{data.weather.map(weather => <p>{weather.main}</p>)}</h6>
                        </div>
                    </div>
                )}
                   
            </div>
        </div>                
        </Base>
    )
}

export default Home;