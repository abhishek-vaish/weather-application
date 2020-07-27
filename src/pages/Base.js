import React from "react"

const Base = ({
    title = "Weather Application Forecast",
    description = "",
    className = "App-header container",
    children

}) => {
    return(
        <div className="cover">
            <div className={className}>
                <h1>{title}</h1>
                <h2>{description}</h2>
                <div>{children}</div>
            </div>
            <div className="footer">
                <p>Designed by Abhishek-Vaish</p>
                <p>Copyright &copy; 2020. All rights reserved</p>
            </div> 
        </div>
    )
}

export default Base;