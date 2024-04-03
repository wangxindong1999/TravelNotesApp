import Icon from "@ant-design/icons"
const MySvg = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    id="mx_n_1712157066404"
    width="16"
    height="16"
  >
    <path
      d="M512 46.08C256 46.08 46.08 256 46.08 512S256 977.92 512 977.92s465.92-209.92 465.92-465.92S768 46.08 512 46.08z m0 855.04c-215.04 0-389.12-174.08-389.12-389.12 0-215.04 174.08-389.12 389.12-389.12s389.12 174.08 389.12 389.12c0 215.04-174.08 389.12-389.12 389.12z"
      fill="#4c9369"
    ></path>
    <path
      d="M552.96 496.64V256c0-20.48-15.36-40.96-40.96-40.96s-35.84 20.48-35.84 40.96v256c0 10.24 5.12 20.48 10.24 25.6L665.6 716.8c15.36 15.36 40.96 15.36 56.32 0 15.36-15.36 15.36-35.84 0-51.2l-168.96-168.96z"
      fill="#4c9369"
    ></path>
  </svg>
)
const MyIcon = (props) => <Icon component={MySvg} {...props} />
export default function PasswordIcon() {
  return <MyIcon></MyIcon>
}
