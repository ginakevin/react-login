import Framework7 from 'framework7/lite-bundle';
import Framework7React,{ App, View, Page, Navbar, Toolbar, Link } from 'framework7-react';



Framework7.use(Framework7React);

function Example1(){

    const f7params={
        theme:"auto", 
        name:"My App",
        id:"com.demoapp.test"
    }

    return(
        // Main Framework7 App component where we pass Framework7 params
        <App {...f7params}>

        {/* Your main view, should have "main" prop */}
        <View main>
            {/*  Initial Page */}
            <Page>
            {/* Top Navbar */}
            <Navbar title="Awesome App"></Navbar>
            {/* Toolbar */}
            <Toolbar bottom>
                <Link>Link 1</Link>
                <Link>Link 2</Link>
            </Toolbar>
            {/* Page Content */}
            <p>Page content goes here</p>
            <Link href="/about/">About App</Link>
            </Page>
        </View>
        </App>
    )
}
export default Example1;
