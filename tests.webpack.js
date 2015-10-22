var context = require.context('./components/User', true, /-test\.jsx?$/);
context.keys().forEach(context);
