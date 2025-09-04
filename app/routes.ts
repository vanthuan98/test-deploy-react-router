import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/analyze', 'routes/analyze.tsx'),
  route('/library', 'routes/library.tsx'),
  ...prefix('quiz-game', [
    index('routes/quiz-game.tsx'),
    route(
      '/choose-correct-meaning-game',
      'routes/choose-correct-meaning-game.tsx'
    ),
    route('/choose-correct-word-game', 'routes/choose-correct-word-game.tsx'),
    route('/fill-in-the-blank-game', 'routes/fill-in-the-blank-game.tsx'),
    route('/choose-correct-game', 'routes/choose-correct-game.tsx'),
  ]),
] satisfies RouteConfig;
