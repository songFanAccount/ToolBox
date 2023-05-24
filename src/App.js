import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import DefaultLayout from './components/UI/DefaultLayout';
import Tools from './pages/tools/Tools';
import Maths from './pages/tools/maths/Maths';
import Differentiation from './pages/tools/maths/differentiation/Differentiation';
import StationaryPoints from './pages/tools/maths/differentiation/StationaryPoints';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LatexConverter from './pages/tools/maths/LatexConverter';
import ToolPageLayout from './components/UI/toolPage/ToolPageLayout';
import Compsci from './pages/tools/compsci/Compsci';
import Parsing from './pages/tools/compsci/parsing/Parsing';
import MathsExpressionParser from './pages/tools/compsci/parsing/MathsExpressionParser';
function App() {
	return (
    	<BrowserRouter>
			<Routes>
				<Route path="/" element={<DefaultLayout />} >
					<Route index element={<Home />} />
					<Route path="about" element={<AboutUs />} />
					<Route path="contact" element={<Contact />} />
					<Route path="*" element={<NotFound />} />
					<Route path="tools" element={<Tools/>}/>
					<Route path="tools" element={<ToolPageLayout/>}>
						<Route path="maths">
							<Route index element={<Maths/>}/>
							<Route path="latex-converter" element={<LatexConverter/>}/>
							<Route path="differentiation">
								<Route index element={<Differentiation/>}/>
								<Route path="stationary-points" element={<StationaryPoints/>}/>
							</Route>
						</Route>
						<Route path="compsci">
							<Route index element={<Compsci/>}/>
							<Route path="parsing">
								<Route index element={<Parsing/>}/>
								<Route path="maths-expression-parser" element={<MathsExpressionParser/>}/>
							</Route>
						</Route>
					</Route>
				</Route>
				
			</Routes>
    	</BrowserRouter>
  	);
}

export default App;
