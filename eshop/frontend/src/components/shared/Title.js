import { Helmet } from "react-helmet-async";

function Title({title}) {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}
export default Title;