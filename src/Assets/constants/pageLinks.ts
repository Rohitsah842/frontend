import { PageLink } from "@/types/pageLink"
export const navLinks: PageLink[]=[
    {
        title:"Home",
        path:"/"
    },
    {
        title:"Products",
        path:"/products"
    },
    {
        title:"Pricing",
        path:"/pricing"
    },
    {
        title:"Calculators",
        path:""
    }


]

export const profileLinks: PageLink[]=[
    {
        title:"Profile",
        path:"/profile"
    },
    {
        title:"Account",
        path:"/account"
    },
    {
        title:"Dashboard",
        path:"/dashbord"
    },
    {
        title:"Logout",
        path:"/logout"
    }

]

export const calculatorsLinks:PageLink[]=[
    {
        title:"SIP",
        path:"/sip"
    },
    {
        title:"Lumpsum",
        path:"/lumpsum"
    },
    {
        title:"Mutual Fund Returns",
        path:"/mutualfundreturn"
    }
]