import React from 'react'

function Hero({children, hero}) {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}

//nastavíme výchozí hodnotu pro hero, pokud nezískáme žádnou od rodiče
Hero.defaultProps = {
    hero: "defaultHero"
}

export default Hero
