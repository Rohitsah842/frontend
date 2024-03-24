import { PageLink } from "@/types/pageLink";
import sipImage from "@/../public/images/SipImage.jpg";
import lumpsumSIP from "@/../public/images/lumpsumSIP.jpg";
import SWP from "@/../public/images/swp.jpg";
import mutualFund from "@/../public/images/mutualFund.jpg";
import SSY from "@/../public/images/ssy.jpg";
import NPS from "@/../public/images/nps.jpg";
import PPF from "@/../public/images/ppf.jpg";
import EPF from "@/../public/images/epf.jpg";
import fixedDeposite from "@/../public/images/fixedDeposit.jpg";
import RD from "@/../public/images/rd.jpg";
import HRA from "@/../public/images/hra.jpg";
import loanEMI from "@/../public/images/loanEMI.jpg";
import homeLoan from "@/../public/images/homeLoan.jpg";
import personalLoan from "@/../public/images/personalLoan.jpg";
import carLoan from "@/../public/images/carLoan.jpg";

export const navLinks: PageLink[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Calculators",
    path: "",
  },
];

export const profileLinks: PageLink[] = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Account",
    path: "/account",
  },
  {
    title: "Dashboard",
    path: "/dashbord",
  },
  {
    title: "Logout",
    path: "/logout",
  },
];

export const calculatorsLinks: PageLink[] = [
  {
    title: "SIP",
    path: "/calculators/sip",
    bodyText:
      "Calculate how much you need to save or how much you will accumulate with your SIP",
    imgSrc: sipImage,
  },
  {
    title: "Lumpsum and SIP",
    path: "/calculators/lumpsumSIP",
    bodyText:
      "Calculate how much you need to save or how much you will accumulate with your SIP and Lumpsum",
    imgSrc: lumpsumSIP,
  },

  {
    title: "Mutual Fund",
    path: "/calculators/mutual-fund",
    bodyText: "Calculate the returns on your mutual fund investments",
    imgSrc: mutualFund,
  },
  {
    title: "Fixed Deposit",
    path: "/calculators/fixed-deposit",
    bodyText: "Check returns on your fixed deposits (FDs) without any hassle",
    imgSrc: fixedDeposite,
  },
  {
    title: "Loan EMI",
    path: "/calculators/loanEMI",
    bodyText:
      "Calculate EMI on your loans – home loan, car loan or personal loan",
    imgSrc: loanEMI,
  },
  {
    title: "Home Loan",
    path: "/calculators/home-loan",
    bodyText: "Calculate your home loan EMI",
    imgSrc: homeLoan,
  },
  {
    title: "Personal Loan",
    path: "/calculators/personal-loan",
    bodyText: "Calculate your personal loan EMI",
    imgSrc: personalLoan,
  },
  {
    title: "Car Loan",
    path: "/calculators/car-loan",
    bodyText: "Calculate your car loan EMI",
    imgSrc: carLoan,
  },
  {
    title: "SWP",
    path: "/calculators/swp",
    bodyText:
      "Calculate your final amount with Systematic Withdrawal Plans (SWP)",
    imgSrc: SWP,
  },
  {
    title: "SSY",
    path: "/calculators/sukanaya-smariddhi-yojana",
    bodyText:
      "Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment",
    imgSrc: SSY,
  },
  {
    title: "PPF",
    path: "/calculators/ppf-calculator",
    bodyText: "Calculate your returns on Public Provident Fund (PPF)",
    imgSrc: PPF,
  },
  {
    title: "EPF",
    path: "/calculators/epf-calculator",
    bodyText: "Calculate returns for your Employee’s Provident Fund (EPF)",
    imgSrc: EPF,
  },
  {
    title: "RD",
    path: "/calculators/rd",
    bodyText:
      "Check returns on your Recurring Deposit (RD) in just a few clicks",
    imgSrc: RD,
  },
  {
    title: "NPS",
    path: "/calculators/nps",
    bodyText: "Calculate returns for your National Pension Scheme (NPS)",
    imgSrc: NPS,
  },
  {
    title: "HRA",
    path: "/calculators/hra",
    bodyText: "Calculate your House Rent Allowance (HRA)",
    imgSrc: HRA,
  },
];
