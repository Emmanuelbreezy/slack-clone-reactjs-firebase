import React from 'react';
import { connect} from 'react-redux'
import { Layout } from '../../hoc/Layout/Layout';
import { ContentAll } from '../../components/UI/content';

const App =(props:any) => {
  return (
    <Layout>
        {props.isLoading ? 'loading' : <ContentAll loading={props.isLoading} />}
    </Layout>
  );
}

const mapStateToProps = (state:any )=> ({
  isLoading: state.user.isLoading
})

export default connect(mapStateToProps,null)(App);
