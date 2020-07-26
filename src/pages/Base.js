import React from "react"

const Base = ({
    title = "Weather Forecast Application",
    description = "",
    className = "App-header",
    children

}) => {
    return(
        <div className={className}>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <div>{children}</div>
        </div>
    )
}

export default Base;