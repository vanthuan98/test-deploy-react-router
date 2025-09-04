import type { Route } from '../+types/root';
import AnalyzePage from '../pages/analyze';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Analyze - Vocabulary Master' },
    { name: 'description', content: 'Learning statistics' },
  ];
}

const Analyze = () => {
  return <AnalyzePage />;
};

export default Analyze;
