import { LoggingWrapper } from '@chr/web-components-labs'
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './app/areas/home/Home';

const App = ({loggingConfig, store}) => {
  return (
    <LoggingWrapper loggingConfig={loggingConfig}>
      <Router>
        <Provider store={store}>
          <Switch>
            {/* put your other app routes here */}
            <Route path='/' component={Home} />
          </Switch>
        </Provider>
      </Router>
    </LoggingWrapper>
  );
};

export default App;
