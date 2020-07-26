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
            <div className="data-entry">
                <input type="text" className="search-input" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-info search-btn" onClick={onSubmit} disabled={valueCheck()}>Search</button>
            </div>
            <div className="record">
                <h2 className="text-white name">{data.name}</h2><sup className="badge badge-danger country">{data.sys.country}</sup>
                <p className="badge badge-success text-white">Temperature: {data.main.temp}</p>   
                <p className="text-white badge badge-success">Humidity: {data.main.humidity}</p>  
                <p className="text-white badge badge-success">Weather: {data.weather.map(weather => <p className="text-white">{weather.main}</p>)}</p>
            </div>
                
        </Base>
        
    )
}

export default Home;