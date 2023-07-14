import { useEffect, useState } from "react"

const VIEWS = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
}

const getBsViews = width => {
    if (width < 576) {
        return VIEWS.xs
    }
    if (width < 768) {
        return VIEWS.sm
    }
    if (width < 992) {
        return VIEWS.md
    }
    if (width < 1200) {
        return VIEWS.lg
    }
    return VIEWS.xl
}

const useGetScreenSize = () => {
    const [screenSize, setScreenSize] = useState(getBsViews(window.innerWidth))

    const updateMedia = () => {
        setScreenSize(getBsViews(window.innerWidth));
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => window.removeEventListener("resize", updateMedia)
    }, [])

    return [
        screenSize,
        VIEWS
    ]
}

export default useGetScreenSize
