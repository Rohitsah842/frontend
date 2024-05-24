export interface PageLink {
  title: string;
  path: string;
  onClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  icon?: JSX.Element;
  bodyText?: string;
  imgSrc?: any;
}
