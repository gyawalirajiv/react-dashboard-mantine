import { MantineProvider, Text } from '@mantine/core';
import Dashboard from "./containers/Dashboard";
import NavbarLinksGroup from "./components/dashboard-components/LinksGroup";

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Dashboard/>
        </MantineProvider>
    );
}

export default App;
