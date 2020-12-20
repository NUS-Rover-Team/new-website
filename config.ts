const siteMetadata = {
    title: `NUS Rover Team`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.jpeg`,
    icon: `/images/icon.jpeg`,
    titleImage: `/images/wall.jpg`,
    ogImage: `/images/wall.jpg`,
    twoColumnWall: true,
    cookiePolicy: false,
    introTag: `A FLAGSHIP PROJECT UNDER NUS SEDS`,
    description: `✨ per aspera ad astra ✨`,
    about:
        "We are a multidisciplinary team from FoE, FoS and SoC intending to participate in the prestigious University Rover Challenge 2021 held annually at the Mars Desert Research Station (MDRS) in Utah, USA. In AY19/20, our team was the only team to get selected for the second round of competition from South East Asia. This year, we are aiming for the big prize - reaching the finals held in MDRS!",
    author: `@nusroverteam`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
        {
            name: "ABOUT",
            url: "/about",
        },
        {
            name: "SUB-TEAMS",
            url: "/blog",
        },
        {
            name: "NEWS",
            url: "/portfolio",
        },
        {
            name: "CONTACT",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy",
        },
        {
            name: "GitHub",
            url: "https://github.com/NUS-Rover-Team/new-website",
        },
    ],
    social: [
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "https://www.facebook.com/nusseds/",
        },
        {
            name: "Github",
            icon: "/images/Github.png",
            url: "https://github.com/NUS-Rover-Team",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/nusroverteam/?hl=en",
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "https://www.youtube.com/channel/UCUbobZWvBIYmCOsc_33vwGQ",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "https://getform.io/f/6276494c-50e5-45ca-ae2c-c13c2a5ddf6c",
        description: `Do contact us via our socials or drop us a question in the form so we can get back to you!`,
        mail: "roverteam.nus@gmail.com",
        phone: "000-000-0000",
        address: "EW1A, 1 Engineering Drive 2, Singapore 117576",
    },
    disqus: ""
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Please enter a valid name!",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Please enter a valid email address!",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Please enter a message with atleast 15 characters!",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
