export const hraCalculate = (
  basicSalary: number,
  DA: number,
  hraRecived: number,
  hraPaid: number,
  isMetroCity: string
): number => {
  const totalBasicSalary = +basicSalary + DA;
  let rentHRA = hraPaid - totalBasicSalary * 0.1;
  let basicHRA = isMetroCity === "Yes" ? basicSalary * 0.5 : basicSalary * 0.4;

  const HRAValue = Math.round(Math.min(hraRecived, rentHRA, basicHRA));

  return HRAValue;
};
