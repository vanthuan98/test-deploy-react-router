import type { Route } from '../+types/root';
import LibraryPage from '../pages/library';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Library - Vocabulary Master' },
    { name: 'description', content: 'Browse and search vocabulary' },
  ];
}

const Library = () => {
  return <LibraryPage />;
};

export default Library;
