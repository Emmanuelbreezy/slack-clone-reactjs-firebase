import React from 'react';
import { connect} from 'react-redux'
import { Layout } from '../../hoc/Layout/Layout';
import { ContentAll } from '../../components/UI/content';
import { ThemeProvider } from '../../context/theme_context';
import { SplashScreen } from '../../components/SplashScreen/splash_screen';

const App =(props:any) => {
  return (
    <ThemeProvider>
      <Layout>
          {props.isLoading ? <SplashScreen /> : <ContentAll loading={props.isLoading} />}
      </Layout>
    </ThemeProvider>
  );
}

const mapStateToProps = (state:any )=> ({
  isLoading: state.user.isLoading
})

export default connect(mapStateToProps,null)(App);
