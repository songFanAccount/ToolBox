import { Helmet } from 'react-helmet';
import SideNavBar from '../components/UI/SideNavBar';

function Home() {
    return (
        <>
            <Helmet>
                <title>ToolBox</title>
            </Helmet>
            <SideNavBar inHeader={false}/>
        </>  
    )
}

export default Home