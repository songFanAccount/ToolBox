import { Helmet } from 'react-helmet';
import SideNavBar from '../components/UI/SideNavBar';
import { PageParagraph } from '../components/UI/DefaultLayout';

function Home() {
    return (
        <>
            <Helmet>
                <title>ToolBox</title>
            </Helmet>
            <SideNavBar inHeader={false}/>
            <PageParagraph text="//TODO 😴"/>
        </>  
    )
}

export default Home