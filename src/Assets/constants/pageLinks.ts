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
        path:"/calculators/sip"
    },
    {
        title:"SWP",
        path:"/calculators/swp"
    },
    {
        title:"Loan EMI",
        path:"/calculators/loanEMI"
    },
    {
        title:"Home Loan",
        path:"/calculators/homeloan"
    }
    ,
    {
        title:"Personal Loan",
        path:"/calculators/personal-loan"
    }
]