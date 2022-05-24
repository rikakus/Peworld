import Layout1 from "../layout/layout1";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css'


const layouts = 
{
  L1: Layout1
}

const NoLayout = ({children})=>{
  return <>{children}</>
}
function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || NoLayout
  return(
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}
export default MyApp
