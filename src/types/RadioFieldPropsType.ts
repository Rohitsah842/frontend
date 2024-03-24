export interface RadioFieldPropsType {
  formLabel: string;
  value: string;
  onchangeHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fieldArray: { label: string | JSX.Element; value: string; name: string }[];
}
